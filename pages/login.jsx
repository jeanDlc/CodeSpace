import styles from '../styles/Formulario.module.css';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
export default function Login() {

  return (
    <>
      <Layout>
        <div className={styles.contenedorFormulario}>
          <h1 className="text-center">Inicia sesión</h1>
          <form>
              <div className={styles.formGroup}>
                  <label htmlFor="email">Tu correo electrónico</label>
                  <input type="email" id="email" placeholder="Escribe tu email"/>
              </div>
              <div className={styles.formGroup}>
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" id="password" placeholder="Escribe tu contraseña"/>
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
