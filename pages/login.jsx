import styles from '../styles/Formulario.module.css';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import useValidacion from '../hooks/useValidacion';
import validarLogin from '../validation/validarLogin';
import firebase from '../firebase/index';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
export default function Login() {
  //state local
  const [errorLogin, setErrorLogin]=useState(false);

  //muestra errores de logeo
  useEffect(()=>{
    if(errorLogin){
      Swal.fire({
        title: 'Error!',
        text: 'No se pudo iniciar sesión',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  },[errorLogin]);

  const STATE_INICIAL={
    email:'',
    password:''
  }

  //logear al ususario
  const logearUsuario=async()=>{
    try {
      const usuario=await firebase.login(email, password);
      console.log(usuario);
    } catch (error) {
      console.log(error);
      setErrorLogin(true);
    }
  }
  const {
    errores,
    valores,
    submitForm,
    handleChange,
    handleSubmit,
  }=useValidacion(STATE_INICIAL,validarLogin,logearUsuario);  

  const {email, password}=valores;

  return (
    <>
      <Layout>
        <div className={styles.contenedorFormulario}>
          <h1 className="text-center">Inicia sesión</h1>
          <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                  <label htmlFor="email">Tu correo electrónico</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Escribe tu email"
                    onChange={handleChange}
                  />
                  {errores.email && <p className={styles.errorValidacion}>{errores.email} </p>}
              </div>
              <div className={styles.formGroup}>
                  <label htmlFor="password">Contraseña</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Escribe tu contraseña"
                    onChange={handleChange}
                  />
                  {errores.password && <p className={styles.errorValidacion}>{errores.password} </p>}
              </div>              
              <button type="submit" className={styles.btnSubmit} >Listo</button>
              <Link href="/registro">
                  <a className={styles.enlace}>Crea una nueva cuenta</a>
              </Link>
          </form>          
        </div>
      </Layout>
    </>
  )
}
