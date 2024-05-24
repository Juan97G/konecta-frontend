# Prueba técnica Frontend - KONECTA

El proyecto está creado con React.js y cuenta con su archivo docker-compose.yml para facilitar
la ejecución, para ello correr el script.

### `docker-compose up --build`

En caso de no levantarse mediante Docker, entonces no olvidar instalar las dependencias y luego correr el script:

### `npm run start`

## Mejores Prácticas
Se solicitaba utilizar Context API para el manejo de estado global, por lo cual lo utilicé pero con
el hook de useReducer y no con useState, con esto siento que useReducer me permite manejar estados complejos
y me entrega mucho más rapido la información que useState, teniendo en cuenta que es más utilizado para estados 
locales de componente.
