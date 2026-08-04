const supabase = require("../config/supabase");
const productoModel = require("../models/productoModel");
// importamos el modelo de productos

async function obtenerProductos(req, res) {
    try{
        const productos = await productoModel.obtenerTodos();
        
        return res.status(200).json({
            mensaje: "Productos obtenidos",
            datos: productos,
        });
    } catch (error){
        return res.status(500).json({
            mensaje: "Error al obtener productos",
            error: error.message,
        });
    }
}

async function crearProducto(req, res) {
    try{

        const{
            nombre, 
            codigo,
            descripcion,
            categoria, 
            precio,
            stock,
            proveedor,
        } = req.body;

        if(!nombre || !codigo || !categoria || precio === undefined || stock === undefined || !proveedor){
                return res.status(400).json({
                    mensaje:"faltan campos obligatorios",
                });
            }

        if(Number(precio)<0){
            return res.status(400).json({
                mensaje: "El precio no puede ser negativo",
            });
        }

        if(!Number.isInteger(Number(stock)) || Number(stock) <0){
            return res.status(400).json({
                mensaje: "El stock no puede ser negativo",
            });
        }

        const nuevoProducto= await productoModel.crear({
            nombre,
            codigo,
            descripcion: descripcion || null,
            categoria,
            precio: Number(precio),
            stock: Number(stock),
            proveedor,
        });

        return res.status(201).json({
            mensaje: "producto creado correctamente",
            datos: nuevoProducto,
        });
    } catch (error){
        if(error.code === "23505"){
            return res.status(409).json({
                mensaje: "No pueden existir productos duplicados",
            });
        }

        return res.status(500).json({
            mensaje: "error al crear producto",
            error: error.message,
        });
    } 
}

async function  obtenerProductoPorId(req, res) {
    try{
        const id = Number(req.params.id);

        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                mensaje: "El id del producto no es valido",
            });
        }

        const producto = await productoModel.obtenerPorId(id);

        if (!producto){
            return res.status(404).json({
                mensaje: "Producto no encontrado",
            });
        }

        return res.status(200).json({
            mensaje:"Producto encontrado correctamente",
            datos: producto,
        })

    } catch(error){
        return res.status(500).json({
            mensaje: "Error al obtener el producto",
            error: error.message,
        });
    }
}

async function actualizarProducto(req,res) {
    try{
        const id = Number(req.params.id);

        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                mensaje: "El id no puede ser negativo",
            });
        }

        const { nombre, codigo, descripcion, categoria, precio, stock, proveedor,} = req.body;

        if(!nombre ||
            !codigo ||
            !categoria ||
            precio === undefined ||
            stock === undefined ||
            !proveedor){
                return res.status(400).json({
                    mensaje: "Los campos son obligatorios"
                });
            }

        if (Number(precio) < 0) {
            return res.status(400).json({
                mensaje: "El precio no puede ser negativo",
            });
        }

        if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
            return res.status(400).json({
                mensaje: "El stock debe ser un número entero no negativo",
            });
        }

        const productoActualizado = await productoModel.actualizar(id, {
            nombre,
            codigo,
            descripcion: descripcion || null,
            categoria,
            precio: Number(precio),
            stock: Number(stock),
            proveedor,
        });

        if (!productoActualizado) {
            return res.status(404).json({
                mensaje: "Producto no encontrado",
            });
        }

        return res.status(200).json({
            mensaje: "Producto actualizado correctamente",
            datos: productoActualizado,
        });
    } catch (error){
        if (error.code === "23505") {
            return res.status(409).json({
                mensaje: "Ya existe un producto con ese código",
            });
        }

        return res.status(500).json({
            mensaje: "Error al actualizar el producto",
            error: error.message,
        });
    } 
}

async function eliminarProducto(req, res) {
    try{
        const id = Number(req.params.id);

        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                mensaje: "El id del producto no es valido",
            });
        }

        const productoEliminado = await productoModel.eliminar(id);

        if(!productoEliminado){
            return res.status(404).json({
                mensaje: "Producto no encontrado",
            });
        }

        return res.status(200).json({
            mensaje: "Producto eliminado",
            datos: productoEliminado,
        });

    } catch(error){
        if (error.code === "23505"){

            return res.status(409).json({
                mensaje: "Ya existe un producto con ese codigo"
            });
        }

        return res.status(500).json({
            mensaje: "Error al actualizar el producto",
            error: error.menssage,
        });
    }

    
}

module.exports = {
    obtenerProductos,
    crearProducto,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
}
