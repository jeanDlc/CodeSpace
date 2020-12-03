import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link'
const MenuMovil = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return ( 
        <div className="menuMovil">
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
                style={{
                    fontSize: '2rem',
                    fontWeight:'bold',
                    color:'white'
                }}
            >
                &#9776;                                                    
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}
                    style={{
                        fontSize: '1.7rem',
                    }}
                >Mi perfil</MenuItem>

                <MenuItem onClick={handleClose}
                >
                    <Link href="/login">
                        <a>Log in</a>
                    </Link>
                </MenuItem>

                <MenuItem onClick={handleClose}
                    style={{
                        backgroundColor:'var(--colorPrincipal)'
                    }}
                >
                    <Link href="/registro">
                        <a className="white" >Registrarme</a>
                    </Link>
                </MenuItem>

                <MenuItem onClick={handleClose}
                >
                    <Link href="/nuevo-post">
                        <a>&#x271a; Post</a>
                    </Link>
                </MenuItem>

                <MenuItem onClick={handleClose}
                >
                    <Link href="/creadores">
                        <a>Creadores</a>
                    </Link>
                </MenuItem>

                <MenuItem onClick={handleClose}
                    style={{
                        fontSize: '1.5rem',
                        backgroundColor:'var(--danger)',
                        color:'white'
                    }}
                >Cerrar sesión</MenuItem>
            </Menu>
            <style jsx>{`  
                a{
                    color:#444;
                    font-size:1.7rem;
                    display: block;
                    width: 100%;
                }             
                .menuMovil{
                    color:var(--ligero);
                    text-align:center;
                    font-size:2rem;
                    padding-bottom:1rem;
                }
                @media(min-width:768px){
                    .menuMovil{
                        display:none;
                    }                    
                }
                .white{
                    color:white;
                }
                
            `}</style> 
        </div>   
     );
}
 
export default MenuMovil;