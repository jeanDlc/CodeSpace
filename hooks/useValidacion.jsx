import React, {useEffect, useState} from 'react';
const useValidacion = (stateInicial,validar, fn) => {
    const [valores, setValores]=useState(stateInicial);
    const [errores, setErrores]=useState({});
    const [submitForm, setSubmitForm]=useState(false);
    useEffect(()=>{
        if(submitForm){
            const sinErrores=Object.keys(errores).length===0;
            if(sinErrores){
                fn();
            }
            setSubmitForm(false);
        }
    },[submitForm]);

    //función para validar c/vez que el usuario escribe
    const handleChange=e=>{        
        setValores({
            ...valores,
            [e.target.name]:e.target.value
        });
    }
    const handleSubmit=e=>{
        e.preventDefault();
        const erroresValidacion=validar(valores);
        setErrores(erroresValidacion);
        setSubmitForm(true);

        //si no hay errores, resetear el formulario
        if(Object.keys(erroresValidacion).length===0){
            e.target.reset();
        }
    }
    return {
        errores,
        valores,
        submitForm,
        handleChange,
        handleSubmit,
    }
}
 
export default useValidacion;