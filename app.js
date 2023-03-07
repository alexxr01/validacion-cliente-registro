const express = require('express')
const app = express()
const {body, validationResult} = require('express-validator')
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/registrar', [
    body('usuario', 'El usuario debetener al menos 5 carácteres')
        .exists()
        .isLength({min:5}),
    body('email', 'El email introducido no es válido.')
        .exists()
        .isEmail(),
    body('contrasena', 'La contraseña debe tener al menos 5 carácteres')        
        .exists()
        .isLength({min:5})
], (req, res)=>{
    //Validación de la documentación oficial
    /* const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      console.log(errors)
    } */

    //validación propia    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(req.body)
        const valores = req.body
        const validaciones = errors.array()
        res.render('index', {validaciones:validaciones, valores: valores})
    }else{
        res.send('¡Validación Exitosa!')
    }
})
app.listen(3000, ()=>{
    console.log('El servidor se ha iniciado en http://localhost:3000')
})