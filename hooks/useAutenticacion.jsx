import React, { useEffect, useState } from 'react';
import firebase from '../firebase/index';

const useAutenticacion = () => {
    const [usuarioAutenticado, setUsuarioAutenticado]=useState(null);
    useEffect(()=>{
        firebase.auth.onAuthStateChanged(user=> {
          //obtiene al usuario autenticado
            if (user) {
              //setUsuarioAutenticado(user);
              getDatosAdicionales(user);
              //console.log(user);
            } else {
              setUsuarioAutenticado(null);
            }
          });
    },[]);


    //trae información adicional del usuario, y lo guarda en el state
    const getDatosAdicionales=async(usuario)=>{
      
      try {
          await firebase.db.collection("usuarios").doc(usuario.uid)
          .get()
          .then(doc =>{
              if (doc.exists) {
                  const data=doc.data();
                  setUsuarioAutenticado({
                    usuario:usuario,
                    data:data
                  })
              }
          })
          .catch(function(error) {
              console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
    return usuarioAutenticado;
}
 
export default useAutenticacion;