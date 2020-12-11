import React from 'react';
import Layout from '../components/layout/Layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import useUsuarios from '../hooks/useUsuarios';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
const useStyles = makeStyles((theme) => ({
  lista: {
    width: '100%',
    listStyle:'none',
    padding:0
  },
  liUsuario: {
    backgroundColor:'white',
    padding:'1rem',
    marginBottom:'1.2rem',
    display:'flex',
    alignItems:'flex-start',
    borderRadius:'1rem'
  },
  info:{
    marginLeft:'1rem',
    '& p':{
      margin:0,
    }
  },
  email:{
    color:'#444',
    
  },
  nombre:{
    fontWeight:'bold',
    fontSize:'1.8rem'
  },
  titulo:{
    textAlign:'center',
    color:'var(--colorPrincipal)'
  },
  numSeguidores:{
    color:'var(--colorSecundario)',
    fontSize:'1.3rem'
  }
}));
export default function Creadores() {
  const classes = useStyles();
  const usuarios=useUsuarios();
  console.log(usuarios);
  //despliega la lista de todos los usuarios
  return (
    <>
      <Layout>
        <CssBaseline />
        <Container maxWidth="sm">
          <h1 className={classes.titulo} >Creadores</h1>
          <p>Conoce a tus creadores</p>
          <ul className={classes.lista} >
            {usuarios.map(user=>(
              <li className={classes.liUsuario} key={user.idUsuario} > 
                <Avatar alt="usuario foto" src={user.datos.urlFotoPerfil} />
                <div className={classes.info} >
                  <p className={classes.nombre}>{user.datos.nombre} {user.datos.apellido} </p>
                  <p className={classes.email} >{user.datos.email}</p>
                  <p className={classes.numSeguidores} >{user.datos.numSeguidores} seguidores <FavoriteIcon/></p> 
                </div>  
              </li>
            ))}
          </ul>
        </Container>
      </Layout>
    </>
  )
}
