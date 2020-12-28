import React, { useEffect, useState } from 'react';
import firebase from '../firebase/index';

const useAutenticacion = () => {
    const [usuarioAutenticado, setUsuarioAutenticado]=useState(null);
    useEffect(()=>{
        let desmontado=false;
        const ac = new AbortController();
        let unsuscribe;
        //trae información adicional del usuario, y lo guarda en el state
        const getDatosAdicionales=async(usuario)=>{
          try {
              unsuscribe=await firebase.db.collection("usuarios").doc(usuario.uid)
              .onSnapshot(doc =>{
                  const data=doc.data();
                  if(!desmontado){
                    setUsuarioAutenticado({
                      usuario:usuario,
                      data:data
                    })
                  }
                  
              });
          } catch (error) {
            console.log(error);
          }
        }

        firebase.auth.onAuthStateChanged(user=> {
          //obtiene al usuario autenticado
            if (user && !desmontado) {
              //setUsuarioAutenticado(user);
              getDatosAdicionales(user);
              //console.log(user);
            }else{
              if(!desmontado){
                setUsuarioAutenticado(null);
              }
              
            }
          });
          return () => {
            ac.abort(); 
            desmontado=true;
            if(unsuscribe){
              console.log('desmontando desde useAutenticacion');
              unsuscribe();
            }
          }
    },[]);

    return usuarioAutenticado;
}
 
export default useAutenticacion;