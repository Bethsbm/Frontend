import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { downloadCSV, getOneParam, toUpperCaseField } from '../../../utils/utils';

// const urlapi = "http://localhost:3001";

export default function Permits(props) {
  var dataPar=JSON.parse(localStorage.getItem("params")) || []
  var urlApiParam=getOneParam(dataPar,"URL_API")
  const urlapi =urlApiParam.valor
/** 
   ** Creando bitacora  
   * enviado infromacion de bitacora a la BD
   * */ 
   const saveLog = async () => {
    const userdata= JSON.parse(localStorage.getItem('data')) 
    let log={
       fecha: new Date(),
       id_usuario:userdata.data.id || 0,
       accion:'LECTURA',
       descripcion:'Ingreso a pantalla PERMISOS',
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
        // console.log("responseJson",responseJson)
    })
    .catch(error=>{
        // console.log(error)   
    })
};

    const [registros, setRegistros] = useState([]);
    const getRegistros = async () => {
      fetch(urlapi + "/ms_permisos/getall"
      , {
      method: 'GET',
      headers: {
          'Content-type': 'application/json'
      }
      })
      .then(response => response.json())
      .then(responseJson => {  
          // console.log("responseJson",responseJson)
          // console.log("responseJson.status",responseJson.status)
          setRegistros(responseJson.object);
          setPending(false)
      })
      .catch(error=>{
          // console.log(error)   
      })
  };
  
    useEffect(() => {
      saveLog()
      getRegistros();
    }, []);
  
  
    //Configuramos las columnas de la tabla
    const columns = [
      {
        name: "ID",
        selector: (row) =>row.id_permiso || 'No aplica',
        sortable: true,
      
      },
      {
        name: "Rol",
        selector: (row) =>toUpperCaseField(row.rol) || 'No aplica',
        sortable: true,
      
      },
      {
        name: "Create",
        selector: (row) =>  (row.permiso_insercion)? 'ACTIVO': 'INACTIVO',
        sortable: true,
      
      },
      {
        name: "Read",
        selector: (row) => (row.permiso_consultar)? 'ACTIVO': 'INACTIVO',
        sortable: true,
      
      },
      {
        name: "Update",
        selector: (row) => (row.permiso_actualizacion)?'ACTIVO': 'INACTIVO',
        sortable: true,
      
      },
      {
        name: "Delete",
        selector: (row) => (row.permiso_eliminacion)? 'ACTIVO': 'INACTIVO',
        sortable: true,
      
      },
        {
          name: "Fecha creaci??n",
          selector: (row) => row.fecha_creacion || 'No aplica',
          sortable: true,
        
        },
     
    ];
  
    //Configurar la paginaci??n de la tabla
    const paginationComponentOptions = {
      rowsPerPageText: "Filas por p??gina",
      rangeSeparatorText: "de",
      selectAllRowsItem: true,
      selectAllRowsItemText: "Todos",
    };
  

//Barra de busqueda
const [ busqueda, setBusqueda ] = useState("")
//capturar valor a buscar
 const valorBuscar = (e) => {
   setBusqueda(e.target.value)   
 }
   //metodo de filtrado 
 let results = []
 if(!busqueda){
     results = registros
 }else{
     results = registros.filter( (dato) =>
     dato.id_permiso.toString().includes(busqueda.toLocaleLowerCase())   ||
     dato.id_rol.toString().includes(busqueda.toLocaleLowerCase())   ||
     dato.rol.toLowerCase().includes(busqueda.toLocaleLowerCase())   ||
     dato.fecha_creacion.toLowerCase().includes(busqueda.toLocaleLowerCase())   
     )
 };

 const [pending, setPending] = React.useState(true);
    return (
      <div className="container">
        <h5>Permisos para roles</h5>
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
              aria-label="Second group"
            >
              <Link
                type="button"
                className="btn btn-success"
                title="Exportar a Excel"
                onClick={() => downloadCSV(registros,'Reporte_Permisos_')}
              >
                <i class="bi bi-file-excel-fill"></i> Excel
              </Link>
            </div>


              
          </div>


         

        </div>


          {/*Mostrar la barra de busqueda*/}
          <div className="col-4">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
            <i class="bi bi-search"></i>
            </span>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Buscar por Role|Fecha creacion"
              aria-label="Search"
              value={busqueda}
              onChange={valorBuscar}
            />
          </div>
        </div>
   
        </div>
        <br />
        <div className="row">
          <DataTable
            columns={columns}
            data={results}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="550px"
            progressPending={pending}
            progressComponent="Cargando datos..."
            noDataComponent="---Datos no encontrados ---"
            paginationPerPage="6"
          />
        </div>
      </div>
    );
}
