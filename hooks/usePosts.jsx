import React,{useState, useEffect} from 'react';
import firebase from '../firebase/index';
const usePosts = () => {
    const [listaPosts, setListaPosts]=useState([]);
    useEffect(()=>{
        
        let unsuscribe;
        let desmontado=false;
        const getPosts=()=>{
          try {
            unsuscribe=firebase.db.collection('posts').orderBy('fecha', 'desc')
            .onSnapshot(snapshot=>{
              let posts=[];
              //trae todos los documentos incluso cuando solo uno se actualiza
              snapshot.forEach(function(doc) {
                  const post={
                      idPost:doc.id,
                    ...doc.data()
                  }
                  posts.push(post);
              });
              if(!desmontado){
                setListaPosts(posts);
              }
              
            });
      
          } catch (error) {
            console.log(error);
          }
          
        }
        
        getPosts();
        return () => {
          desmontado=true;
         
          if(unsuscribe){
            console.log('desmontando desde usePosts');
            unsuscribe();
          }
        }
  },[]);
    return ( {listaPosts} );
}
 
export default usePosts;