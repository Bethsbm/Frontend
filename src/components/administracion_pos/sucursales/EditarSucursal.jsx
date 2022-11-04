import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import { useGlobalState } from "../../../globalStates/globalStates"; 
import axios from "axios";

const URLEditar = "http://190.53.243.69:3001/sucursal/actualizar-insertar/";
const EditarSucursal = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [edit] = useGlobalState('registroEdit')

  const navigate = useNavigate();

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          id_sucursal: edit.id_sucursal,
          cod_sucursal: edit.cod_sucursal,
          descripcion: edit.descripcion_sucursal,
          direccion: edit.direccion,
          telefono:edit.telefono,
          rtn:edit.rtn,
          id_centro_costo:edit.id_centro_costo,
          id_mapa: undefined,
          activo:edit.activo ,
          modificado_por:"autorPrueba" ,
          fecha_modificacion:"2022/11/03"
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion id
          if (!valores.cod_sucursal) {
            errores.cod_sucursal = "Por favor ingresa un código";
          }

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
          }

          // Validacion dirección
          if (!valores.direccion) {
            errores.direccion = "Por favor ingresa una dirección";
          }

          // Validacion teléfono
          if (!valores.telefono) {
            errores.telefono = "Por favor ingresa un teléfono";
          }

          // Validacion rtn
          if (!valores.rtn) {
            errores.rtn = "Por favor ingresa un rtn";
          } else if (!/^^[0-9]+$/.test(valores.rtn)) {
            errores.rtn = "El rtn solo puede contener números";
          }

          // Validacion de Centro de Costo
          if (!valores.id_centro_costo) {
            errores.id_centro_costo = "Por favor seleccione un Centro de Costos";
          }

           // Validacion de mapa
           //if (!valores.id_mapa) {
            //errores.id_mapa = "Por favor seleccione un mapa";
          //}

          // Validacion estado
          if (!valores.activo) {
            errores.activo = "Por favor seleccione un estado";
          }

          return errores;
        }}
        onSubmit={async (valores) => {
          //procedimineto para guardar el los cambios
          console.log(valores);
          try {
            const res = await axios.put(`${URLEditar}${valores.cod_sucursal}`, valores);
            console.log(valores);
            console.log("Insertando....");
               if (res.status === 200) {
                alert("Guardado!");
              } else {
                alert("ERROR al Guardar :(");
              }
            
          } catch (error) {
            console.log(error);
            alert("ERROR - No se ha podido insertar :(");
          }
  
          console.log("Formulario enviado");
          setFormularioEnviado(true);
          navigate("/mostrarsucursales");
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
          <h3 className="mb-3">Crear Sucursal</h3>
          <div className="row g-3">
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="idSucursal" className="form-label">
                  Código:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="idSucursal"
                  name="cod_sucursal"
                  placeholder="ID de Sucursal..."
                />

                <ErrorMessage
                  name="cod_sucursal"
                  component={() => <div className="error">{errors.cod_sucursal}</div>}
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="descripcionSucursal" className="form-label">
                  Descripción:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="descripcionSucursal"
                  name="descripcion"
                  placeholder="Descripcion..."
                />

                <ErrorMessage
                  name="descripcion"
                  component={() => (
                    <div className="error">{errors.descripcion}</div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="direccionSucursal" className="form-label">
                  Dirección:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="direccionSucursal"
                  name="direccion"
                  placeholder="Dirección..."
                />

                <ErrorMessage
                  name="direccion"
                  component={() => (
                    <div className="error">{errors.direccion}</div>
                  )}
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="telefonoSucursal" className="form-label">
                  Teléfono:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="telefonoSucursal"
                  name="telefono"
                  placeholder="Teléfono..."
                />

                <ErrorMessage
                  name="telefono"
                  component={() => (
                    <div className="error">{errors.telefono}</div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="rtnSucursal" className="form-label">
                  RTN:
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="rtnSucursal"
                  name="rtn"
                  placeholder="RTN..."
                />

                <ErrorMessage
                  name="rtn"
                  component={() => <div className="error">{errors.rtn}</div>}
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb-3">
                <label htmlFor="centroCosto" className="form-label">
                  Centro de Costo:
                </label>
                <Field
                as="select"
                className="form-select"
                id="centroCosto"
                name="id_centro_costo"
              >
                <option value="">Seleccionar...</option>
                <option value="1">Centro 1</option>
                <option value="2">Centro 2</option>
              </Field>

                <ErrorMessage
                  name="id_centro_costo"
                  component={() => (
                    <div className="error">{errors.id_centro_costo}</div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-4 mb-3">
              <label htmlFor="mapa" className="form-label">
                Mapa:
              </label>
              <Field
                as="select"
                className="form-select"
                id="mapa"
                name="id_mapa"
              >
                <option value="">Seleccional...</option>
                <option value="1">Mapa 1</option>
                <option value="2">Mapa 2</option>
              </Field>

              <ErrorMessage
                name="id_mapa"
                component={() => <div className="error">{errors.id_mapa}</div>}
              />
            </div>
            <hr />
          </div>

          <div className="row g-3">
            <div className="col-md-4 mb-3">
              <label htmlFor="estadoSucursal" className="form-label">
                Estado:
              </label>
              <Field
                as="select"
                className="form-select"
                id="estadoSucursal"
                name="estado"
              >
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </Field>

              <ErrorMessage
                name="estado"
                component={() => <div className="error">{errors.estado}</div>}
              />
            </div>
            <hr />
          </div>

          <button className="btn btn-success mb-3 me-2" type="submit">
            Guardar
          </button>
          <Link
            to="/mostrarsucursales"
            type="button"
            className="btn btn-danger mb-3 me-2"
          >
            Cancelar
          </Link>

          {/*Mostrar mensaje de exito al enviar formulario */}
          {formularioEnviado && (
            <p className="exito">Formulario enviado con exito!</p>
          )}
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditarSucursal;
