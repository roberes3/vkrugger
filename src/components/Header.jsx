import React from 'react';
import { connect } from "react-redux";
import { aSendLogout, aShowHome, aShowInsert, aShowQuery, aShowUpdate } from '../redux/actions';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/ExitToApp';

import User from '@material-ui/icons/Person';
import UserAdd from '@material-ui/icons/PersonAdd';
import ViewList from '@material-ui/icons/ViewList';
import Home from '@material-ui/icons/Home';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';

import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


// estilos para el menu
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

// Componente del menu item
const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


// Componente que maneja el menu para mostrar las caracteristicas
const MainMenu = ({props}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => { // cierra el menu
    setAnchorEl(null);
  };

  const updateData = () => { // va a la vista de actualizar usuario
    setAnchorEl(null);
    props.aShowUpdate({type:0, user:{...props.login}});
  };

  const addUser = () => { // va a la vista de a;adir usuario
    setAnchorEl(null);
    props.aShowInsert();
  };

  const query = () => { // va a la vista de consultas
    setAnchorEl(null);
    props.aShowQuery();
  };

  const logout = () => { // realiza el logout
    setAnchorEl(null);
    props.aSendLogout();
  };

  // menu del administrador 
  const menuAdmin = () => {
    const items = [
          { key: 1, click: updateData, icon: <User fontSize="small" />,      text: "Actualizar mis datos"},
          { key: 2, click: addUser   , icon: <UserAdd fontSize="small" />,   text: "Añadir empleado"},
          { key: 3, click: query     , icon: <ViewList fontSize="small" />,  text: "Consultar datos"},
          { key: 4, click: logout    , icon: <CloseIcon fontSize="small" />, text: "Salir"},
    ];

    return items.map( item => {
      return (
        <StyledMenuItem onClick={item.click} key={item.key}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </StyledMenuItem>
      );
    });
  }

  // menu del empleado 
  const menuEmployee = () => {
    return (    
        <StyledMenuItem onClick={updateData}>
          <ListItemIcon>
            <User fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Actualizar mis datos" />
        </StyledMenuItem>
    )
  }

  // renderiza el menu
  return (
    <div>
      
      <IconButton edge="start" className="header-menuButton" color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon />
      </IconButton>
      
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.login.rol === 'admin' ? menuAdmin() : menuEmployee()}
      </StyledMenu>
    </div>
  );
}

// Componente de la cabecera de la aplicacion
const Header = (props) => {

  // realiza el logout de la aplicacion
  let sendLogout = () => {
    props.aSendLogout();
  }

  // si esta autentificado muestra informacion del usuario
  if(props.isAuth){
    return (<div className="header-root">
      <AppBar position="static">
        <Toolbar>

          <MainMenu props={props}/>

          <Typography variant="h6" className="header-title">
            Vacunación Kruger
          </Typography>

          <Tooltip title="Actual usuario">
            <Typography variant="h6" className="header-user">
                  {props.login.user}
            </Typography>
          </Tooltip>
          
          <Box display="flex">
              <Box m={1}>
                <Tooltip title="Ir a inicio">
                  <IconButton style={{backgroundColor: '#f50057', color: '#ffffff'}} aria-label="mail" onClick={() => props.aShowHome()}>
                      <Home />                  
                  </IconButton>
                </Tooltip>
              </Box>
              <Box m={1}>
              </Box>  
          </Box>
          <Tooltip title="Salir del sistema">
              <Button color="inherit" onClick={sendLogout}>Salir</Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>)
  }
  
  // renderizacion de la cabecera cuando no esta autentificado
  return (<div className="header-root">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className="header-title">
            Vacunación Kruger
        </Typography>
      </Toolbar>
    </AppBar>
  </div>)
  
};

const mapStateToProps = (state) => ({
  isAuth : state.data.isAuth,
  login  : state.data.login,
});

const mapDispatchToProps = {
  aSendLogout,
  aShowHome, 
  aShowInsert, 
  aShowQuery, 
  aShowUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);