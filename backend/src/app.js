const express = require("express");
// importamos la libreria express, el framework de Node
const cors = require("cors");
//importar el middleware cors
//permite que el fronted pueda hacer peticiones al backend
const supabase = require("./config/supabase");

const productoRoutes = require("./routes/productoRoutes");

const app = express();
//inicilizamos la app express (objeto principal)

app.use(cors());
//se activa cors globalmente
app.use(express.json());
//express entienda y convierta datos JSON


app.get("/", (req, res) => {
    // req: Objeto de la petición (datos que vienen del cliente).
    // res: Objeto de la respuesta (lo que le enviamos al cliente).
    res.json({
        mensaje: "Api del sistema tuti funcionando correctamente",
    });
});

app.use("/api/productos", productoRoutes);

module.exports = app;
//exportamos la app pra poder importarla 

