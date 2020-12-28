import React, {useEffect, useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import firebase, {FirebaseContext} from '../../firebase/index';
import LiStyleUsuario from './LiStyleUsuario';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LinearProgress from '@material-ui/core/LinearProgress';
const useStyles = makeStyles((theme) => ({
    paper: {
        [theme.breakpoints.down('sm')]: {
            width: '95%',  
        },
        [theme.breakpoints.up('sm')]: {
            width: 450,  
        },
        maxHeight: 500,
        overflowY: 'auto',
        width: 400,
        backgroundColor: '#845ec2a8',
        boxShadow: theme.shadows[10],
        padding: theme.spacing(2),
        borderRadius:'.5rem',
        border:'2px solid white',
    },
    modal:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo:{
        textTransform:'uppercase',
        fontFamily:'var(--fuentePrincipal)',
        fontSize:'2rem',
        color:'white',
        textAlign:'center',
        marginTop:'1rem',
        '& svg':{
            fontSize:'2.2rem'
        },
        
        
    }
}));

const ModalSeguidores = () => {
    const {usuario}=useContext(FirebaseContext);
    const [seguidores,setSeguidores]=useState([]);
    const [loading, setLoading]=useState(false);
    
    const classes = useStyles();
    
    
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        setLoading(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(()=>{
        let unsuscribe;
        let desmontado=false;
        const getSeguidores=async()=>{
            try {
                unsuscribe=await firebase.db.collection('usuarios').where('idUserSeguidos',"array-contains", usuario.usuario.uid).get()
                .then(querySnapshot=> {
                    let resultados=[];
                    querySnapshot.forEach(doc=> {
                        // doc.data() is never undefined for query doc snapshots
                        resultados.push({
                            idUsuario:doc.id,
                            ...doc.data()
                        });
                    });
                    if(!desmontado){
                        setSeguidores(resultados);
                        setLoading(false);
                    }
                })
            
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
      if(usuario && open ){
          getSeguidores();
      }
      return ()=>{
        desmontado=true;
        if(unsuscribe){
            unsuscribe();
        }
      }
  },[open]);
    return ( 
        <div>
            <Button
                color="secondary"
                variant="contained"
                fullWidth={true} 
                type="button" 
                onClick={handleOpen}
            >
                Seguidores  <FavoriteIcon/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                disableScrollLock={true}
                className={classes.modal}
                
            >
                <div  className={classes.paper}>
                    <h2 className={classes.titulo} id="simple-modal-title" >
                        {seguidores.length}  Seguidores <FavoriteIcon/>
                    </h2>
                    {loading && <LinearProgress />}
                    <ul>
                        {seguidores.map(seguidor=>(
                            <LiStyleUsuario usuario={seguidor} key={seguidor.idUsuario} />
                        ))}
                    </ul>
                </div>
                
            </Modal>
        </div>
     );
}
 
export default ModalSeguidores;