import React, { useEffect, useContext } from 'react';
import styles from '../styles/Formulario.module.css';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import useValidacion from '../hooks/useValidacion';
import firebase from '../firebase/index';
import { useState } from 'react';
import { useRouter } from 'next/router';
import validarNuevoPost from '../validation/validarNuevoPost';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {FirebaseContext} from '../firebase/index';
import mostrarAlertas from '../alertas';
import Button from '@material-ui/core/Button';
/**Estilos de material UI **********************/
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',    
    '& > * + *': {
      marginLeft: theme.spacing(2),
      
    },
    '& div':{
      color:'#845ec2',
      margin:'0 auto'
    },
    '& p':{
      color:'#7f7f7f',
      marginBottom:'0'
    }
  },
}));

/**Componente principal*********************** */
export default function NuevoPost() {   

  const router=useRouter();

  //context de firebase con información del usuario
  const {usuario}=useContext(FirebaseContext);

  const classes = useStyles();
  
  //state local
  const [error, setError]=useState(false);
  const [loading, setLoading]=useState(false);
  const [nombreImg, setNombreImg]=useState('No se ha seleccionado ningún archivo');
  const [urlImagen, setUrlImagen]=useState('');

  /**state inicial para el hook personalizado */
  const STATE_INICIAL={
    titulo:'',
    descripcion:'',
    url:''
  }

  /**guarda el post en firebase */
  const crearPost=async()=>{
    if(!usuario){
      router.push('/login');
    }
    try {
      const post={
        idCreador:usuario.usuario.uid,
        fecha: Date.now(),
        titulo,
        descripcion,
        url,
        urlImagen,
        idUserLikes:[],
        comentarios:[]
      }
      //crear un post en la BBDD
      await firebase.db.collection('posts').add(post);

      mostrarAlertas('Éxito', 'Se guardó correctamente', 'success');
      router.push('/');
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }  

  /**Hook personalizado que valida el formulario */
  const {
    errores,
    valores,
    submitForm,
    handleChange,
    handleSubmit,
  }=useValidacion(STATE_INICIAL,validarNuevoPost, crearPost );

  //extraer los valores ingresados en el formulario
  const {titulo,descripcion,url}=valores;

  /**Si hay error, entonces se muestra mensaje */
  useEffect(()=>{
     if(error){
      mostrarAlertas('Error', 'Parece algo salió mal', 'error');
      //resetea el state de error
      setTimeout(() => {
        setError(false);
      }, 3000);
     }
  },[error]);

  /**Sube una imagen hacia firebase storage */
  const subirImagen=e=>{
    if(!usuario){
      router.push('/login');
    }
    setLoading(true);
    if(e.target.files.length>=1){
      const imagen=e.target.files[0];
      
      try {
        firebase.storage.ref(`postImagenes/${usuario.usuario.uid}-${imagen.name}`).put(imagen).then(fileSnapshot=>{
          fileSnapshot.ref.getDownloadURL().then(url=>{
            setUrlImagen(url);
            setError(false);
            setLoading(false);
            setNombreImg(imagen.name + ' ✓');
          }).catch(error=>{
              console.log(error);
              setError(true);
              setLoading(false);
          });
        }).catch(error=>{
            console.log(error);
            setError(true);
            setLoading(false);
        });
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    }    
  }

  return (
    <>
      <Layout>
        <div className={styles.contenedorFormulario}>
            
            <h1 className="text-center">Nuevo Post</h1>          
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="titulo">Título de Post</label>
                    <input 
                      required
                      type="text" 
                      id="titulo" 
                      placeholder="Escribe un título para tu post"
                      name="titulo"
                      onChange={handleChange}
                    />                    
                    {errores.titulo && <p className={styles.errorValidacion}>{errores.titulo} </p>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea 
                      name="descripcion" 
                      id="descripcion" 
                      placeholder="Escribe de lo que tratará tu post"
                      required
                      onChange={handleChange}></textarea>                    
                    {errores.descripcion && <p className={styles.errorValidacion}>{errores.descripcion} </p>}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.pointer} htmlFor="imagen">Escoge una imagen para tu post + </label> <span>(opcional)</span>
                    <input                       
                      type="file" 
                      id="imagen" 
                      accept="image/*"
                      name="imagen"  
                      className={styles.inputImagen}
                      onChange={subirImagen}
                    />  
                    <div className={classes.root}>
                      <p>{nombreImg}</p>
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label  htmlFor="url">URL</label><span>(opcional)</span>
                    <input                 
                        type="url"                 
                        name="url"
                        id="url"
                        placeholder="Escribe una URL para tu Post"
                        onChange={handleChange}
                    />
                    {errores.url && <p className={styles.errorValidacion}>{errores.url} </p>}
                </div>
                {loading?
                  <div className={classes.root}>
                    <CircularProgress />
                  </div>
                  :
                  <div className={styles.formGroup}>
                    <Button 
                      type="submit"
                      color="secondary"
                      variant="contained" 
                    >Listo</Button>
                  </div>
                }
                
                <Link href="/login">
                    <a className={styles.enlace}>¿Ya tienes una cuenta?</a>
                </Link>
            </form>
            
          </div>
      </Layout>
    </>
  )
}
