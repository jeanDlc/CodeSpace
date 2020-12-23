import React, {useEffect, useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import firebase, {FirebaseContext} from '../../firebase/index';
import LiStyleUsuario from './LiStyleUsuario';
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'var(--colorSecundario)',
        boxShadow: theme.shadows[10],
        padding: theme.spacing(2),
        borderRadius:'.5rem'
    },
}));

const ModalSeguidos = () => {
    const {usuario}=useContext(FirebaseContext);
    const [seguidores,setSeguidores]=useState([]);
    
    
    const classes = useStyles();
    
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(()=>{
        let unsuscribe;
        let desmontado=false;
        const getSeguidores=async()=>{
            try {
                await firebase.db.collection('usuarios').where('idUserSeguidores',"array-contains", usuario.usuario.uid).get()
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
                    }
                })
            
            } catch (error) {
                console.log(error);
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
  console.log(seguidores);
    return ( 
        <div>
            <button type="button" onClick={handleOpen}>
                Seguidos
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
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
 
export default ModalSeguidos;