import React, {useState, useEffect} from 'react';
import firebase from '../firebase/index';

const useUsuario = idUsuario => {
    const [usuarioBuscado, setUsuarioBuscado]=useState(null);
    const [errorGetUsuario, setErrorGetUsuario]=useState('');
    
    useEffect(()=>{ 
        const ac = new AbortController();
        let desmontado=false;
        
        const getInformacion=async(id)=>{
            try {
                
                await firebase.db.collection("usuarios").doc(id)
                .get()
                .then(doc =>{
                    if (doc.exists) {
                        const datos=doc.data();
                        if(!desmontado){
                            setUsuarioBuscado(datos); 
                        }
                                           
                    } else {
                        // doc.data() will be undefined in this case
                        if(!desmontado){
                            setErrorGetUsuario('El usuario no existe: ' + id);
                        }
                        
                    }
                })
                .catch(function(error) {
                    if(!desmontado){
                        setErrorGetUsuario('No se pudo encontrar el usuario');
                    }
                    
                });
            } catch (error) {
                if(!desmontado){
                    setErrorGetUsuario('Hubo un error, intente más tarde');
                }
                
            }
        }
        if(idUsuario && !desmontado){
            getInformacion(idUsuario);  
        }
        
        return () => {
            //console.log('abortando desde useUsuario');
            desmontado=true;
            ac.abort();
        } 
    },[idUsuario]);    
    return ( {usuarioBuscado, errorGetUsuario} );
}
 
export default useUsuario;