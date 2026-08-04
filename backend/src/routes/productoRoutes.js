const express = require("express");
const productoController = require("../controllers/productoController");

const router = express.Router();

router.get("/", productoController.obtenerProductos);

router.post("/", productoController.crearProducto);

router.get("/:id", productoController.obtenerProductoPorId);

router.put("/:id", productoController.actualizarProducto);

router.delete("/:id", productoController.eliminarProducto);
module.exports = router;
