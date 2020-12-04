import styles from '../styles/Formulario.module.css';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
export default function Registro() {
  return (
    <>
      <Layout>
        <div className={styles.contenedorFormulario}>
          <h1 className="text-center">Regístrate</h1>
          <form>
              <div className={styles.formGroup}>
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" id="nombre" placeholder="Escribe tu nombre"/>
              </div>
              <div className={styles.formGroup}>
                  <label htmlFor="apellido">Apellido</label>
                  <input type="text" id="apellido" placeholder="Escribe tu apellido"/>
              </div>
              <div className={styles.formGroup}>
                  <label htmlFor="email">Tu correo electrónico</label>
                  <input type="email" id="email" placeholder="Escribe tu email"/>
              </div>
              <div className={styles.formGroup}>
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" id="password" placeholder="Escribe tu contraseña"/>
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
