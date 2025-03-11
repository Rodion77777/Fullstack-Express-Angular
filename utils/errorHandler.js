/**
 * @param {import('express').Response} res 
 * @param {Error | string} error 
 */
module.exports = (res, error) => {
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error
    })
}