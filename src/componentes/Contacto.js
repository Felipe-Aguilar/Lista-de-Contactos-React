import React,{useState} from 'react';
import styled from 'styled-components';
import db from '../firebase/firebaseConfig';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { MotionAdvancedProps, motion } from 'framer-motion';

const Contacto = ({id, nombre, correo}) => {

    const [editantoTarea, cambiarEditandoTarea] = useState(false);

    const [nuevoNombre, cambiarNuevoNombre] = useState(nombre);
    const [nuevoCorreo, cambiarNuevoCorreo] = useState(correo);

    const actualizarContacto = async(e) =>{
        e.preventDefault();

        // Actualizando los campos en Firebase
        try {
            await updateDoc(doc(db, 'usuarios', id));
        } catch (error) {
            console.log(error);
        }
        cambiarEditandoTarea(false);
    }

    const eliminarContacto = async(id) =>{
        // Eliminando los campos en Firebase
        try {
            await deleteDoc(doc(db, 'usuarios', id), {
                nombre: nuevoNombre, 
                correo: nuevoCorreo
            });
        } catch (error) {
            console.log(error);
        }

        cambiarEditandoTarea(false);
    }

    return ( 
        <ContenedorContacto>
            {editantoTarea ? 
                <form onSubmit={actualizarContacto}>
                    <input 
                        type="text"
                        name='nombre'
                        value={nuevoNombre}
                        onChange={(e) => cambiarNuevoNombre(e.target.value)}
                        placeholder='Nombre'
                    />
                    <input 
                        type="text"
                        name='correo'
                        value={nuevoCorreo}
                        onChange={(e) => cambiarNuevoCorreo(e.target.value)}
                        placeholder='Correo'
                    />
                    <button type='submit'>
                        Actualizar
                    </button>
                </form>
            :
                <>
                    <h6>{nombre}</h6>
                    <p>{correo}</p>
                    <motion.button
                        whileHover={{
                            scale: [1, 1.1],
                            rotate: [0, 360]
                        }}
                        whileTap={{
                            scale: 0.7
                        }}
                        transition={{duration: 0.4}}

                        onClick={()=> cambiarEditandoTarea(!editantoTarea)}
                    >
                        <svg width="20px" height="20px"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M13.02 5.828L15.85 3l4.949 4.95-2.829 2.828m-4.95-4.95l-9.606 9.607a1 1 0 00-.293.707v4.536h4.536a1 1 0 00.707-.293l9.606-9.607m-4.95-4.95l4.95 4.95" stroke="#000000" ></path></svg>
                    </motion.button>
                    <motion.button
                        whileHover={{
                            scale: [1, 1.1],
                            rotate: [0, 360]
                        }}
                        whileTap={{
                            scale: 0.7
                        }}
                        transition={{duration: 0.4}}

                        onClick={() => eliminarContacto(id)}
                    >
                        <svg width="20px" height="20px"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" stroke="#000000" ></path></svg>
                    </motion.button>
                </>
            }
        </ContenedorContacto>
    );
}

const ContenedorContacto = styled.div`
    border-bottom: 1px solid #e9e9e9;
    padding: 10px 0;
    h6{
        margin: 0;
    }
    p{
        color: #5e5e5e;
        margin: 0;
    }

    button{
        margin: 4px 5px;
        border: none;
        outline: none!important;
        background: #86c5a4;
        border-radius: 60px;
        padding: 5px 7px;
    }

    form{
        input{
            padding: 3px 5px;
            width: 40%;
            margin: 4px 10px;
            border: 2px solid #e9e9e9;
            border-radius: 3px;
            transition: .3s ease-out;
            font-weight: 300;
            outline: none;

            &:focus{
                border: 2px solid #939393;
            }
        }
        button{
            display: block;
            margin: auto;
            background: #8ac197;
            padding: 5px 20px;
            font-size: 14px;
            margin-top: 5px;
            border: none; 
            border-radius: 3px;
            color: #3e3e3e;
            outline: none!important;
            transition: all .3s ease-out;

            &:hover{
                background: #7cd190;
            }
        }
    }
`;

export default Contacto;
