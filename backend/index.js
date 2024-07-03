/*--------SERVIDOR ESTATICO CON EXPRESS-------*/

const express = require('express');
const app = express();
let port = process.env.PORT || 3000;

const consultaRouter = require('./routes/consulta');

app.use(express.json());

app.use('/consulta',usuariosRouter);

/**app.get('/', (req,res) => 
{
    res.send('HOLA DESDE EL PUERTO LOCALHOST:3000');
});**/

app.listen(port , () => 
{
    console.log(`Servidor ejecutandose en el puert ${port}`)
});


















/*
app.get("/", (req,res) => 
{
    //enviar solo un mensaje (texto plano)
    //res.send('CHAU CHAU desde un SERVIDOR DE EXPRESS  Y PROBANDOSE CON NODEMON');

    //enviar un SOLO archivo
    //res.sendFile(__dirname + '/public/index.html');
    //res.sendFile(__dirname + '/public/estilos.css');

});
*/