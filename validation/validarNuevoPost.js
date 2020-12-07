export default function validarNuevoPost(valores){
    const {titulo,url,descripcion}=valores;
    let errores={};
    if(!titulo || titulo.trim()===''){
        errores.titulo='EL título es obligatorio';
    }
    
    //la url es opcional
    if(url){
        if(!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url)){
            errores.url='URL no válida';
        }
    }

    if(!descripcion || descripcion.trim()===''){
        errores.descripcion='La descripción es obligatoria';
    }
    return errores;

}