import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Data from '../services/data';
import { NotificationManager } from 'react-notifications';

// realiza efecto al aparecer el dialogo
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


// Componente que muestra una alerta de dialogo para eliminar al usuario
export default function DeleteUser({user, onClose}) {

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  // captura el evento al aeptar eliminar al usuario
  const handleAccept = () => {
    // elimina al usuario de la base de datos
    Data.deleteEmployee(user)
    .then( result => {
      NotificationManager.success('Se ha eliminado satisfactoriamente al usuario');
    }).catch (error => {
      NotificationManager.error ('No se ha eliminado el usuario');
      console.war('Error: no se ha eliminado el usuario', error);
    }).finally( () => {
      handleClose(); // cierra el dialogo
    })
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Confirmación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Está seguro de eliminar al usuario ${user.name} ${user.lastName} del sistema?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAccept} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}