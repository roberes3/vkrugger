import React, { useState } from 'react';

import { connect } from "react-redux";
import { aShowHome } from '../redux/actions';

import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import Copyright from '../components/Footer';
import * as utils from '../services/utils';
import Data from '../services/data';

import { NotificationManager } from 'react-notifications';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


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
    formControl: {
        minWidth: '100%',
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

// Componente con la forma que actualiza el empleado
const FormUpdate = ({setMsg, dataUpdate, login}) => {

    const classes = useStyles();

    const [employee, setEmployee] = useState({...dataUpdate.user});

    const [form, setForm] = useState({
        name     : true,
        lastName : true,
        email    : true,
        pass     : true,
        user     : true,
        isValid  : true,
        birthday : true,
        type     : true,
        date     : true,
        doses    : true,
        save     : false,
        msg      : ""
    });

    
    // realiza la validacion del formulario
    const isValidForm = () => {
        form.isValid = true;
        
        // valida el correo
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

        // valida el usuario
        if(Data.isUniqueUser(employee)){
            form.user = true;
        }else{
            form.user = false;
            form.isValid = false;
            NotificationManager.error('El usuario ' + employee.user + " ya está utilizando");
        }

        // valida del password
        if(utils.isPassword(employee.pass)){
            form.pass = true;
        }else{
            form.pass = false;
            form.isValid = false;
            NotificationManager.error('Ingrese un password de 6 caracteres o más');
        }

        // valida la fecha de nacimiento
        if(utils.compareDate(employee.birthday, new Date())){
            form.birthday = true;
        }else{
            form.birthday = false;
            form.isValid = false;
            NotificationManager.error('La fecha de nacimiento no puede ser mayor que la actual');
        }

        // valida los datos de la vacuna
        if(employee.isVaccinated){

            // valida la fecha de nacimiento
            if(utils.compareDate(employee.vaccine.date, new Date())){
                form.date = true;
            }else{
                form.date = false;
                form.isValid = false;
                NotificationManager.error('La fecha de vacunación no puede ser mayor que la actual');
            }

            // valida la fecha de nacimiento
            if(utils.isRequered(employee.vaccine.type)){
                form.type = true;
            }else{
                form.type = false;
                form.isValid = false;
                NotificationManager.error('Ingrese un valor en tipo de vacuna');
            }

            if(utils.isNumber(employee.vaccine.doses, 1, 10)){
                form.doses = true;
            }else{
                form.doses = false;
                form.isValid = false;
                NotificationManager.error('Ingrese en las dosis un número de 1 al 10');
            }
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
    
        // envia a actualizar el empleado
        Data.updateEmployee(employee)
            .then( result => {
                form.save = true;
                form.msg  = `Se ha actualizado correctamente el usuario: ${employee.user} y contraseña: ${employee.pass}`;
                setForm({...form});
                setMsg(form.msg);
                NotificationManager.success('Empleado actualizado exitosamente');
            })
            .catch( error => {
                form.msg = 'No se ha actualizado el empleado, intentelo nuevamente';
                NotificationManager.error('Error de base de datos');
                setForm({...form});
                setMsg(form.msg);
            })
        
    }

    // actualiza los inputs
    const dataChange = (e, type) => {
        let changedEmployee = {...employee};
        switch(type){
        case "U": // usuario
            if(!utils.isLettersNumbers(e.target.value)){
                return;
            }
            changedEmployee.user = e.target.value;
            break;    
        case "P": // password
            changedEmployee.pass = e.target.value;
            break;
        case "N": // nombres
            if(!utils.isOnlyLetters(e.target.value)){
                return;
            }
            changedEmployee.name = e.target.value;
            break;
        case "L": // apellido
            if(!utils.isOnlyLetters(e.target.value)){
                return;
            }
            changedEmployee.lastName = e.target.value;
            break;
        case "E": // correo
            changedEmployee.email = e.target.value;
            break;
        case "B": // fecha de nacimiento
            changedEmployee.birthday = e.toString();
            break;
        case "T": // telefono
            changedEmployee.phone = e.target.value;
            break;
        case "R": // rol
            changedEmployee.rol = e.target.value;
            break;
        case "A": // direccion
            changedEmployee.address = e.target.value;
            break;
        case "I": // esta vacunado
            if(changedEmployee.isVaccinated){
                changedEmployee.vaccine.type  = "";
                changedEmployee.vaccine.doses = "";
                changedEmployee.vaccine.date  = (new Date()).toString();
            }
            changedEmployee.isVaccinated = !changedEmployee.isVaccinated;
            break;
        case "VT": // tipo de vacuna
            changedEmployee.vaccine.type = e.target.value;
            break;
        case "VD": // dosis de vacunacion
            changedEmployee.vaccine.doses = e.target.value;
            break;
        case "VF": // fecha de vacunacion
            changedEmployee.vaccine.date = e.toString();
            break;
        default:
            return;
        }
        setEmployee(changedEmployee);
    }

    return (
        <React.Fragment>

          <Typography variant="h6" gutterBottom>
            Actualización de Empleado
          </Typography>

          <Grid container spacing={3}>

            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                value= {employee.cardId}
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
                value= {employee.user}
                error={!form.user}
                onChange={(e) => dataChange(e, 'U')}
                type="text"
                id="user"
                name="user"
                label="Usuario"
                fullWidth
                autoComplete="user-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                error={!form.pass}
                value= {employee.pass}
                type="password"
                onChange={(e) => dataChange(e, 'P')}
                id="password"
                name="password"
                label="Contraseña"
                fullWidth
                autoComplete="password-name"
              />
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

            <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container style={{width:'100%', marginTop:'-1.1em'}}>
                        <KeyboardDatePicker
                            error={!form.birthday}
                            style={{width:'100%'}}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline-birthday"
                            label="Fecha de nacimiento"
                            value={new Date(employee.birthday)}
                            onChange={(e) => dataChange(e, 'B')}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}      
                        />
                    </Grid>
                </MuiPickersUtilsProvider> 
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value= {employee.phone}
                type="number"
                onChange={(e) => dataChange(e, 'T')}
                id="phone"
                name="phone"
                label="Teléfono"
                fullWidth
                autoComplete="phone-name"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Rol *</InputLabel>
                    <Select
                        required
                        disabled={login.rol !== 'admin'}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={employee.rol}
                        onChange={(e) => dataChange(e, 'R')}
                        >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='user'>User</MenuItem>
                    </Select>
                </FormControl>  
            </Grid>

            <Grid item xs={12}>
              <TextField
                value= {employee.address}
                onChange={(e) => dataChange(e, 'A')}
                id="address"
                name="address"
                label="Dirección"
                fullWidth
                type="text"
                autoComplete="address-name"
              />
            </Grid>

            <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox color="secondary" name="vacuna" checked={employee.isVaccinated} />}
                    label=" Está Vacunado "
                    onChange={(e) => dataChange(e,'I')}
                />
            </Grid>

            <Grid item xs={12} sm={6} style={{display : employee.isVaccinated ? '' : 'none'}}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="vaccineType">Tipo Vacuna *</InputLabel>
                    <Select
                        error={!form.type}
                        labelId="vaccineType"
                        id="vaccineTypeSelect"
                        value={employee.vaccine.type}
                        onChange={(e) => dataChange(e, 'VT')}
                        >
                            <MenuItem value='Sputnik'>Sputnik</MenuItem>
                            <MenuItem value='AstraZeneca'>AstraZeneca</MenuItem>
                            <MenuItem value='Pfizer'>Pfizer</MenuItem>
                            <MenuItem value='Jhonson&Jhonson'>Jhonson&Jhonson</MenuItem>
                    </Select>
                </FormControl>  
            </Grid>

            <Grid item xs={12} sm={6} style={{display : employee.isVaccinated ? '' : 'none'}}>

            </Grid>

            <Grid item xs={12} sm={6} style={{display : employee.isVaccinated ? '' : 'none'}}>
                <TextField
                    required
                    value= {employee.vaccine.doses}
                    onChange={(e) => dataChange(e, 'VD')}
                    error={!form.doses}
                    id="vaccineDoses"
                    name="vaccineDoses"
                    label="Num dosis"
                    fullWidth
                    type="number"
                    autoComplete="address-name"
                />
            </Grid>

            <Grid item xs={12} sm={6} style={{display : employee.isVaccinated ? '' : 'none'}}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container style={{width:'100%',marginTop:'-1.1em'}}>
                        <KeyboardDatePicker
                            required
                            error={!form.date}
                            style={{width:'100%'}}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Fecha de vacunación"
                            value={new Date(employee.vaccine.date)}
                            onChange={(e) => dataChange(e, 'VF')}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}      
                        />
                    </Grid>
                </MuiPickersUtilsProvider> 
            </Grid>     

            <div className={classes.buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={saveEmployee}
                    className={classes.button}>
                    Actualizar
                  </Button>
                </div>
            
          </Grid>
        </React.Fragment>);

}

// Componente que actualiza un empleado
const UpdateUser = (props) => {

    const [msg, setMsg] = useState('');

    return(
        <React.Fragment>

            <CssBaseline />

            <main>
                <Container className="items-card-grid" maxWidth="md">
                {/* End hero unit */}
                    <Grid container spacing={4}>
                        <FormUpdate setMsg={setMsg} dataUpdate={props.dataUpdate} login={props.login}/>
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

const mapStateToProps = (state) => ({
    dataUpdate : state.data.update,
    login : state.data.login,
});

const mapDispatchToProps = {
    aShowHome
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);