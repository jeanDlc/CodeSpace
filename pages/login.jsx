import styles from '../styles/Formulario.module.css';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import useValidacion from '../hooks/useValidacion';
import validarLogin from '../validation/validarLogin';
export default function Login() {
  const STATE_INICIAL={
    email:'',
    password:''
  }
  const logearUsuario=()=>{
    console.log('logeando');
  }
  const {
    errores,
    valores,
    submitForm,
    handleChange,
    handleSubmit,
  }=useValidacion(STATE_INICIAL,validarLogin,logearUsuario);  

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
