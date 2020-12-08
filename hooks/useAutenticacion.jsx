import React, { useEffect, useState } from 'react';
import firebase from '../firebase/index';
import useUsuario from './useUsuario';
const useAutenticacion = () => {
    const [usuarioAutenticado, setUsuarioAutenticado]=useState(null);
    useEffect(()=>{
        firebase.auth.onAuthStateChanged(user=> {
            if (user) {
              setUsuarioAutenticado(user);              
              console.log(user);
            } else {
              setUsuarioAutenticado(null);
            }
          });
    },[]);
    return usuarioAutenticado;
}
 
export default useAutenticacion;