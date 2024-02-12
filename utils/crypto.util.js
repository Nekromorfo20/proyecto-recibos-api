const bcrypt = require("bcrypt")

/**
* @author Alan Aguilar
* @description Función para encriptar una contraseña
* @date 12-02-2024
* @return {String}
*/
const encriptarContrasena = async (plaintextPassword) => {
    const hash = await bcrypt.hash(plaintextPassword, Number(process.env.API_BCRYPT_SALT_ROUNDS))
    return hash
}
 
/**
* @author Alan Aguilar
* @description Función para validar una contraseña encriptada
* @date 12-02-2024
* @return {Boolean}
*/
const validarContrasena = async (plaintextPassword, hash) => {
    const result = await bcrypt.compare(plaintextPassword, hash)
    return result
}

module.exports = {
    encriptarContrasena,
    validarContrasena
}