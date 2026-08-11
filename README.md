# Para clonar proyecto ejecutar (git):

git clone https://github.com/brosej/falabellaseguros-test.git

# Ejercicio 1: API de calculo de valor mediante UF:

## Para levantar el API, ejecutar desde la carpeta raiz (necesario tener node.js instalado):

npm install

npm run start 

## URL local al levantar: http://localhost:3000/CLPByUF

## ENDPOINT: POST /CLPByUF

## REQUEST BODY (Entrada):
### {"UFvalue": 10}

## RESPONSE (Salida 200 OK):
### {"message": "solicitud procesada con exito", "calculatedValue": 408474}

# Ejercicio 2: Ejercicio de recorrido de matrices:

## Para ejecutar el script del ejercicio y que devuelva el resultado en la consola, ejecutar desde la carpeta raiz (necesario tener node.js instalado):

npm run matrices

