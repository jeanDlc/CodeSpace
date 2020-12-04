import React, { useEffect } from 'react';
import styles from '../styles/Formulario.module.css';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import useValidacion from '../hooks/useValidacion';
import validarRegistro from '../validation/validarRegistro';
import firebase from '../firebase/index';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Registro() {  
  //state local
  const [errorAuth, setErrorAuth]=useState(false);
  useEffect(()=>{
    if(errorAuth){
      Swal.fire({
        title: 'Error!',
        text: 'Hubo error en la autenticación',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  },[errorAuth]);
  const STATE_INICIAL={
    nombre:'',
    apellido:'',
    email:'',
    password:''
  }
  
  const registrarUsuario=async ()=>{
    try {
      await firebase.registrar(nombre, apellido,email,password);
      setErrorAuth(false);
    } catch (error) {      
      setErrorAuth(true);
    }
  }
  
  const {
    errores,
    valores,
    submitForm,
    handleChange,
    handleSubmit,
  }=useValidacion(STATE_INICIAL,validarRegistro,registrarUsuario);
  const {email, password, nombre, apellido}=valores;

  return (
    <>
      <Layout>
        <div className={styles.contenedorFormulario}>
          
          <h1 className="text-center">Regístrate</h1>          
          <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                  <label htmlFor="nombre">Nombre</label>
                  <input 
                    type="text" 
                    id="nombre" 
                    placeholder="Escribe tu nombre"
                    name="nombre"
                    onChange={handleChange}
                  />
                  {errores.nombre && <p className={styles.errorValidacion}>{errores.nombre} </p>}
              </div>
              <div className={styles.formGroup}>
                  <label htmlFor="apellido">Apellido</label>
                  <input 
                    type="text" 
                    id="apellido" 
                    placeholder="Escribe tu apellido"
                    name="apellido"
                    onChange={handleChange}
                  />
                  {errores.apellido && <p className={styles.errorValidacion}>{errores.apellido} </p>}
              </div>
              <div className={styles.formGroup}>
                  <label htmlFor="email">Tu correo electrónico</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Escribe tu email"
                    name="email"  
                    onChange={handleChange}
                  />
                  {errores.email && <p className={styles.errorValidacion}>{errores.email} </p>}
              </div>
              <div className={styles.formGroup}>
                  <label htmlFor="password">Contraseña</label>
                  <input 
                    type="password" 
                    id="password" 
                    placeholder="Escribe tu contraseña"
                    name="password" 
                    onChange={handleChange} 
                  />
                  {errores.password && <p className={styles.errorValidacion}>{errores.password} </p>}
              </div>
              
              <button type="submit" className={styles.btnSubmit} >Listo</button>
              <Link href="/login">
                  <a className={styles.enlace}>¿Ya tienes una cuenta?</a>
              </Link>
          </form>
          
        </div>
      </Layout>
    </>
  )
}
