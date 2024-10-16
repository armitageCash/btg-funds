#!/bin/bash

# Nombre de la pila de CloudFormation
stack_name="btg-pactual-task-definition"

# Nombre del archivo JSON de la plantilla
template_file="cloudformation-definition.json"

# Región de AWS donde deseas crear la pila
region="us-east-2"
# Nombre del clúster y servicio de ECS
ecs_cluster_name="btg-pactual-cluster"
ecs_service_name="btg-pactual-service"
# Función para obtener el estado de la pila
get_stack_status() {
    aws cloudformation describe-stacks --stack-name "$stack_name" --region "$region" --query 'Stacks[0].StackStatus' --output text
}

# Comprobar si la pila ya existe
if aws cloudformation describe-stacks --stack-name "$stack_name" --region "$region" > /dev/null 2>&1; then
    # La pila ya existe, actualízala
    echo "La pila de CloudFormation ya existe. Actualizando..."
    # Forzar el despliegue del servicio ECS para usar la nueva imagen
    echo "Forzando el despliegue del servicio ECS con la nueva imagen..."
    aws ecs update-service \
        --cluster "$ecs_cluster_name" \
        --service "$ecs_service_name" \
        --force-new-deployment \
        --region "$region"
    
    # Esperar a que el servicio ECS esté en estado estable
    echo "Esperando a que el servicio ECS esté en estado estable..."
    aws ecs wait services-stable \
        --cluster "$ecs_cluster_name" \
        --services "$ecs_service_name" \
        --region "$region"
    
    echo "Despliegue forzado del servicio ECS completado y el servicio está estable."
else
    # La pila no existe, créala
    echo "La pila de CloudFormation no existe. Creando..."
    aws cloudformation create-stack \
        --stack-name "$stack_name" \
        --template-body "file://$template_file" \
        --region "$region" \
        --capabilities CAPABILITY_NAMED_IAM

    # Esperar hasta que la creación se complete
    echo "Esperando a que la creación se complete..."
    aws cloudformation wait stack-create-complete --stack-name "$stack_name" --region "$region"
fi

# Verificar el estado final de la pila
final_status=$(get_stack_status)
if [[ $final_status == "CREATE_COMPLETE" || $final_status == "UPDATE_COMPLETE" ]]; then
    echo "Pila de CloudFormation creada o actualizada con éxito."
else
    echo "Error al crear o actualizar la pila de CloudFormation. Estado final: $final_status"
    echo "Obteniendo eventos de la pila para diagnóstico..."
    aws cloudformation describe-stack-events --stack-name "$stack_name" --region "$region" --query 'StackEvents[?ResourceStatus==`CREATE_FAILED` || ResourceStatus==`UPDATE_FAILED`].[LogicalResourceId,ResourceStatusReason]' --output table
fi