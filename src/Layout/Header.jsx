import { Link } from "react-router-dom";
import React, { useState, } from "react";
import { setGlobalState } from "./responseClass";

import logo from "../assets/img/logo1.png";
import imgPerfil from "../assets/img/profile-img.jpg";
import { getOneParam } from "../utils/utils";

// import { UserContext } from "../App";

  

function Header() {
  // const value = React.useContext(UserContext);  
  //(LineLink 9-24) Asignar valores de manerLink global, al dar click al boton de menu, estos valores seran usados en el Sidebar.jsx, Footer.jsx
  const [isMenuClicked, setIsMenuClicked] = useState(true);
  const userdata= JSON.parse(localStorage.getItem('data'))
  // let navigate = useNavigate();

  const updateClassMenu = () => {
    if (isMenuClicked) {
      setGlobalState("sidebar_class", "colapse sidebar");
      setGlobalState("main_class", "colapse_main");
      setGlobalState("footer_class", "colapse_footer");
    } else {
      setGlobalState("sidebar_class", "sidebar");
      setGlobalState("main_class", "main");
      setGlobalState("footer_class", "footer");
    }
    setIsMenuClicked(!isMenuClicked);
  };


  const logOut =  () => {
    // localStorage.clear()
    localStorage.removeItem("data")
    // navigate('/')
}


var dataPar=JSON.parse(localStorage.getItem("params")) || []
// console.log("dataPar",dataPar)
var nombreParam=getOneParam(dataPar,"SYS_NOMBRE")
var nameCompany=nombreParam.valor

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-center">
        <Link to="/admin/home" className="logo d-flex align-items-center justify-content-center">
          <img src={logo} alt="" />
        </Link>

        <div className="burger-menu" onClick={updateClassMenu}>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>
      </div>
      <span className="titleCompany">Panel administrativo <strong>{nameCompany}</strong> </span>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          {/* <li className="nav-item dropdown">
            <Link
              className="nav-link nav-icon"
              to="/"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-bell"></i>
              <span className="badge bg-primary badge-number">4</span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">                
                Tienes 4 notificaciones nuevas
                <Link to="/">
                  <span class="badge rounded-pill bg-primary p-2 ms-2">
                  Ver todo
                  </span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4>Notificaci??n 1</h4>
                  <p>Descripci??n aqu??...</p>
                  <p>30 min. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-x-circle text-danger"></i>
                <div>
                  <h4>Notificaci??n 2</h4>
                  <p>Descripci??n aqu??...</p>
                  <p>1 hr. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-check-circle text-success"></i>
                <div>
                  <h4>Notificaci??n 3</h4>
                  <p>Descripci??n aqu??...</p>
                  <p>2 hrs. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="notification-item">
                <i className="bi bi-info-circle text-primary"></i>
                <div>
                  <h4>Notificaci??n 4</h4>
                  <p>Descripci??n aqu??...</p>
                  <p>4 hrs. ago</p>
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-footer">
                
                <Link to="/">Mostrar todas las notificaciones</Link>
              </li>
            </ul>
          </li> */}

          <li className="nav-item dropdown pe-3">
            <Link
              className="nav-link nav-profile d-flex align-items-center pe-0"
              to="/"
              data-bs-toggle="dropdown"
            >
              <span className="d-none d-md-block dropdown-toggle ps-2">
              Hola {userdata.data.nameUser} 
              </span>
              <img
                src={imgPerfil}
                alt="Profile"
                className="rounded-circle"
              />
            </Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{userdata.data.nameUser} </h6>
                <span>{userdata.data.id} </span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/admin/MyProfile">
                  <i className="bi bi-person"></i> <span>Mi Perfil</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              {/* <li>
                
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/"
                >
                  
                  <i className="bi bi-gear"></i> <span>Configuraci??n</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li> */}
              {/* <li>
                
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/"
                >            
                  <i className="bi bi-question-circle"></i>
                  <span>Ayuda</span>
                </Link>
              </li> */}
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                
                <Link
                  className="dropdown-item d-flex align-items-center"
                  onClick={logOut}
                  to="/login"
                >
                  
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Cerrar Sesi??n</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
