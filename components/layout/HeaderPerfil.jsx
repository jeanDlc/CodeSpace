import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {FirebaseContext} from '../../firebase/index';
import Swal from 'sweetalert2';
import firebase from '../../firebase/index';
import mostrarAlertas from '../../alertas';

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
        none:{
            display:'none'
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

    const guardarEnStorage=(imagen, campo)=>{
        try {
            firebase.storage.ref(`userPhoto/${imagen.name}-${usuario.usuario.uid}`).put(imagen)
            .then(fileSnapshot=>{
              fileSnapshot.ref.getDownloadURL().then(url=>{
                    const nombreImagen=`${imagen.name}-${usuario.usuario.uid}`;
                    confirmarCambios(url, campo,nombreImagen);
              }).catch(error=>{
                  console.log(error);
              });
            }).catch(error=>{
                console.log(error);
            });
          } catch (error) {
            console.log(error);
          }
    }
    const editarFoto = e=>{
        //el name del input es el nombre del campo de usuario que se va a editar
        const campo=e.target.name; // puede ser urlFotoPortada o urlFotoPerfil
        const imagen=e.target.files[0]; //imagen que se guardará en storage
        guardarEnStorage(imagen, campo);
    }
    const confirmarCambios=(url,campo,nombreImagen)=>{
        Swal.fire({
            title: 'Seguro de cambiar tu foto?',
            text: "Confirmanos tu respuesta!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#845ec2',
            cancelButtonColor: 'rgb(253, 91, 91)',
            confirmButtonText: 'Editar!',
            cancelButtonText:'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              actualizarPerfil(url,campo);
            }else{
                eliminarImagenDeStorage(nombreImagen);
            }
          })
    }
    const actualizarPerfil=async (url,campo)=>{
        console.log(`Agregar foto ${url} al storage al campo ${campo}`);
        try {
            await firebase.db.collection('usuarios').doc(usuario.usuario.uid).update({
                [campo]:url
            });
            mostrarAlertas('Actualizado','Se actualizó correctamente','success');
        } catch (error) {
            console.log(error);
            mostrarAlertas('Error','Ocurrió un error','error');
        }
    }
    const eliminarImagenDeStorage=async nombreImagen=>{
        console.log(`Elimnar ${nombreImagen}`);
        try {
            await firebase.storage.ref(`userPhoto/${nombreImagen}`).delete().then(()=>{
                console.log('Se eliminó de storage');
            }).catch(error=>{
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }
    return ( 
        <div>
            <div className={classes.portada} >
                <div className={classes.fotoPortada}></div>
                {usuario!=null && usuario.usuario.uid==id?
                    <button className={classes.btnEditar}>
                        
                        <label htmlFor="urlFotoPortada"><EditIcon/></label>
                        <input                       
                        type="file" 
                        id="urlFotoPortada"
                        accept="image/*"
                        name="urlFotoPortada"
                        onChange={editarFoto}
                        className={classes.none}
                        /> 
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
                <div className={classes.iconoCamara}>
                    <label htmlFor="urlFotoPerfil"> <CameraAltIcon/></label>
                    <input                       
                      type="file" 
                      id="urlFotoPerfil"
                      accept="image/*"
                      name="urlFotoPerfil"
                      onChange={editarFoto}
                      className={classes.none}
                    /> 
                </div>
            : null}
            
            <h2 className={classes.titulo} >{nombre} {apellido}</h2>
            <Divider/>
        </div>
     );
}
 
export default HeaderPerfil;