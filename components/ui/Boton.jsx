import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const Boton = (props) => {
    const {tipo, color, large}=props;
    const [background, setBackground]=useState('var(--colorPrincipal)');
    const [dblock, setdBlock]=useState('inline-block');
    const [ancho,setAncho]=useState('auto');
    const [colorHover,setColorHover]=useState('var(--colorSecundario)');
    const useStyles = makeStyles((theme) => ({
        boton: {
            backgroundColor:background,
            color:'white',
            display:dblock,
            width:ancho,
            fontSize:'1.2rem',
            marginTop:'1rem',
            marginBottom:'1rem',
            '&:hover':{
                backgroundColor:colorHover
            }
        },
    }));
    useEffect(()=>{
        //determinar tamaño y color
        switch(color){
            case 'primary':
                setBackground('var(--colorPrincipal)');
                break;

            case 'secondary':
                setBackground('var(--colorSecundario)')
                break;
            case 'dark':
                setBackground('#444');
                break;
            default:
                setBackground('var(--colorPrincipal)')
        }
        if(large){
            setdBlock('block');
            setAncho('100%');
        }
    },[]);
    const classes = useStyles();
    
    return ( 
        <Button 
            className={classes.boton}
            variant="contained"
            type={tipo}
            >
            {props.children}
        </Button>
     );
}
 
export default Boton;