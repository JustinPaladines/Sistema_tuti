const e = require("express");
const supabase = require("../config/supabase");
//llamamos a la configuracion de supabase

//
async function obtenerTodos() {
    const {data, error} = await supabase
        .from("productos")
        .select("*")
        .order("id", { ascending:true});
    // obtenemos todos los productos en orden ascendente (1, 2, 3)

    if (error){
        throw error;
    }

    return data;
    }

async function  crear(producto) {
    const {data, error} = await supabase
        .from("productos")
        .insert(producto)
        .select()
        .single();
    
    if (error){
        throw error;
    }

    return data;
}

async function obtenerPorId(id) {
    const{data, error} = await supabase
        .from("productos")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if(error){
        throw error;
    }

    return data;
}

async function actualizar(id, producto) {
    const {data, error} = await supabase
        .from("productos")
        .update(producto)
        .eq("id", id)
        .select()
        .maybeSingle();
    
        if(error){
            throw error;
        }

        return data;
}

async function eliminar(id) {
    const {data, error} = await supabase
        .from("productos")
        .delete()
        .eq("id", id)
        .select()
        .maybeSingle()
    
        if (error){
            throw error;
        }

        return data;
}

module.exports = {
    obtenerTodos,
    crear,
    obtenerPorId,
    actualizar,
    eliminar,
};