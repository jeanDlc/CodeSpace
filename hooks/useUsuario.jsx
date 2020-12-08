import React, {useState, useEffect} from 'react';
import firebase from '../firebase/index';
const useUsuario = idUsuario => {
    const [usuarioBuscado, setUsuarioBuscado]=useState(null);
    const [errorGetUsuario, setErrorGetUsuario]=useState('');
    const getInformacion=async(idUsuario)=>{
        try {
            firebase.db.collection("usuarios").where("idAuth", "==", idUsuario)
            .get()
            .then(querySnapshot =>{                
                querySnapshot.forEach(doc=> {
                    // doc.data() is never undefined for query doc snapshots
                    const datos=doc.data();
                    setUsuarioBuscado(datos);
                });
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