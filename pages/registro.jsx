import styles from '../styles/Formulario.module.css';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import useValidacion from '../hooks/useValidacion';
import validarRegistro from '../validation/validarRegistro';
import { makeStyles } from '@material-ui/core/styles';


export default function Registro() {


  const STATE_INICIAL={
    nombre:'',
    apellido:'',
    email:'',
    password:''
  }
  const registrarUsuario=()=>{
    console.log(valores);
    console.log('registrando usuario');
  }
  const {
    errores,
    valores,
    submitForm,
    handleChange,
    handleSubmit,
  }=useValidacion(STATE_INICIAL,validarRegistro,registrarUsuario);

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
