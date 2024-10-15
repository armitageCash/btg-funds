# btg-funds

Este es un proyecto para el Fondo Voluntario de Pensión de BTG Pactual Colombia. Está construido utilizando TypeScript y Restify para el desarrollo de una API que maneja la lógica de los fondos de pensión.

## Índice

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Instrucciones para levantar el proyecto](#instrucciones-para-levantar-el-proyecto)
- [Flujo de CI/CD](#flujo-de-cicd)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Arquitectura Desacoplada](#arquitectura-desacoplada)
- [Ventajas de la Arquitectura Desacoplada](#ventajas-de-la-arquitectura-desacoplada)
- [Solucion del problema punto 2](#punto-2)
- [Contribuciones](#contribuciones)

## Descripción del Proyecto

El proyecto `btg-funds` es un servicio RESTful que gestiona los fondos voluntarios de pensión, permitiendo a los usuarios consultar y manipular información sobre sus fondos. La API proporciona funcionalidades para manejar la creación, consulta y actualización de fondos de pensión de manera eficiente.

## Requisitos previos

- Tener instalado [Node.js](https://nodejs.org/) (versión 14 o superior).
- Tener instalado [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/).

## Instalación

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/btg-funds.git
   cd btg-funds
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
   O si prefieres usar Yarn:
   ```bash
   yarn install
   ```

## Instrucciones para levantar el proyecto

Para iniciar el servidor en modo desarrollo, ejecuta el siguiente comando:

```bash
npm run dev
```

Esto ejecutará el servidor usando ts-node para la ejecución de TypeScript directamente.

Para construir el proyecto y ejecutar el servidor en modo producción, sigue estos pasos:

1. Construye el proyecto:

   ```bash
   npm run build
   ```

2. Inicia el servidor:
   ```bash
   npm start
   ```

El servidor estará disponible en el puerto 8080 por defecto.

## Flujo de CI/CD

Al realizar un pull a la rama main, se ejecutan las siguientes acciones en el pipeline de CI/CD:

1. **Ejecutar pruebas**: Se ejecutan todas las pruebas definidas en el proyecto usando el comando `npm test`.
2. **Construcción del proyecto**: Se genera una versión optimizada del proyecto para producción utilizando `npm run build`.
3. **Despliegue**: Si las pruebas pasan y la construcción es exitosa, el proyecto se despliega automáticamente en el entorno de producción.

Este flujo garantiza que el código en main siempre sea estable y esté listo para ser utilizado en producción.

## Arquitectura del Sistema

Esta arquitectura representa una solución moderna y altamente escalable desplegada en Amazon Web Services (AWS), diseñada para alojar una aplicación containerizada. Vamos a desglosar los componentes principales y explicar cómo trabajan juntos para proporcionar una infraestructura robusta y flexible:

1. **Red Virtual (VPC)**: Se crea una Virtual Private Cloud (VPC) dedicada con un rango de IP privado (10.0.0.0/16). Esto proporciona un entorno de red aislado y seguro para todos los recursos del sistema.

2. **Subredes Públicas**: Se configuran dos subredes públicas en diferentes zonas de disponibilidad. Esto aumenta la redundancia y la tolerancia a fallos, asegurando que el sistema pueda seguir funcionando incluso si una zona de AWS falla.

3. **Internet Gateway y Tablas de Rutas**: Se incluye un Internet Gateway y las tablas de rutas necesarias para permitir la comunicación entre las subredes públicas e Internet, facilitando el acceso externo a la aplicación.

4. **Clúster ECS (Elastic Container Service)**: Se crea un clúster ECS para gestionar y orquestar los contenedores de la aplicación. ECS proporciona una plataforma escalable para ejecutar aplicaciones containerizadas.

5. **Definición de Tarea ECS**: Se define una tarea ECS que especifica cómo debe ejecutarse el contenedor de la aplicación. Esta tarea está configurada para usar Fargate, lo que significa que no necesitas gestionar la infraestructura subyacente de los servidores.

6. **Servicio ECS**: Se configura un servicio ECS para mantener en ejecución el número deseado de instancias de la tarea definida. Esto asegura que la aplicación esté siempre disponible y puede escalar automáticamente según sea necesario.

7. **Balanceador de Carga de Aplicaciones (ALB)**: Se implementa un Application Load Balancer para distribuir el tráfico entrante entre las diferentes instancias de la aplicación. Esto mejora la disponibilidad y la capacidad de manejar cargas de trabajo variables.

8. **Grupo de Destino**: Se crea un grupo de destino para el ALB, que define dónde y cómo se enrutan las solicitudes a las instancias de la aplicación.

9. **Seguridad**: Se implementa un grupo de seguridad para controlar el tráfico de red hacia y desde los recursos de ECS, permitiendo solo el tráfico necesario en los puertos requeridos.

Esta arquitectura es altamente escalable por varias razones:

- **Uso de Fargate**: Permite escalar la aplicación sin preocuparse por la gestión de la infraestructura subyacente.
- **Múltiples zonas de disponibilidad**: Proporciona alta disponibilidad y resistencia a fallos.
- **Balanceador de carga**: Distribuye el tráfico eficientemente y permite escalar horizontalmente añadiendo más instancias de la aplicación.
- **ECS**: Facilita la gestión y el escalado de contenedores, permitiendo aumentar o disminuir rápidamente el número de instancias de la aplicación según la demanda.

Además, esta arquitectura es flexible y puede adaptarse fácilmente a medida que crecen las necesidades del sistema. Por ejemplo, se pueden agregar más servicios, implementar un registro de contenedores privado, o integrar con otros servicios de AWS como RDS para bases de datos o S3 para almacenamiento.

## Arquitectura Desacoplada

El proyecto btg-funds está diseñado utilizando una arquitectura desacoplada, donde se definen casos de uso claros que manejan la lógica del negocio. Esto significa que la lógica de la aplicación está separada de la implementación del servidor y del acceso a datos.

## Ventajas de la Arquitectura Desacoplada

- **Escalabilidad**: La separación de responsabilidades permite que diferentes equipos trabajen en distintas partes del sistema sin interferir entre sí. Esto facilita la incorporación de nuevas funcionalidades y la ampliación del sistema.

- **Facilidad de Pruebas**: Al tener la lógica de negocio aislada, es más fácil escribir pruebas unitarias para los casos de uso sin depender de la capa de datos o de la implementación del servidor. Esto resulta en un código más robusto y menos propenso a errores.

- **Mantenibilidad**: La arquitectura desacoplada permite realizar cambios en una parte del sistema sin afectar otras. Esto hace que el mantenimiento del código sea más ágil y reduce el riesgo de introducir errores al realizar cambios.

- **Flexibilidad**: Se pueden cambiar las implementaciones del servidor o del almacenamiento de datos sin afectar la lógica de negocio, lo que permite una fácil adaptación a nuevas tecnologías o requisitos.

- **Reusabilidad**: Los casos de uso pueden ser reutilizados en diferentes contextos o aplicaciones, lo que ahorra tiempo y esfuerzo en el desarrollo.

## punto-2

Para resolver esta consulta SQL, es necesario combinar las tablas Cliente, Producto, Sucursal, Inscripción, Disponibilidad, y Visitan. La lógica detrás de la consulta es encontrar aquellos clientes que están inscritos en productos que están disponibles únicamente en las sucursales que ellos han visitado. Para lograr esto, debes hacer un JOIN de varias tablas y asegurarte de que los productos que están inscritos por los clientes solo se encuentran en las sucursales que han visitado.

Aquí te dejo la consulta SQL para obtener los nombres de los clientes que cumplen con esas condiciones:

```sql
SELECT DISTINCT c.nombre, c.apellidos
FROM Cliente c
JOIN Inscripción i ON c.id = i.idCliente
JOIN Producto p ON i.idProducto = p.id
JOIN Disponibilidad d ON p.id = d.idProducto
JOIN Sucursal s ON d.idSucursal = s.id
JOIN Visitan v ON c.id = v.idCliente AND s.id = v.idSucursal
WHERE p.id IN (
 SELECT d.idProducto
 FROM Disponibilidad d
 WHERE d.idSucursal IN (
     SELECT v.idSucursal
     FROM Visitan v
     WHERE v.idCliente = c.id
 )
);
```

Explicación:
JOIN de tablas: Se realizan varias combinaciones entre las tablas Cliente, Inscripción, Producto, Disponibilidad, Sucursal, y Visitan para relacionar a los clientes con los productos y sucursales.

Condición de inscripción: Usamos JOIN para unir las tablas Inscripción y Producto, de forma que podamos conocer los productos a los que cada cliente está inscrito.

Condición de disponibilidad: Se unen las tablas Disponibilidad y Sucursal para conocer qué productos están disponibles en las distintas sucursales.

Condición de visita: Se asegura que el cliente haya visitado la sucursal donde está disponible el producto, relacionando la tabla Visitan.

Subconsulta: Se incluye una subconsulta para verificar que el producto inscrito por el cliente esté disponible en alguna sucursal que haya visitado.

Este enfoque permite filtrar correctamente los clientes que cumplen con la condición de estar inscritos en productos que solo están disponibles en las sucursales que han visitado.

## Contribuciones

Si deseas contribuir al proyecto, por favor crea un fork del repositorio y envía un pull request con tus cambios. Asegúrate de seguir las guías de estilo y realizar pruebas antes de enviar tus contribuciones.
