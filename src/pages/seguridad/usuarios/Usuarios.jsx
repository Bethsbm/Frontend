import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./Usuarios.css";

const urlapi = "http://localhost:3001";

const Usuarios = () => {
/** 
   ** Creando bitacora  
   * enviado infromacion de bitacora a la BD
   * */ 
   const saveLog = async () => {
    const userdata= JSON.parse(localStorage.getItem('data')) 
    let log={
       fecha: new Date(),
       id_usuario:userdata.data.id || 0,
       accion:'READ',
       descripcion:'Ingreso a pantalla USUARIOS',
  }
    fetch(urlapi + "/logs/save"
    , {
    method: 'POST',
    body:JSON.stringify(log),
    headers: {
        'Content-type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(responseJson => {  
        console.log("responseJson",responseJson)
    })
    .catch(error=>{
        console.log(error)   
    })
};

  


  const [registros, setRegistros] = useState([]);

  const getRegistros = async () => {
    fetch(urlapi + "/registro/getall"
    , {
    method: 'GET',
    headers: {
        'Content-type': 'application/json'
    }
    })
    .then(response => response.json())
    .then(responseJson => {  
        console.log("responseJson",responseJson)
        console.log("responseJson.status",responseJson.status)
        setRegistros(responseJson.object);
    })
    .catch(error=>{
        console.log(error)   
    })
};

  useEffect(() => {
    saveLog();
    getRegistros();
  }, []);


  //Configuramos las columnas de la tabla
  const columns = [
    // {
    //   name: "ID",
    //   selector: (row) => row.id_usuario || 'No aplica',
    //   sortable: true,
    
    // }, 
    {
      name: "ESTADO",
      selector: (row) => row.estado_usuario || 'No aplica',
      sortable: true,
    
    },
  
    {
      name: "Nombre",
      selector: (row) => row.usuario || 'No aplica',
      sortable: true,
    
    },
    {
      name: "Usuario",
      selector: (row) => row.nombre_usuario || 'No aplica',
      sortable: true,
    
    },
    {
      name: "CORREO",
      selector: (row) => row.correo_electronico || 'No aplica',
      sortable: true,
    
    },
    {
      name: "ROLE",
      selector: (row) => row.id_rol || 'No aplica',
      sortable: true,
    
    },
    {
      name: "FECHA CREACIÓN",
      selector: (row) => row.fecha_creacion || 'No aplica',
      sortable: true,
    
    }
  ];

  //Configurar la paginación de la tabla
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="container">
      <h3>Usuarios</h3>
      <h5>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
        consectetur odio asperiores, deserunt beatae accusantium omnis iure.
      </h5>
      <br />
      <div className="row">
        <div className="col">
          <div
            className="btn-toolbar"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div
              className="btn-group me-2"
              role="group"
              aria-label="First group"
            >
              <Link
                to="/admin/createUser"
                type="button"
                className="btn btn-primary"
                title="Agregar Nuevo"
              >
                <i className="fa-solid fa-plus"></i> Nuevo
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <DataTable
          columns={columns}
          data={registros}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="550px"
        />
      </div>
    </div>
  );
};
export default Usuarios;
