import React, {useState, useEffect} from 'react';
import firebase from '../firebase/index';

const useUsuario = idUsuario => {
    
    const [usuarioBuscado, setUsuarioBuscado]=useState(null);
    const [errorGetUsuario, setErrorGetUsuario]=useState('');
    const getInformacion=async(idUsuario)=>{
        try {
            firebase.db.collection("usuarios").doc(idUsuario)
            .get()
            .then(doc =>{
                if (doc.exists) {
                    const datos=doc.data();
                    setUsuarioBuscado(datos);                    
                } else {
                    // doc.data() will be undefined in this case
                    setErrorGetUsuario('No se pudo encontrar el usuario');
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
        getInformacion(idUsuario);
        
    },[]);    
    return ( {usuarioBuscado, errorGetUsuario} );
}
 
export default useUsuario;