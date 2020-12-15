import React, {useState, useEffect} from 'react';
import firebase from '../firebase/index';

const useUsuario = idUsuario => {
    console.log(idUsuario);
    const [usuarioBuscado, setUsuarioBuscado]=useState(null);
    const [errorGetUsuario, setErrorGetUsuario]=useState('');
    const getInformacion=async(id)=>{
        try {
            
            await firebase.db.collection("usuarios").doc(id)
            .get()
            .then(doc =>{
                console.log('consultando')
                if (doc.exists) {
                    const datos=doc.data();
                    setUsuarioBuscado(datos);                    
                } else {
                    // doc.data() will be undefined in this case
                    setErrorGetUsuario('El usuario no existe: ' + id);
                }
            })
            .catch(function(error) {
                setErrorGetUsuario('No se pudo encontrar el usuario');
            });
        } catch (error) {
            setErrorGetUsuario('Hubo un error, intente más tarde');
        }
    }
    useEffect(()=>{
        if(idUsuario){
            getInformacion(idUsuario);
        }
        
    },[idUsuario]);    
    return ( {usuarioBuscado, errorGetUsuario} );
}
 
export default useUsuario;