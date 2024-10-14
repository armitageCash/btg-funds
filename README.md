# btg-funds

Este es un proyecto para el Fondo Voluntario de Pensión de BTG Pactual Colombia. Está construido utilizando TypeScript y Restify para el desarrollo de una API que maneja la lógica de los fondos de pensión.

## Índice

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Instrucciones para levantar el proyecto](#instrucciones-para-levantar-el-proyecto)
- [Flujo de CI/CD](#flujo-de-cicd)
- [Arquitectura Desacoplada](#arquitectura-desacoplada)
- [Ventajas de la Arquitectura Desacoplada](#ventajas-de-la-arquitectura-desacoplada)
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

## Arquitectura Desacoplada

El proyecto btg-funds está diseñado utilizando una arquitectura desacoplada, donde se definen casos de uso claros que manejan la lógica del negocio. Esto significa que la lógica de la aplicación está separada de la implementación del servidor y del acceso a datos.

## Ventajas de la Arquitectura Desacoplada

- **Escalabilidad**: La separación de responsabilidades permite que diferentes equipos trabajen en distintas partes del sistema sin interferir entre sí. Esto facilita la incorporación de nuevas funcionalidades y la ampliación del sistema.

- **Facilidad de Pruebas**: Al tener la lógica de negocio aislada, es más fácil escribir pruebas unitarias para los casos de uso sin depender de la capa de datos o de la implementación del servidor. Esto resulta en un código más robusto y menos propenso a errores.

- **Mantenibilidad**: La arquitectura desacoplada permite realizar cambios en una parte del sistema sin afectar otras. Esto hace que el mantenimiento del código sea más ágil y reduce el riesgo de introducir errores al realizar cambios.

- **Flexibilidad**: Se pueden cambiar las implementaciones del servidor o del almacenamiento de datos sin afectar la lógica de negocio, lo que permite una fácil adaptación a nuevas tecnologías o requisitos.

- **Reusabilidad**: Los casos de uso pueden ser reutilizados en diferentes contextos o aplicaciones, lo que ahorra tiempo y esfuerzo en el desarrollo.

## Contribuciones

Si deseas contribuir al proyecto, por favor crea un fork del repositorio y envía un pull request con tus cambios. Asegúrate de seguir las guías de estilo y realizar pruebas antes de enviar tus contribuciones.
