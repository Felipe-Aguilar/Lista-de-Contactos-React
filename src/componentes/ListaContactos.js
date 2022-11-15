import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import db from '../firebase/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import Contacto from './Contacto';

const ListaContactos = () => {

    const [contactos, cambiarContactos] = useState([]);
    
    useEffect(()=>{
        onSnapshot(
            collection(db, 'usuarios'),
            (snapshot) => {
                // Accediendo a la información de todos los elementos
                // console.log(snapshot.docs[0].data);

                const arregloUsuarios = snapshot.docs.map((documento)=>{
                    return {...documento.data(), id: documento.id}
                });

                cambiarContactos(arregloUsuarios);
            },
            (error) => {
                console.log(error);
            }
        );
    },[]);

    return ( 
        contactos.length > 0 &&
            <ContenedorContactos>
                {contactos.map((contacto) => ( 
                    <Contacto 
                        id={contacto.id} 
                        nombre={contacto.nombre} 
                        correo={contacto.correo} 
                        key={contacto.id}
                    />
                ))}
            </ContenedorContactos>
    );
}

const ContenedorContactos = styled.div`
    margin-top: 20px;
    text-align: center;
`;

export default ListaContactos;