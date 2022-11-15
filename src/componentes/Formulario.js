import React, {useState} from 'react';
import styled from 'styled-components';
import db from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { motion } from "framer-motion"

const Formulario = () => {

    const [nombre, cambiarNombre] = useState('');
    const [correo, cambiarCorreo] = useState('');

    const onSubmit = async (e) =>{
        e.preventDefault();

        try {
            await addDoc(collection(db, 'usuarios'), {
                nombre: nombre,
                correo: correo
            });
        } catch (error) {
            alert('No pudo procesar la petición');
        }

        cambiarNombre('');
        cambiarCorreo('');
    }

    return ( 
        <Formu onSubmit={onSubmit}>
            <Input 
                type="text" 
                placeholder='Nombre'
                value={nombre}
                onChange={(e) => cambiarNombre(e.target.value)}
            />
            <Input 
                type="email" 
                placeholder='Correo'
                value={correo}
                onChange={(e) => cambiarCorreo(e.target.value)}
            />
            <motion.button
                whileTap={{scale: 1.3}}
                type='submit'
            >
                Agregar</motion.button>
        </Formu>
    );
}

const Input = styled.input`
    padding: 3px 5px;
    width: 100%;
    margin: 4px 0;
    border: 2px solid #e9e9e9;
    border-radius: 3px;
    transition: .3s ease-out;
    font-weight: 300;
    outline: none;

    &:focus{
        border: 2px solid #15cc6d;
    }
`;

const Formu = styled.form`
    button{
        display: block;
        margin: auto;
        margin-top: 10px;
        padding: 7px 30px;
        background: #15cc6d;
        color: #fff;
        border: 1px solid transparent;
        border-radius: 3px;
        transition: all .3s ease-out;
        outline: none!important;
        
        &:hover{
            background: #14b762;
        }
    }
`;

export default Formulario;