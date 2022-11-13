import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
// import { Button, FormGroup, Input, Label } from "reactstrap";
import { Button, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { Form, Field } from "react-final-form";

const urlapi = "http://localhost:3001";

const EditarUsuario = () => {

  const userdata= JSON.parse(localStorage.getItem('data')) 

  let navigate = useNavigate();
  const { id } = useParams();

  const [registro, setRegistro] = useState({});


  const [roles, setRoles] = useState([]);
  const getRoles = async () => {
    fetch(urlapi + "/ms_rol/getall"
    , {
    method: 'GET',
    headers: {
        'Content-type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(responseJson => {  
        console.log("ROLES JSON",responseJson)
        console.log("ROLES JSON",responseJson.status)
        setRoles(responseJson.object);
    })
    .catch(error=>{
        console.log(error)   
    })
};
  const [estados, setEstados] = useState([]);

  const getEstados = async () => {
    fetch(urlapi + "/ms_estado/getall"
    , {
    method: 'GET',
    headers: {
        'Content-type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(responseJson => {  
        console.log("ESTADOS JSON",responseJson)
        console.log("ESTADOS JSON",responseJson.status)
        setEstados(responseJson.object);
    })
    .catch(error=>{
        console.log(error)   
    })
};



  const getRegistroById = async () => {
    fetch(urlapi + "/getById/" + id, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("edit user", responseJson);
        console.log("Edit usef", responseJson.status);
        setRegistro(responseJson.object);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getEstados();
    getRoles();
    getRegistroById();
  }, []);

  console.log("registro", registro);

  const onSubmit = (event) => {
    console.log("EVENT DATA", event);
    console.log("userdata.data.nameUser", userdata.data.nameUser);
    let data={
      // usuario:event.usuario,
      nombre_usuario:event.nombre_usuario,
      estado_usuario:event.estado_usuario,
      id_rol:event.id_rol,
      modificado_por:userdata.data.nameUser,
      id_usuario:id,
    }
    console.log('data',data)
    // nombre_usuario: req.body.nombre_usuario,
    // estado_usuario: req.body.estado_usuario,
    // id_rol: req.body.id_rol,
    // modificado_por: req.body.modificado_por,
    // id_usuario: req.body.id_usuario,
  
    fetch(urlapi + "/ms_registro/update/"+ id, {
      method: "PUT",
      body:JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("edit user", responseJson);
        console.log("Edit usef", responseJson.status);
        if(responseJson.status){
            navigate('/admin/users')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSelect = (e) => {
    console.log(e.target.value);
    console.log(e.target.value[0] + " " + e.target.value[1] );
    this.setState({
        id_rol: e.target.value[0],
        rol: e.target.value[1]
    });
}


  return (
    <div className="container">
      <h4>Editar usuario</h4>
      <div className="row">
        <div className="col-md-12">
          <Form
            onSubmit={onSubmit}
            initialValues={
              { 
                id_rol: registro.id_rol,
                estado_usuario: registro.estado_usuario,
                nombre_usuario: registro.nombre_usuario,
                usuario: registro.usuario,
                }
            }
            validate={(values) => {
              const errors = {};
              if (!values.id_rol) {
                errors.id_rol = "Campo Requerido";
              }
              if (!values.nombre_usuario) {
                errors.nombre_usuario = "Campo Requerido";
              }
              if (!values.estado_usuario) {
                errors.estado_usuario = "Campo Requerido";
              }
              // if (!values.usuario) {
              //   errors.usuario = "Campo Requerido";
              // }
              
              return errors;
            }}
            render={({
              handleSubmit,
              values,
              submitting,
              validating,
              valid,
            }) => (
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} lg={6}>

                     {/* nombre usaurio */}
                     <FormGroup>
                      <Label for="usuario">Usuario</Label>
                      <Field name="usuario">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              type="text"
                              disabled
                              placeholder="Usuario"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>


                      {/* nombre de usuario */}
                      <FormGroup>
                      <Label for="nombre_usuario">Nombre de usuario</Label>
                      <Field name="nombre_usuario">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              type="text"
                              placeholder="Nombre de usuario"
                              // value={registro.nombre_usuario}
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>
                      
                      {/* estado */}
                      <FormGroup>
                      <Label for="estado_usuario">Estado</Label>
                      <Input
                                id="estado_usuario"
                                name="estado_usuario"
                                type="select"
                              >
                               {
                                estados.map((item) => (
                                <option value={item.id}>{item.descripcion}</option>
                                ))}
                        </Input>
                    </FormGroup>
                    

                    {/* contasena */}
                    {/* <FormGroup>
                      <Label for="fname">Contraseña</Label>
                      <Field name="fname">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              type="text"
                              disabled
                              value={registro.contrasena}
                              placeholder="Contrasena"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup> */}
                  
                   {/* role */}
                   <FormGroup>
                      <Label for="id_rol">Rol</Label>
                      <Input
                                id="id_rol"
                                name="id_rol"
                                type="select"
                                // value={registro.id_rol}
                                // onChange={handleChange}
                                // onChange={onSelect}
                              >
                               {
                                roles.map((item) => (
                                <option value={item.id_rol}>{item.rol}</option>
                                ))}
                        </Input>
                    </FormGroup>

  
                    {/* ulrima conexion */}
                    <FormGroup>
                      <Label for="fecha_ultima_conexion">Ultima conexión</Label>
                      <Field name="fecha_ultima_conexion">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={registro.fecha_ultima_conexion}
                              placeholder="Ultima conexion"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>

        
                  {/* preguntas contestadas */}
                  <FormGroup>
                      <Label for="preguntas_contestadas">Preguntas contestadas</Label>
                      <Field name="preguntas_contestadas">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={registro.preguntas_contestadas}
                              placeholder="Preguntas contestadas"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>


                 

                    <Link className="btn primary" to="/admin/users">Cancelar</Link>
                  </Col>

                  <Col md={6} lg={6}>
                      {/* primer ingreso */}
                      <FormGroup>
                      <Label for="primer_ingreso">Primer Ingreso</Label>
                      <Field name="primer_ingreso">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              placeholder="Primer ingreso"
                              value={registro.primer_ingreso}
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>
                   
                    {/* fecha venciemiento */}
                    <FormGroup>
                      <Label for="fecha_vencimiento">Fecha vencimiento</Label>
                      <Field name="fecha_vencimiento">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={registro.fecha_vencimiento}
                              placeholder="Fecha de vencimiento"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>

                  {/* correo */}
                  <FormGroup>
                      <Label for="email">Email</Label>
                      <Field name="email">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={registro.correo_electronico}
                              placeholder="Correo electronico"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>
                   
                    

                    {/* creado por */}
                    <FormGroup>
                      <Label for="createdBy">Creado por</Label>
                      <Field name="createdBy">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={registro.creado_por}
                              placeholder="Creado Por"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>
                  
                  
                    
                    {/* fecha de creacion */}
                    <FormGroup>
                      <Label for="fecha_creacion">Fecha creación </Label>
                      <Field name="fecha_creacion">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={registro.fecha_creacion}
                              placeholder="Fecha de creación"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>
                    
                    {/* modificado por */}
                    <FormGroup>
                      <Label for="modificado_por">Modificado Por</Label>
                      <Field name="modificado_por">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              placeholder="Modificado Por"
                              value={registro.modificado_por}
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>
                  
                   {/* fecha de modificaicon */}
                   <FormGroup>
                      <Label for="fecha_modificacion">Fecha de modificación</Label>
                      <Field name="fecha_modificacion">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              value={registro.fecha_modificacion}
                              placeholder="Fecha de modifiacion"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>

                    {/* intentos login */}
                    <FormGroup>
                      <Label for="intentos_login">Intentos Login</Label>
                      <Field name="intentos_login">
                        {({ input, meta }) => (
                          <div>
                            <Input
                              {...input}
                              disabled
                              type="text"
                              placeholder="Intentos login"
                              value={registro.intentos_login}
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>

                   
                   
                   
          
                   
                   
                   
                  
                <Button type="submit" color="primary" disabled={!valid}>Editar</Button>
                {/* <Button type="submit" color="primary" >Editar</Button> */}
                  </Col>
                </Row>

              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default EditarUsuario;
