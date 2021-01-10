import React, {useState, useEffect} from 'react';
import firebase from '../firebase/index';

const useUsuario = idUsuario => {
    const [usuarioBuscado, setUsuarioBuscado]=useState(null);
    const [errorGetUsuario, setErrorGetUsuario]=useState('');
    
    useEffect(()=>{ 
        
        let desmontado=false;
        let unsuscribe;
        const getInformacion=(id)=>{
            try {
                unsuscribe= firebase.db.collection("usuarios").doc(id)
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
        if(idUsuario){
           getInformacion(idUsuario);
        }
        //getInformacion(idUsuario);  
        return () => {
            desmontado=true;
            if(unsuscribe){
                console.log('abortando desde useUsuario');
                unsuscribe();
            }
        } 
    },[idUsuario]);    
    return ( {usuarioBuscado, errorGetUsuario} );
}
 
export default useUsuario;