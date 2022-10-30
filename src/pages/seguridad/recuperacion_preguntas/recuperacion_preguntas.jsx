import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../recuperacion_preguntas/login.css';
import burridogs from '../recuperacion_preguntas/loginbg.jpg';

//url 
/*const URL_LOGIN = ""


const enviarData = async (url, data) => {

    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    });

    const json = await resp.json();
}*/

export default function RecuperacionPreguntas(props) {

    //capturar los datos ingresados
   /* const refPregunta = useRef(null);
    const RefRespuesta = useRef(null);

    const handleLogin = () => {
        const data = {
          //  "usuario": refPregunta.current.value,
            "contra": RefRespuesta.current.value
        };
        console.log(data);
        //enviarData (URL_LOGIN, data);*/

    return (
        <div className="background">
            <img
                src={burridogs}
                alt="burridogs" />

            <div className="formulario">

                <h1>Recuperacion preguntas secretas</h1>
                <div className="inputs">
                    <label>Pregunta</label>
                    <div className="username">
                        <div className="fa fa-user-o"></div>
                        <input
                            type="text"
                            placeholder="Seleccione su pregunta"
                        />
                    </div>

                    <label>Respuesta</label>
                    <div className="username">
                        <input
                            type='password'
                            placeholder="Ingrese su respuesta"
                            //ref={RefRespuesta}
                        />
                    </div>

                    <button
                       // onClick={handleLogin}
                        className='btn'>Ingresar</button>
                        <div className="buttom-container">
                        <Link to="/login">
                            Cancelar
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
