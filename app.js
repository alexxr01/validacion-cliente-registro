// Declaraciones e importaciones necesarias para nuestra actividad
const express = require('express')
const app = express()
const { body, validationResult } = require('express-validator')
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})
// Todo lo que se encuentre dentro de la acción registrar
app.post('/registrar', [
    /*
    Analizamos el campo 'usuario', en el caso de tener menos de 5
    carácteres, nos mostrará el mensaje de error.
    */
    body('usuario', 'El usuario debe tener al menos 5 carácteres')
        // Debe existir.
        .exists()
        // Debe tener un mínimo de 5 carácteres según lo recogido.
        .isLength({ min: 5 }),
    /*
    Se insertará un email cualquiera, si es correcto continúa, sin embargo si
    ocurre algún error, nos devolverá un mensaje de error.
    */
    body('email', 'El email introducido no es válido.')
        // Debe estar relleno y existir algo dentro
        .exists()
        // Debe ser un email
        // express-validator se encargará de comprobar si es un email correcto o no.
        .isEmail(),
    /*
    Recogemos el contenido de la casilla 'contraseña', y se analizará
    a partir de las validaciones que querámos realizarle.
    */
    body('contrasena', 'La contraseña debe tener al menos 5 carácteres')
        // Debe existir y haber un contenido en su interior
        .exists()
        // La contrasena debe tener un mínimo de 5 carácteres, menos no es válida.
        .isLength({ min: 5 })
], (req, res) => {
    // Validación propia    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(req.body)
        const valores = req.body
        const validaciones = errors.array()
        // Devolvemos los errores que se hayan detectado.
        res.render('index', { validaciones: validaciones, valores: valores })
    } else {
        // Si está todo correcto devolvemos un mensaje.
        res.send('Todos los datos son correctos!')
    }
})
// Arrancamos un servidor en el puerto 3000
app.listen(3000, () => {
    // Enviamos un mensaje de confirmación y además aprobechamos para mostrar la dirección directa.
    console.log('El servidor se ha iniciado en http://localhost:3000')
})