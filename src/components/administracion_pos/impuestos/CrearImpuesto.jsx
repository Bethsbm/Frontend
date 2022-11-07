import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const URLCrear = "http://190.53.243.69:3001/impuesto/actualizar-insertar/";
const URLMostrarUno = "http://190.53.243.69:3001/impuesto/getone/";

const Formulario = () => {

  const navigate = useNavigate();

  //Alertas de éxito o error
  const mostrarAlertas = (alerta) =>{
    switch (alerta){
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "El impuesto se creó con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

      break;

      case 'error': 
      Swal.fire({
        title: 'Error',
        text:  'No se pudo crear el nuevo impuesto',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
      break;

      case 'duplicado':
        Swal.fire({
          text:  'Ya existe un impuesto con el código ingresado',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });

      break;

      default: break;
    }
  };

  return (
    <div className="container">
      <Formik
        //valores iniciales
        initialValues={{
          cod_impuesto: "",
          descripcion: "",
          porcentaje: "",
          tipo: "",
          activo: "1",
          creado_por: "autorPrueba",
          fecha_creacion: "2022/10/27",
        }}
        //Funcion para validar
        validate={(valores) => {
          let errores = {};

          // Validacion código
          if (!valores.cod_impuesto) {
            errores.cod_impuesto = "Por favor ingrese un código";
          } else if (!/^[0-9]+$/.test(valores.cod_impuesto)) {
            errores.cod_impuesto = "Escribir solo números";
          }

          // Validacion descripción
          if (!valores.descripcion) {
            errores.descripcion = "Por favor ingresa una descripción";
          } else if (!/^^[A-Z-0-9-ÑÁÉÍÓÚ#*% ]+$/.test(valores.descripcion)) {
            errores.descripcion = "Escribir solo en MAYÚSCULAS";
          } 

          // Validacion porcentaje
          if (!valores.porcentaje) {
            errores.porcentaje = "Por favor ingresa un porcentaje";
          } else if (!/^^\d*\.\d+$/.test(valores.porcentaje)) {
            errores.porcentaje = "Escribir el porcentaje en decimal. Ejemplo: 0.10";
          } else if (!/^^[0-9-.]+$/.test(valores.porcentaje)) {
            errores.porcentaje = "Solo números";
          } 

          // Validacion tipo
          if (!valores.tipo) {
            errores.tipo = "Por favor seleccione un tipo de Impuesto";
          }

          // Validacion estado
          if (!valores.activo) {
            errores.activo = "Por favor seleccione un estado";
          }

          return errores;
        }}
        onSubmit={async (valores) => {

          //validar si existe un registro con el codigo ingresado
          try {
            const res = await axios.get(`${URLMostrarUno}${valores.cod_impuesto}`);
            console.log(res)
            if (res.data === ""){
              //procedimineto para guardar el nuevo registro en el caso de que no exista
                  const res = await axios.put(`${URLCrear}${valores.cod_impuesto}`, valores);
                  if (res.status === 200) {
                    mostrarAlertas("guardado");
                    navigate("/mostrarimpuestos");
                } else {
                  mostrarAlertas("error");
                }
            }else{ 
              mostrarAlertas("duplicado");
            }
          } catch (error) {
            console.log(error);
            mostrarAlertas("error");
            navigate("/mostrarimpuestos");
          };
        }}
      >
        {({ errors }) => (
          <Form className="formulario">
            <h3 className="mb-3">Nuevo Impuesto</h3>
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="idImpuesto" className="form-label">
                    Código:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="idImpuesto"
                    name="cod_impuesto"
                    placeholder="Código..."
                  />

                  <ErrorMessage
                    name="cod_impuesto"
                    component={() => <div className="error">{errors.cod_impuesto}</div>}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="descripcionImpuesto" className="form-label">
                    Descripción:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="descripcionImpuesto"
                    name="descripcion"
                    placeholder="Descripción..."
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
                  <label htmlFor="porcentajeImpuesto" className="form-label">
                    Porcentaje:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="porcentajeImpuesto"
                    name="porcentaje"
                    placeholder="Porcentaje..."
                  />

                  <ErrorMessage
                    name="porcentaje"
                    component={() => (
                      <div className="error">{errors.porcentaje}</div>
                    )}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="mb-3">
                  <label htmlFor="tipoImpuesto" className="form-label">
                    Tipo de Impuesto:
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="tipoImpuesto"
                    name="tipo"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="I">Inclusivo</option>
                    <option value="E">Exclusivo</option>
                  </Field>

                  <ErrorMessage
                    name="tipo"
                    component={() => <div className="error">{errors.tipo}</div>}
                  />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-4 mb-3">
                <label htmlFor="estadoImpuesto" className="form-label">
                  Estado:
                </label>
                <Field
                  as="select"
                  className="form-select"
                  id="estadoImpuesto"
                  name="activo"
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </Field>

                <ErrorMessage
                  name="activo"
                  component={() => <div className="error">{errors.activo}</div>}
                />
              </div>
              <hr />
            </div>

            <button className="btn btn-success mb-3 me-2" type="submit">
              Guardar
            </button>
            <Link
              to="/mostrarimpuestos"
              type="button"
              className="btn btn-danger mb-3 me-2"
            >
              Cancelar
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Formulario;
