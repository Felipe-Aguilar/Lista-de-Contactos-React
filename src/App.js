import React from 'react';
import styled from 'styled-components';
import Formulario from './componentes/Formulario';
import ListaContactos from './componentes/ListaContactos';

const App = () => {
  return ( 
    <div className='container'>
      <div className='row justify-content-center'>
        <Contenedor className='col-11 col-md-6'>
          <h2>Contactos</h2>
          <Formulario />
          <ListaContactos />
        </Contenedor>
      </div>
    </div>
  );
}

const Contenedor = styled.div`
  background: #fff;
  margin-top: 60px;
  padding: 20px 20px;
  box-shadow:
  6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
  22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
  100px 100px 80px rgba(0, 0, 0, 0.07);

`;

export default App;