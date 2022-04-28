import React from 'react';
import { connect } from "react-redux";
import { aSendLogout, aShowHome, aShowInsert, aShowQuery, aShowUpdate } from '../redux/actions';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import User from '@material-ui/icons/Person';
import UserAdd from '@material-ui/icons/PersonAdd';
import ViewList from '@material-ui/icons/ViewList';
import Home from '@material-ui/icons/Home';
import Badge from '@material-ui/core/Badge';
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

// componente del menu item
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateData = () => {
    setAnchorEl(null);
    props.aShowUpdate({type:0, user:{...props.login}});
  };

  const addUser = () => {
    setAnchorEl(null);
    props.aShowInsert();
  };

  const query = () => {
    setAnchorEl(null);
    props.aShowQuery();
  };


  // menu del administrador 
  const menuAdmin = () => {
    return (
    <React.Fragment>
        <StyledMenuItem onClick={updateData}>
          <ListItemIcon>
            <User fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Actualizar mis datos" />
        </StyledMenuItem>

        <StyledMenuItem onClick={addUser}>
          <ListItemIcon>
            <UserAdd fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Añadir empleado" />
        </StyledMenuItem>

        <StyledMenuItem onClick={query}>
          <ListItemIcon>
            <ViewList fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Consultar datos" />
        </StyledMenuItem>
    </React.Fragment>)
  }

  // menu del empleado 
  const menuEmployee = () => {
    return (
    <React.Fragment>
        <StyledMenuItem onClick={updateData}>
          <ListItemIcon>
            <User fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Actualizar mis datos" />
        </StyledMenuItem>
    </React.Fragment>)
  }

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

  let ShowHome = () => {
    
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

          <Tooltip title="Usuario Conectado">
            <Typography variant="h6" className="header-user">
                  {props.login.user}
            </Typography>
          </Tooltip>
          
          <Box display="flex">
              <Box m={1}>
                <Tooltip title="Regresar Inicio">
                  <IconButton aria-label="mail" onClick={() => props.aShowHome()}>
                    <Badge badgeContent={0} color="secondary" className="header-badge" onClick={ShowHome}>
                      <Home />
                    </Badge>
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