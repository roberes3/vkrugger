import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import Copyright from '../components/Copyright';
import * as utils from '../services/utils';
import Data from '../services/data';

import { NotificationManager } from 'react-notifications';


// estilos utilizados en material para los botones
const useStyles = makeStyles((theme) => ({
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
}));

// estructura de un empleado sin datos
const emptyEmployee = {
    name     : "",
    lastName : "",
    email    : "",
    cardId   : "",
    rol      : "user",
    birthday : (new Date()).toString(),
    address  : "",
    phone    : "",
    isVaccinated : false,
    vaccine      : {
        type  : '',
        date  : (new Date()).toString(),
        doses : ''
    }
}

// estructura para validacion de la forma vacia
const emptyForm = {
    name     : true,
    lastName : true,
    email    : true,
    cardId   : true,
    isValid  : true,
    save     : false,
    msg      : ""
}

// Componente con la forma que ingresa el empleado
const FormInsert = ({setMsg}) => {

    const classes = useStyles();

    const [employee, setEmployee] = useState({...emptyEmployee});

    const [form, setForm] = useState({...emptyForm});

    
    // realiza la validacion del formulario
    const isValidForm = () => {
        form.isValid = true;
        // valida la cedula, y verifica ue sea unica
        if(utils.isCedula(employee.cardId)){
            if(Data.isUniqueCardId(employee.cardId)){
                form.cardId = true;
            }else{
                form.cardId = false;
                form.isValid = false;
                NotificationManager.error('Cédula duplicada');
            }
        }else{
            form.cardId = false;
            form.isValid = false;
            NotificationManager.error('Ingrese una cédula valida');
        }
        // valida la cedula
        if(utils.isEmail(employee.email)){
            form.email = true;
        }else{
            form.email = false;
            form.isValid = false;
            NotificationManager.error('Ingrese un correo válido');
        }
        // valida el nombre
        if(utils.isRequered(employee.name)){
            form.name = true;
        }else{
            form.name = false;
            form.isValid = false;
            NotificationManager.error('Ingrese un nombres válidos');
        }
        // valida el apellido
        if(utils.isRequered(employee.lastName)){
            form.lastName = true;
        }else{
            form.lastName = false;
            form.isValid = false;
            NotificationManager.error('Ingrese apellidos válidos');
        }
        return form.isValid;
    }
 
    // guarda al empleado
    const saveEmployee = () => {

        if(!isValidForm()){ // pregunta si es valida los datos de la forma
            form.msg = "Ingrese correctamente los datos solicitados";
            setForm({...form});
            setMsg(form.msg);
            return;
        }

        employee.name = String(employee.name).trim();
        employee.lastName = String(employee.lastName).trim();

        // coloca el usuario asignado y el password
        Data.setUserAndPass(employee, (updatedEmployee) => {
            
            // envia a inserta el empleado
            Data.addEmployee(updatedEmployee)
                .then( result => {
                    form.save = true;
                    form.msg  = `Se ha asignado el usuario: ${updatedEmployee.user} y contraseña: ${updatedEmployee.pass}`;
                    setForm({...form});
                    setMsg(form.msg);
                    NotificationManager.success('Empleado ingresado exitosamente');
                })
                .catch( error => {
                    form.msg = 'No se ha insertado el empleado, intentelo nuevamente';
                    NotificationManager.error('Error al ingresar en la base de datos');
                    setForm({...form});
                    setMsg(form.msg);
                })
        })  
    }

    // actualiza los inputs
    const dataChange = (e, type) => {
        let changedEmployee = {...employee};
        switch(type){
        case "C":
            changedEmployee.cardId = e.target.value;
            break;
        case "N":
            if(!utils.isOnlyLetters(e.target.value)){
                return;
            }
            changedEmployee.name = e.target.value.toUpperCase();
            break;
        case "L":
            if(!utils.isOnlyLetters(e.target.value)){
                return;
            }
            changedEmployee.lastName = e.target.value.toUpperCase();
            break;
        case "E":
            changedEmployee.email = e.target.value;
            break;
        default:
            return;
        }
        setEmployee(changedEmployee);
    }

    // limpia al empleado
    const cleanEmployee = () => {
        setEmployee({ // limpia los datos del empleado
            ...emptyEmployee});
        setForm({ // limpia los datos de la forma
            ...emptyForm});
        setMsg('');
    }

    return (
        <React.Fragment>

          <Typography variant="h6" gutterBottom>
            Ingreso de Empleado
          </Typography>
          <Grid container spacing={3}>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                error={!form.cardId}
                value= {employee.cardId}
                onChange={(e) => dataChange(e, 'C')}
                id="cardId"
                name="cardId"
                label="Cédula"
                fullWidth
                type="number"
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                error={!form.name}
                value= {employee.name}
                type="text"
    
                onChange={(e) => dataChange(e, 'N')}
                id="names"
                name="names"
                label="Nombres"
                fullWidth
                autoComplete="name-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                error={!form.lastName}
                value= {employee.lastName}
                type="text"
                onChange={(e) => dataChange(e, 'L')}
                id="lastName"
                name="lastName"
                label="Apellidos"
                fullWidth
                autoComplete="lastName-name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                error={!form.email}
                value= {employee.email}
                onChange={(e) => dataChange(e, 'E')}
                id="email"
                name="email"
                label="Correo"
                fullWidth
                type="email"
                autoComplete="family-name"
              />
            </Grid>

            <div className={classes.buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => form.save ? cleanEmployee() : saveEmployee()}
                    className={classes.button}
                  >
                    {form.save ? 'Nuevo Empleado' : 'Guardar Empleado'}
                  </Button>
                </div>
            
          </Grid>
        </React.Fragment>);

}

// Compoenete que ingresa un empleado
const InsertUser = (props) => {

    const [msg, setMsg] = useState('');

    return(
        <React.Fragment>
            <CssBaseline />
            <main>
                <Container className="items-card-grid" maxWidth="md">
                {/* End hero unit */}
                    <Grid container spacing={4}>
                        <FormInsert setMsg={setMsg}/>
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className="items-footer">
                <Typography variant="h6" align="center" gutterBottom>
                   {msg}
                </Typography>

                <Copyright />
            </footer>
            {/* End footer */}
            </React.Fragment>
    )
}

export default InsertUser;