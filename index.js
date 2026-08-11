const express = require('express');
const cors = require('cors');
const json = require('body-parser/json');
const urlencoded = require('body-parser/urlencoded');
const app = express()
const port = 3000




//UTILIDADES
const roundUpNoDecimals = (input) => {
    return isNaN(input) ? 0 : Math.round(input);
}



// UF Client (Para funciones asincronas):

const getUFData = async () => {
    const url = "https://api.boostr.cl/economy/indicators.json"
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Error al consultar el servicio externo de divisas');
    }

    const result = await response.json()
    return result
}   





// FUNCIONES DE SERVICIO UF:

const calculatePriceByUF = async (UFInputVALUE) => {


    //consulta el valor actual de la UF (get al api externa https://api.boostr.cl/economy/indicators.json)
    const ufApiData = await getUFData();
    const ufIndicator = ufApiData?.data?.uf;

    if (!ufIndicator || !ufIndicator.value) {
        const error = new Error('No se encontró el indicador UF en la respuesta');
        error.status = 404;
        throw error;
    }

    const valorUF = ufIndicator.value;
    const cantidadUF = Number(UFInputVALUE);

    // calcula el equivalente en pesos chilenos, lo redondea y lo retorna
    const calculatedRaw = UFInputVALUE * valorUF;
    const calculatedRounded = roundUpNoDecimals(calculatedRaw);
    return calculatedRounded

}




// FUNCIONES DE CONTROLADOR UF:

const getCLPByUF = async (req, res) => {
    //recibe el valor de entrada en el body, llama la funcion del servicio y maneja la respuesta 
    try {
        const { UFvalue } = req.body 

        // obtiene la respuesta del servicio
        const calculatedValue = await calculatePriceByUF(UFvalue)
        const responseData = { calculatedValue }
        res.status(200).json({message:'solicitud procesada con exito', ...responseData});

    } catch (error) {
        console.log('error on UF controller', error)
        res.status(500).send('Server error')
    }

}


// MIDDLEWARES INICIALES cors , body parse, form-encoded
 app.use(cors());
 app.use(express.json())
 app.use(express.urlencoded({ extended: true }))
 



// RUTAS
app.post('/CLPByUF', getCLPByUF);



// MIDDLEWARE 404 (Ruta no encontrada)
app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

// MIDDLEWARE GLOBAL DE ERRORES 
app.use((err, req, res, next) => {
    const status = err.status || 500;
    
    console.error(`[Error Handler] Status ${status}: ${err.message}`);

    res.status(status).json({
        success: false,
        error: {
            message: err.message || 'Error interno del servidor',
            status: status
        }
    });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})