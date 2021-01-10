import React, {useContext, useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { FirebaseContext } from '../../firebase';
import styles from '../../styles/Formulario.module.css';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../firebase/index';
import mostrarAlertas from '../../alertas';
import Button from '@material-ui/core/Button';
/**Estilos de material UI **********************/
const useStyles = makeStyles((theme) => ({
    contenedorPrincipal: {
      padding:'1rem',
      marginBottom:'1.5rem'
    },
    titulo:{
        margin:'.7rem 0 0 0',
        fontFamily:'var(--fuentePrincipal)',
        fontSize:'2.5rem',
        color:'var(--colorSecundario)',
        
    },
    descripcion:{
        marginTop:'.5rem',
        color:'var(--dark)',
        fontWeight:'bold'
    }
  }));

/**Componente principal*********************** */
const Descripcion = ({idUsuario, descripcion}) => {

    const [nuevaDescripcion, setNuevaDescripcion ]=useState('');
    const [descripcionEnPantalla, setDescripcionEnPantalla]=useState('');

    //estilos
    const classes = useStyles();

    const {usuario}=useContext(FirebaseContext);
    
    const cambiarDescripcion=async e=>{
        e.preventDefault();
        if(nuevaDescripcion.trim()==='') return;
        try {
            await firebase.db.collection('usuarios').doc(`${idUsuario}`).update({
                descripcion:nuevaDescripcion
            });
            mostrarAlertas('Hecho!', 'Tu descripción se publicó correctamente', 'success');
            setDescripcionEnPantalla(nuevaDescripcion);
        } catch (error) {
            console.log(error);
            mostrarAlertas('Error', 'No se pudo publicar tu descripción, intenta más tarde', 'error');
        }
        e.target.reset();
    }
    useEffect(()=>{
        setDescripcionEnPantalla(descripcion);
    },[descripcion]);
    if(!usuario) return <p>Loading...</p>
    return ( 
        <>
            <Paper>
                {usuario.usuario.uid===idUsuario && (
                    <div className={classes.contenedorPrincipal} >
                        <form onSubmit={cambiarDescripcion} >
                            <div className={styles.formGroup}>
                                <label htmlFor="titulo">Habla sobre ti!</label>
                                <textarea
                                    placeholder="Escribe tu descripción..."
                                    onChange={e=>setNuevaDescripcion(e.target.value.trim())}
                                >
                                </textarea>
                            </div>
                            <div className={styles.formGroup}>
                                <Button 
                                type="submit"
                                color="secondary"
                                variant="contained"
                                >Publicar</Button>
                            </div>
                        </form>
                    </div>
                )}
            </Paper>
            <Paper>
                <div className={classes.contenedorPrincipal} >
                    <h3 className={classes.titulo} >Sobre mí:</h3>
                    {descripcionEnPantalla===''?(
                        <p className={classes.descripcion}>Sin descripción</p>
                    ) : (
                        <p className={classes.descripcion} >{descripcionEnPantalla} </p>
                    )}
                </div>
            </Paper>
        </>
     );
}
 
export default Descripcion;