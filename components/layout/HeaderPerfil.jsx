import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {FirebaseContext} from '../../firebase/index';

const HeaderPerfil = ({nombre,id,urlFotoPortada,urlFotoPerfil,apellido}) => {
    /**Estilos de material ui*************************************** */
    const useStyles = makeStyles((theme) => ({
        fotoPortada: {
          backgroundColor:'#444',
          height:'25vh',
          borderRadius:'0 0 1rem 1rem',
          backgroundImage:`url(${urlFotoPortada})`
        },
        large: {
          width: theme.spacing(25),
          height: theme.spacing(25),
        },
        portada:{
            position:'relative',
        },
        btnEditar:{
            position:'absolute',
            bottom:'1rem',
            right:'1rem',
            border:'none',
            backgroundColor:'transparent',
            color:'var(--colorPrincipal)',
            '& svg':{
                fontSize:'3rem',
                cursor:'pointer',
                '&:hover':{
                    color:'var(--colorSecundario)'
                }
            }
        },
        perfil:{
            marginTop:'-10rem',
            display:'flex',
            justifyContent:'center',
        },
        titulo:{
            fontSize:'4.5rem',
            textAlign:'center',
            fontFamily:'var(--fuentePrincipal)',
            marginTop:'0',
            marginBottom:'1rem',
            color:'#444'
        },
        iconoCamara:{
            textAlign:'center',
            marginTop:'0',
            cursor:'pointer',
            '& svg':{
                fontSize:'2.7rem',
                color:'#444'
            },
            '& svg:hover':{
                color:'var(--colorSecundario)'
            }
        }
      }));
    const {usuario}=useContext(FirebaseContext);
    const classes = useStyles();
    const editarFotoPortada=()=>{
        console.log('editar foto portada');
    }
    const editarFotoPerfil=()=>{
        console.log('editar foto perfil');
    }
    return ( 
        <div>
            <div className={classes.portada} >
                <div className={classes.fotoPortada}></div>
                {usuario!=null && usuario.usuario.uid==id?
                    <button className={classes.btnEditar} onClick={editarFotoPortada} >
                        <EditIcon/>
                    </button>
                : null}
                
            </div>
            <div className={classes.perfil} >
                <Avatar
                    alt="Foto perfil"
                    src={urlFotoPerfil}
                    className={classes.large}
                />
            </div>
            {usuario!=null && usuario.usuario.uid==id?
                <div className={classes.iconoCamara} onClick={editarFotoPerfil}>
                    <CameraAltIcon/>
                </div>
            : null}
            
            <h2 className={classes.titulo} >{nombre} {apellido}</h2>
            <Divider/>
        </div>
     );
}
 
export default HeaderPerfil;