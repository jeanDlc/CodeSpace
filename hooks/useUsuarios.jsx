import React, { useEffect, useState } from 'react';
import firebase from '../firebase/index';
const useUsuarios = () => {
    const [usuarios,setUsuarios]=useState([]);
    const getUsuarios=async()=>{
        try {
            await firebase.db.collection("usuarios").get().then(querySnapshot =>{
                const users=[];
                querySnapshot.forEach(function(doc) {
                    users.push({
                        idUsuario:doc.id,
                        datos:doc.data()
                    })
                });
                setUsuarios(users);
            });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getUsuarios();
    },[]);
    return ( usuarios );
}
 
export default useUsuarios;