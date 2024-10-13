#!/bin/bash

# Nombre de la pila de CloudFormation
stack_name="btg-pactual-task-definition"

# Nombre del archivo JSON de la plantilla
template_file="cloudformation-definition.json"

# Región de AWS donde deseas crear la pila
region="us-east-2"

# Comprobar si la pila ya existe
aws cloudformation describe-stacks --stack-name "$stack_name" --region "$region" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    # La pila ya existe, actualízala
    echo "La pila de CloudFormation ya existe. Actualizando..."
    aws cloudformation update-stack \
        --stack-name "$stack_name" \
        --template-body "file://$template_file" \
        --region "$region" \
        --mode merge \
        --fail-on-warnings \
        --capabilities CAPABILITY_NAMED_IAM
else
    # La pila no existe, créala
    echo "La pila de CloudFormation no existe. Creando..."
    aws cloudformation create-stack \
        --stack-name "$stack_name" \
        --template-body "file://$template_file" \
        --region "$region" \
        --capabilities CAPABILITY_NAMED_IAM
fi

# Esperar hasta que la creación o actualización se complete
aws cloudformation wait stack-create-complete --stack-name "$stack_name" --region "$region" || \
aws cloudformation wait stack-update-complete --stack-name "$stack_name" --region "$region"

# Verificar si la creación o actualización de la pila fue exitosa
if [ $? -eq 0 ]; then
    echo "Pila de CloudFormation creada o actualizada con éxito."
else
    echo "Error al crear o actualizar la pila de CloudFormation."
fi
