import React, { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
import "./Registro.css";
import burridogs from "./loginbg.jpg";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { render } from "@testing-library/react";
// import { Alert, Col, FormGroup, Input, Label, Row } from "reactstrap";
import {
  Button,
  Alert,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import PasswordChecklist from "react-password-checklist";
import md5 from "md5";
import {
  getOneParam,
  isChar,
  isEmail,
  isNumber,
  isRange,
  isSpace,
  isText,
  isTextWhitSpace,
  toUpperCaseField,
  translateUperCase,
} from "../../../utils/utils";
import { Form, Field } from "react-final-form";

const URL_API_ENV = process.env.REACT_APP_URL_API;
console.log("URL_API_ENV===>", URL_API_ENV);
const Registro = () => {
  /**
   ** get settign params
   * obteniendo todos los parametros de configuracion del sistema
   * */
  const getAllSettingsParams = async () => {
    fetch(URL_API_ENV + "/ms_parametros/getall", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.status) {
          return;
        }
        localStorage.setItem("params", JSON.stringify(responseJson.object));
      });
  };
  useEffect(() => {
    getAllSettingsParams();
  }, []);

  var dataPar = JSON.parse(localStorage.getItem("params")) || [];
  var minLengthParam = getOneParam(dataPar, "MIN_CONTRA");
  // minLengthParam = minLengthParam.valor;

  var maxLengthParam = getOneParam(dataPar, "MAX_CONTRA");
  // maxLengthParam = maxLengthParam.valor;
 
  var minLengthUserParam = getOneParam(dataPar, "MIN_LENGTH_USERS");
  var maxLengthUserParam = getOneParam(dataPar, "MAX_LENGTH_USERS");
  

  var minLengthNamesParam = getOneParam(dataPar, "MIN_LENGTH_NAMES");
  var maxLengthNamesParam = getOneParam(dataPar, "MAX_LENGTH_NAMES");
  

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");


  const [message, setMesagge] = useState("");
  const [color, setColor] = useState("danger");
  const [isValid, setIsValid] = useState(false);
  const refContrasena = useRef(null);
  const refConfirmContrasena = useRef(null);
  const refUserName = useRef(null);
  const refUser = useRef(null);
  const refEmail = useRef(null);

  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit = (event) => {
    // event.preventDefault();
     console.log("EVENT DATA", event);
    var dataPar = JSON.parse(localStorage.getItem("params")) || [];
    var urlApiParam = getOneParam(dataPar, "URL_API");
    const urlAPi = urlApiParam.valor;

    let pass = event.password;
    let data = {
      usuario: toUpperCaseField(event.usuario),
      nombre_usuario: toUpperCaseField(event.nombre_usuario),
      correo_electronico: event.correo_electronico,
      contrasena: md5(pass),
      otp: pass,
      confirmContrasena: md5([pass]),
    };
    console.log('data',data)
    fetch(urlAPi + "/ms_registro/autoregistro", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.status) {
          setMesagge(responseJson.message);
          setIsValid(false);
        }
        setColor("success");
        setIsValid(true);
        setMesagge(responseJson.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        setIsValid(false);
        setMesagge("ha ocurrido un error al actualizar datos");
        navigate("/login");
      });
  };

  return (
    <div className="background">
      <div className="">
        <img src={burridogs} alt="burridogs" />

        <div className="formulario">
          <Alert isOpen={isValid} color={color}>
            {message}
          </Alert>

          <h2>Crea tu cuenta</h2>
          <h4>Proporciona tu datos para continuar</h4>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              usuario: "",
              nombre_usuario: "",
              correo_electronico: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors = {};

              // usuario
               
              if (!values.usuario) {
                errors.usuario = "Usuario es requerido";
              } else if (isSpace(values.usuario)) {
                errors.usuario = "No se permiten espacios";
              } else if (!isText(values.usuario)) {
                errors.usuario = "Ingresar solo letras";
              } else if (isChar(values.usuario)) {
                errors.usuario = "No puede contener caracteres especiales";
              } else if (isNumber(values.usuario)) {
                errors.usuario = "No puede contener numeros";
              } else if (
                isRange(
                  values.usuario,
                  minLengthUserParam.valor,
                  maxLengthUserParam.valor
                )
              ) {
                errors.usuario =
                  "Debe tener una longitud entre " +
                  minLengthUserParam.valor +
                  " y " +
                  maxLengthUserParam.valor;
              }

                //  nombre de usuario
              if (!values.nombre_usuario) {
                errors.nombre_usuario = "Nombre es requerido";
              }else if (!isTextWhitSpace(values.nombre_usuario)) {
                errors.nombre_usuario = "Ingresar solo letras";
              } else if (isChar(values.nombre_usuario)) {
                errors.nombre_usuario =
                  "No puede contener caracteres especiales";
              } else if (isNumber(values.nombre_usuario)) {
                errors.nombre_usuario = "No puede contener numeros";
              } else if (
                isRange(
                  values.nombre_usuario,
                  minLengthNamesParam.valor,
                  maxLengthNamesParam.valor
                )
              ) {
                errors.nombre_usuario =
                  "Debe tener una longitud entre " +
                  minLengthNamesParam.valor +
                  " y " +
                  maxLengthNamesParam.valor;
              }
              
              
              // mail validations
              if (!values.correo_electronico) {
                errors.correo_electronico = "Correo es requerido";
              } else if (!isEmail(values.correo_electronico)) {
                errors.correo_electronico = "Este no es un correo válido";
              }

              // password validations
              if (!values.password) {
                errors.password = "Contraseña es requerida";
              }

              // confrim password validations
              if (!values.confirmPassword) {
                errors.confirmPassword = "Confirmación es requerida";
              }
              
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
                  <Col md={12} lg={12}>
                    {/* usaurio */}
                    <FormGroup>
                      <Field name="usuario">
                        {({ input, meta }) => (
                          <div>
                            <Label for="usuario">Usuario</Label>
                            <span className="labelHint">
                              {values?.usuario?.length || 0}/
                              {maxLengthUserParam?.valor || 0}
                            </span>
                            <Input
                              {...input}
                              type="text"
                              id="usuario"
                              name="usuario"
                              placeholder="Usuario"
                              invalid={meta.error && meta.touched}
                              onKeyDown={translateUperCase(values, "usuario")}
                            />
                            {meta.error && meta.touched && (
                              <Label className="danger">{meta.error}</Label>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>

                    {/* nombre de usuario */}
                    <FormGroup>
                      <Field name="nombre_usuario">
                        {({ input, meta }) => (
                          <div>
                            <Label for="nombre_usuario">Nombre</Label>
                            <span className="labelHint">
                              {values?.nombre_usuario?.length || 0}/
                              {maxLengthNamesParam?.valor || 0}
                            </span>
                            <Input
                              {...input}
                              type="text"
                              placeholder="Nombre de usuario"
                              id="nombre_usuario"
                              name="nombre_usuario"
                              invalid={meta.error && meta.touched}
                              onKeyDown={translateUperCase(
                                values,
                                "nombre_usuario"
                              )}
                            />
                            {meta.error && meta.touched && (
                              <Label className="danger">{meta.error}</Label>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>

                    {/* nombre de usuario */}
                    <FormGroup>
                      <Field name="correo_electronico">
                        {({ input, meta }) => (
                          <div>
                            <Label for="correo_electronico">
                              Correo electrónico
                            </Label>
                            
                            <Input
                              {...input}
                              type="email"
                              placeholder="Correo electrónico"
                              id="correo_electronico"
                              name="correo_electronico"
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <Label className="danger">{meta.error}</Label>
                            )}
                          </div>
                        )}
                      </Field>
                    </FormGroup>

                    {/* contrasena */}
                    <FormGroup>
                      <Field name="password">
                        {({ input, meta }) => (
                          <div>
                            <Label for="password">Contraseña</Label>
                            <span className="labelHint">{values?.password?.length || 0}/{maxLengthParam?.valor || 0}</span>
                            <Input
                              {...input}
                              type={passwordShown ? "text" : "password"}
                              placeholder="Contraseña"
                              id="password"
                              name="password"
                              // onChange={(e) => setPassword(e.target.value)}
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <Label className="danger">{meta.error}</Label>
                            )}
                            <span className="showPass" onClick={togglePassword}>Ver</span>
                          </div>
                        )}
                      </Field>
                    </FormGroup>

                    {/* confirmar contrasena */}
                    <FormGroup>
                      <Field name="confirmPassword">
                        {({ input, meta }) => (
                          <div>
                            <Label for="confirmPassword">
                              Confirmar
                            </Label>
                            <span className="labelHint">{values?.password?.length || 0}/{maxLengthParam?.valor || 0}</span>
                            <Input
                              {...input}
                              type={passwordShown ? "text" : "password"}
                              placeholder="Confirmar contraseña"
                              id="confirmPassword"
                              name="confirmPassword"
                              // onChange={(e) => setPasswordAgain(e.target.value)}
                              invalid={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <Label className="danger">{meta.error}</Label>
                            )}
                            <span className="showPass" onClick={togglePassword}>Ver</span>
                          </div>
                        )}
                      </Field>
                    </FormGroup>

                    {/* check list */}
                    {/* <FormGroup> */}
                      {/* <PasswordChecklist
                        rules={[
                          "minLength",
                          "maxLength",
                          "specialChar",
                          "number",
                          "capital",
                          "match",
                        ]}
                        minLength={minLengthParam.valor}
                        maxLength={maxLengthParam.valor}
                        value={password}
                        valueAgain={passwordAgain}
                        messages={{
                          minLength:
                            "La contraseña tiene minimo " +
                            minLengthParam.valor +
                            " caracteres.",
                            maxLength:
                            "La contraseña tiene maximo " +
                            maxLengthParam.valor +
                            " caracteres.",
                          specialChar:
                            "La contraseña tiene caracteres especiales.",
                          number: "La contraseña tiene un número.",
                          capital: "La contraseña tiene una letra mayúscula.",
                          match: "Las contraseñas coinciden.",
                        }}
                      /> */}
                    {/* </FormGroup> */}
                    <div className="buttom-container">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                        // disabled={!valid}
                      >
                        {" "}
                        Registrarme{" "}
                      </button>
                      {/* <Button type="submit" className="btn-block" disabled={!valid}>Registrarme</Button> */}
                      <br />
                      <Link className="" to="/login">
                        Cancelar
                      </Link>
                    </div>
                  </Col>
                </Row>
              </form>
            )}
          />

          {/* <form >
            <div className="inputs">
              <div className="username">
                <div className="fa fa-user-o"></div>
                <input
                  type="text"
                  name="usuario"
                  placeholder="Usuario"
                  ref={refUser}
                />
              </div>
            </div>
            <div className="inputs">
              <div className="username">
                <div className="fa fa-user"></div>
                <input
                  type="text"
                  name="nombre_usuario"
                  placeholder="Nombre de usuario"
                  ref={refUserName}
                />
              </div>
              <div className="username">
                <div className="fa fa-envelope"></div>
                <input
                  type="text"
                  name="correo_electronico"
                  ref={refEmail}
                  placeholder="Correo electrónico"
                />
              </div>
              <div className="username">
                <div className="fa fa-lock"></div>
                <input
                  type={passwordShown ? "text" : "password"}
                  placeholder="Contraseña"
                  ref={refContrasena}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="showPass" onClick={togglePassword}>
                  Ver
                </span>
              </div>
              <div className="username">
                <div className="fa fa-lock"></div>
                <input
                  placeholder="Confirmar contraseña"
                  type={passwordShown ? "text" : "password"}
                  ref={refConfirmContrasena}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                />
                <span className="showPass" onClick={togglePassword}>
                  Ver
                </span>
              </div>

              <PasswordChecklist
                rules={
                  [
                  "minLength",
                  "maxLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]
              }
                minLength={minLengthParam}
                maxLength={maxLengthParam}
                value={password}
                valueAgain={passwordAgain}
                messages={{
                  minLength: "La contraseña tiene menos de "+minLengthParam+" caracteres.",
                  maxLength: "La contraseña tiene más de "+maxLengthParam+" caracteres.",
                  specialChar: "La contraseña tiene caracteres especiales.",
                  number: "La contraseña tiene un número.",
                  capital: "La contraseña tiene una letra mayúscula.",
                  match: "Las contraseñas coinciden.",
                }}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-primary btn-block btn-rounded"> Registrarme </button>
            <div className="buttom-container"><Link to="/login">Cancelar</Link></div>
          </form> */}
        </div>
      </div>
    </div>
  );
};
export default Registro;
