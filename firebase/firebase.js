import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from './config';

class Firebase{
    constructor(){
        if(!app.apps.length){
            app.initializeApp(firebaseConfig);
        }
        this.auth=app.auth();
        this.db=app.firestore();
        this.storage=app.storage();
    }
    async registrar(nombre,apellido, email, password){        
        const nuevoUsuario=await this.auth.createUserWithEmailAndPassword(email, password);
        return await nuevoUsuario.user.updateProfile({
            displayName: `${nombre}`
        });
        
    }
    async login(email, password){
        return await this.auth.signInWithEmailAndPassword(email, password);
    }
    async cerrarSesion(){
        return await this.auth.signOut();
    }
}
const firebase=new Firebase();
export default firebase;