import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Alert } from 'reactstrap';
import { getOneParam, toReplaceSpace, toUpperCaseField } from "../../../utils/utils";
import "./CreateUser.css";

// const urlapi = "http://localhost:3001";
const CreateUser = () => {

  var dataPar=JSON.parse(localStorage.getItem("params")) || []
  var urlApiParam=getOneParam(dataPar,"URL_API")
  const urlapi =urlApiParam.valor

  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Operador');
  

  const [message, setMesagge] = useState("");
const [color, setColor] = useState("danger");
const [isValid, setIsValid] = useState(false);

  const handleSubmit = event => {
    event.preventDefault(); 
    // console.log('handleSubmit ran');
    
    var x = Math.floor(Math.random() * (100 - 1) + 1);
    // console.log('x',x)
    let name_user=(name).toString()
        // name_user= name_user.replace(/\s/g,'')
        // name_user= name_user.substring(0,4);
        name_user= name_user.toUpperCase()
        // name_user= name_user+""+x

    const userdata= JSON.parse(localStorage.getItem('data'))
    // console.log('userData',userData)

    let data={
      "usuario":toUpperCaseField(toReplaceSpace(name_user)),
      "nombre_usuario":toReplaceSpace(name),
      "correo_electronico":email,
      "id_rol":parseInt(role || 6),
      "creado_por":userdata.data.nameUser
    }
    // console.log('data',data)

    fetch(urlapi+'/ms_registro/createUser',
          {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-type': 'application/json'
          }
      })
      .then(response => response.json())
      .then(responseJson => {  
          // console.log("responseJson",responseJson)
          // console.log("responseJson.status",responseJson.status)
          
          setIsValid(true)
          if(!responseJson.status){
              setColor("danger")
              setMesagge(responseJson.message)
              setTimeout(1000,()=>{
                  setIsValid(false)
                 }) 
                 return
          }

         navigate("/admin/users");
      })
      .catch(error=>{
        // console.log('error',error)
      })


    setName('');
    setEmail('');
    setRole('');
  };

  return (
    <div className='formulario'>
        <Alert 
                     isOpen={isValid} 
                     color={color}
                     >{message}</Alert>
    <form onSubmit={handleSubmit}>
      
<div className="inputs">
              
                <h1>Crear usuario</h1>
                
                    <label>Nombre</label>
                    <div className="username">
                        <input
                            type="text"
                            placeholder="nombre"  
                            id="name"
                            name="name"
                            onChange={event => setName(event.target.value)}
                            value={name}
                        />
                    </div>

                    <label>Correo</label>
                    <div className="username">
                        <input
                            type="email"
                            placeholder="Correo"
                            id="email"
                            name="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </div>

                    <label>Role de usuario</label>
                    <div className="username">
                    <select id="role"
                            name="role"
                            value={role}
                            onChange={event => setRole(event.target.value)} >
                      <option value="5" >-Selecciona rol-</option>
                      <option value="5" >Operador</option>
                      <option value="6">Auditor</option>
                      <option value="1">Invitado</option>
                    </select>
                    </div>
                    <button className="btn" type="submit">Ingresar</button>
                    <Link to='/admin/users' className="primary">cancelar</Link>
                    
                </div>
      
    </form>
  </div>
  );


    // return (
    //   <Form>
    //     <h4>Crear Usuario</h4>
    //     <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos commodi mollitia facilis optio ipsa, architecto assumenda facere</h5>
    //     <FormGroup>
    //       <Label for="exampleEmail">Email</Label>
    //       <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
    //     </FormGroup>
    //     <FormGroup>
    //       <Label for="examplePassword">Password</Label>
    //       <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
    //     </FormGroup>
    //     <FormGroup>
    //       <Label for="exampleSelect">Select</Label>
    //       <Input type="select" name="select" id="exampleSelect">
    //         <option>1</option>
    //         <option>2</option>
    //         <option>3</option>
    //         <option>4</option>
    //         <option>5</option>
    //       </Input>
    //     </FormGroup>
    //     <FormGroup>
    //       <Label for="exampleSelectMulti">Select Multiple</Label>
    //       <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
    //         <option>1</option>
    //         <option>2</option>
    //         <option>3</option>
    //         <option>4</option>
    //         <option>5</option>
    //       </Input>
    //     </FormGroup>
        
    //     <FormGroup tag="fieldset">
    //       <legend>Radio Buttons</legend>
    //       <FormGroup check>
    //         <Label check>
    //           <Input type="radio" name="radio1" />{' '}
    //           Option one is this and that—be sure to include why it's great
    //         </Label>
    //       </FormGroup>
    //       <FormGroup check>
    //         <Label check>
    //           <Input type="radio" name="radio1" />{' '}
    //           Option two can be something else and selecting it will deselect option one
    //         </Label>
    //       </FormGroup>
    //       <FormGroup check disabled>
    //         <Label check>
    //           <Input type="radio" name="radio1" disabled />{' '}
    //           Option three is disabled
    //         </Label>
    //       </FormGroup>
    //     </FormGroup>
    //     <FormGroup check>
    //       <Label check>
    //         <Input type="checkbox" />{' '}
    //         Check me out
    //       </Label>
    //     </FormGroup>
    //     <Button>Submit</Button>
    //   </Form>
    // );
  
};
export default CreateUser;
