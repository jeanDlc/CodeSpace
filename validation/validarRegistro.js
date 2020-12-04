export default function validarRegistro(valores){
    const {email,password,nombre,apellido}=valores;
    let errores={};
    if(!nombre || nombre.trim()===''){
        errores.nombre='El nombre es obligatorio';
    }

    if(!apellido || apellido.trim()===''){
        errores.apellido='El apellido es obligatorio';
    }

    if(!email){
        errores.email='El correo es obligatorio';
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
        errores.email='Email no válido';
    }

    if(password.trim()===''){
        errores.password='La contraseña es obligatoria';
    }else if(password.length<6){
        errores.password='La contraseña debe tener más de 6 caracteres';
    }

    return errores;
}