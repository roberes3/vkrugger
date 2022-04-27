
import * as ACTION from './const';
import DB from '../services/data';
import { history } from '../redux/store';

import * as ROUTE from '../routes/const';

let initialState =  {
      view : "login",
      isAuth: false,
      update: 0,
      user: "",
      pass: "",
      login : null,
      loginMsg: "",
};

// reductor de la ienda online
export default (state = initialState, action) => {
    let login, newState = {...state};  

    switch (action.type) {

      case ACTION.SEND_LOGIN:{ // realiza el login
        login = DB.checkUser(action.user, action.pass);
        if(login){
          newState.loginMsg = "";
          newState.filter   = "";
          newState.isAuth   = true;
          newState.login    = login;
          newState.user     = action.user;
          newState.pass     = action.pass;
          newState.view     = ROUTE.HOME;
          history.push(ROUTE.HOME); // se coloca en la pagina de home
        }else{
          newState.loginMsg = "Ingrese credenciales validas!!!";
          newState.isAuth   = false;
        }
        return  newState;
      }

      case ACTION.SEND_LOGOUT:{ // realiza el logout
        newState.loginMsg = "";
        newState.filter   = "";
        newState.isAuth   = false;
        newState.login    = null;
        newState.user     = "";
        newState.pass     = "";
        newState.view     = ROUTE.INIT;
        newState.items    = [];
        history.push(ROUTE.INIT); // se coloca en la pagina de login
        return newState;
      }

      case ACTION.SHOW_INSERT_USER:{ // inserta un nuevo usuario
        newState.view  = ROUTE.INSERT;
        history.push(ROUTE.INSERT); // se coloca en la pagina de compra
        return newState;
      }

      case ACTION.SHOW_UPDATE_USER:{ // inserta un nuevo usuario
        newState.view  = ROUTE.UPDATE;
        history.push(ROUTE.UPDATE); // se coloca en la pagina de compra
        return newState;
      }

      case ACTION.SHOW_QUERY_USER:{ // inserta un nuevo usuario
        newState.view  = ROUTE.QUERY;
        history.push(ROUTE.QUERY); // se coloca en la pagina de compra
        return newState;
      }

      case ACTION.SHOW_HOME:{ // regresa a la pagina de home
        newState.view  = ROUTE.HOME;
        if(action.clean){
          newState.purchase   = [];
          newState.itemsCount = 0;
        }
        history.push(ROUTE.HOME); // se coloca en la pagina de compra
        return newState;
      }

      default: // se ubica en la pagina de inicio
        history.push(ROUTE.INIT);
        return state;
    }
  };