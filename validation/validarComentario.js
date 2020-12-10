export default function validarComentario(valores){
    const {comentario}=valores;
    let errores={};
    if(comentario.trim()===''){
        errores.comentario='Comentario no válido';
    }
    return errores;
}