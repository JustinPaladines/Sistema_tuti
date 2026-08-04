require("dotenv").config();
//cargar variables de entorno

const app = require("./app");
//importamos la aplicación express que creamos en app.js

const PORT = process.env.PORT || 3000;
// servidor para entorno o de manera local

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
})

//express debe esuchar las conexiones del puerto
//imprime un mensaje en la consola confirmando que el servidor está activo y mostrando la URL