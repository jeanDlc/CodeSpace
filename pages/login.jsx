import styles from '../styles/Formulario.module.css';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import useValidacion from '../hooks/useValidacion';
import validarLogin from '../validation/validarLogin';
import firebase from '../firebase/index';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import mostrarAlertas from '../alertas';
import Button from '@material-ui/core/Button';
export default function Login() {
  const router=useRouter();

  //state local
  const [errorLogin, setErrorLogin]=useState(false);

  //muestra errores de logeo
  useEffect(()=>{
    if(errorLogin){
      mostrarAlertas('Error', 'No se pudo iniciar sesión', 'error');
    }
  },[errorLogin]);

  //state inicial que necesita el custom hook
  const STATE_INICIAL={
    email:'',
    password:''
  }

  //logear al ususario
  const logearUsuario=async()=>{
    try {
      await firebase.login(email, password);
      router.push('/');
    } catch (error) {
      console.log(error);
      setErrorLogin(true);
    }
  }

  //custom hook que valida el formulario
  const {
    errores,
    valores,
    submitForm,
    handleChange,
    handleSubmit,
  }=useValidacion(STATE_INICIAL,validarLogin,logearUsuario);  

  //valores ingresados en el formulario
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
              <div className={styles.formGroup}>
                <Button 
                  type="submit"
                  color="secondary"
                  variant="contained" 
                >Listo</Button>
              </div>
              <Link href="/registro">
                  <a className={styles.enlace}>Crea una nueva cuenta</a>
              </Link>
          </form>          
        </div>
      </Layout>
    </>
  )
}
