import React, {useState, useEffect} from 'react';
import firebase from '../firebase/index';

const useUsuario = idUsuario => {
    const [usuarioBuscado, setUsuarioBuscado]=useState(null);
    const [errorGetUsuario, setErrorGetUsuario]=useState('');
    
    useEffect(()=>{ 
        const ac = new AbortController();
        let desmontado=false;
        let unsuscribe;
        const getInformacion=async(id)=>{
            try {
                unsuscribe=await firebase.db.collection("usuarios").doc(id)
                .onSnapshot(doc=>{
                    const datos=doc.data();
                    if(!desmontado){
                        setUsuarioBuscado(datos); 
                    }
                    
                }).catch(error=>{
                    if(!desmontado){
                        setErrorGetUsuario('No se pudo encontrar el usuario');
                    }
                    
                })
            } catch (error) {
                if(!desmontado){
                    setErrorGetUsuario('Hubo un error, intente más tarde');
                }
                
            }
        }
        if(idUsuario && !desmontado){
           getInformacion(idUsuario);  
        }
        //getInformacion(idUsuario);  
        return () => {
            desmontado=true;
            ac.abort();
            if(unsuscribe){
                console.log('abortando desde useUsuario');
                unsuscribe();
            }
        } 
    },[idUsuario]);    
    return ( {usuarioBuscado, errorGetUsuario} );
}
 
export default useUsuario;