/**
* @author Alan Aguilar
* @description Función para generar un objeto de respuesta a peticiones de endpoints
* @date 12-02-2024
* @return {Object}
*/
const responseUtil = (statusCode, message, data) => {
    const responseObject = {
        statusCode: Number(statusCode),
        message: `${message}`,
        data: data
    }

    return responseObject
}

module.exports = {
    responseUtil
}