
import * as ACTION from './const';

// atiende a la peticion de login
export const aSendLogin = (user, pass) => ({
    type: ACTION.SEND_LOGIN,
    user,
    pass
});

// enviar un logout
export const aSendLogout = () => ({
    type: ACTION.SEND_LOGOUT
});


// muestra la pagina inicial
export const aShowHome = (clean) => ({
    type: ACTION.SHOW_HOME,
    clean
});


// muestra la pagina de actualizacion de usuario
export const aShowUpdate = (update) => ({
    type: ACTION.SHOW_UPDATE_USER,
    update
});


// muestra la pagina de insercion de usuario
export const aShowInsert = (clean) => ({
    type: ACTION.SHOW_INSERT_USER,
    clean
});


// muestra la pagina de consulta de usuarios
export const aShowQuery = (clean) => ({
    type: ACTION.SHOW_QUERY_USER,
    clean
});




