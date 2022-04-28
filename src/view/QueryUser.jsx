import React, { useState, useEffect } from 'react';

import { connect } from "react-redux";
import { aShowUpdate } from '../redux/actions';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import Data from '../services/data';
import * as utils from '../services/utils';

import Copyright from '../components/Footer';
import DeleteUser from './DeleteUser';
import { NotificationManager } from 'react-notifications';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const FILTER_NO                  = 0;
const FILTER_VACCINATION_STATUS  = 1;
const FILTER_VACCINATION_TYPE    = 2;
const FILTER_VACCINATION_RANGE   = 3;

// estilos de la tabla
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  table: {
    minWidth: 700,
  },
  avatar: {
    margin: 10,
  },
  formControl: {
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


// Componente que muestra los datos de los usuarios
const QueryUser = ({login, aShowUpdate}) => {

    const [query, setQuery ] = useState({type: FILTER_NO, param1: '', param2: ''});
    const [deleteUser, setDeleteUser ] = useState({delete:false, user:{}});
    
    // recibe la notificacion de los datos de los usuarios
    const notify = (data, stadistics) => {
        setQuery({...query});
    } 

    const classes = useStyles();

    // utiliza la use subscribe para suscribirse a los datos
    // y de esta manera realizar una notificacion cuando cambien los datos
    useEffect( () => {
        Data.addSubscription('query', notify);
        return () => {
            Data.removeSubscription('query');
        }
    });

    let users, data = Data.getUsers();    
   
    // si esta activo el filtro lo ejecuta
    switch(query.type){
        case FILTER_VACCINATION_STATUS:
            if(query.param1 == 'vacunados'){
                users = data.filter( u => u.isVaccinated);
            }else{
                users = data.filter( u => !u.isVaccinated);
            }
            break;
        case FILTER_VACCINATION_TYPE:
            users = data.filter( u => u.isVaccinated && u.vaccine.type === query.param1);
            break;
        case FILTER_VACCINATION_RANGE:
            if(!query.param1 || !query.param2){
                users = data;
                break;
            }
            users = data.filter( u => u.isVaccinated && utils.compareDate(query.param1, u.vaccine.date) && utils.compareDate(u.vaccine.date, query.param2));
            break;
        case FILTER_NO:
        default:
            users = data;
            break;    
    }

    // ordena por el nombre de los usuarios
    users.sort( (a,b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
           return -1;
        }
        return 0;
    })

    // actualiza los inputs
    const dataChange = (e, type) => {
        let changedQuery = {...query};

        switch(type){
            case 'O': // selecciona las opciones
                if(e.target.value == FILTER_VACCINATION_STATUS){
                    changedQuery.type   = FILTER_VACCINATION_STATUS;
                    changedQuery.param1 = "vacunados"; // coloca por omision
                } else if(e.target.value == FILTER_VACCINATION_TYPE){
                    changedQuery.type   = FILTER_VACCINATION_TYPE;
                    changedQuery.param1 = "Sputnik";  // coloca por omision  
                } else if(e.target.value == FILTER_VACCINATION_RANGE){
                    changedQuery.type   = FILTER_VACCINATION_RANGE;
                    changedQuery.param2 = new Date(); // fecha hasta    
                    changedQuery.param1 = new Date(); // fecha desde
                    changedQuery.param1.setDate(changedQuery.param1.getDate()-7);
                } else{
                    changedQuery.type   = FILTER_NO;
                    changedQuery.param2 = '';     
                    changedQuery.param1 = '';
                }
                break;
            case 'S': // estado
            case 'T': // tipo
                changedQuery.param1 = e.target.value;
                break;
            case 'F': // desde
            {
                let curDate = new Date();
                if(utils.compareDate(curDate.setDate(curDate.getDate()+1), e)){
                    NotificationManager.error('No puede ser mayor a la fecha actual');
                    return;
                }
                if(utils.compareDate(changedQuery.param2, e)){
                    NotificationManager.error('No puede ser la fecha desde mayor a hasta');
                    return;
                }
                changedQuery.param1 = e;
                break;}
            case 'U': // hasta
            {
                let curDate = new Date();
                if(utils.compareDate(curDate.setDate(curDate.getDate()+1), e)){
                    NotificationManager.error('No puede ser mayor a la fecha actual');
                    return;
                }
                if(utils.compareDate(e, changedQuery.param1)){
                    NotificationManager.error('No puede ser la fecha desde mayor a hasta');
                    return;
                }
                changedQuery.param2 = e;
                break;}
            default:
                return;
        }

        setQuery(changedQuery);
    }

    // elimina el usuario
    const clickDeleteEmployee = (user) => {
        // muestra el dialogo para confirma la eliminacion del usuario
        setDeleteUser({delete:true, user});
    }

    // modifica el usuario
    const clickUpdateEmployee = (user) => {
        aShowUpdate({type:1, user:{...user}});
    }

    const table = () => { // renderiza la tabla con los filtros
        return (
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Cédula</TableCell>
                  <TableCell>Nombre *</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Vacunado</TableCell>
                  <TableCell>Tipo Vacuna</TableCell>
                  <TableCell>Fecha Vacuna</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map( row => (
                  <TableRow key={row.cardId}>
                    <TableCell>{row.cardId}</TableCell>
                    <TableCell>{row.name + ' ' + row.lastName}</TableCell>
                    <TableCell>{row.rol}</TableCell>
                    <TableCell>{row.isVaccinated ? 'SI' : 'NO'}</TableCell>
                    <TableCell>{row.vaccine.type}</TableCell>
                    <TableCell>{row.isVaccinated ? utils.formatDate(new Date(row.vaccine.date)) : ''}</TableCell>
                    <TableCell>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => clickUpdateEmployee(row)}
                            className={classes.button}>
                            Actualizar
                        </Button>
                    </TableCell>
                    <TableCell>
                        <Button
                            size="small"
                            style={{display: login.cardId == row.cardId ? 'none' : ''}}
                            variant="contained"
                            color="secondary"
                            onClick={() => clickDeleteEmployee(row)}
                            className={classes.button}>
                            Eliminar
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        );
    }

    const selectFilter = () => { // renderiza las opciones de filtro
        return (
            <Grid item xs={12} sm={6} >
                <FormControl className={classes.formControl}>
                    <InputLabel id="filter">Filtro</InputLabel>
                    <Select
                        labelId="filter"
                        id="filterSelect"
                        value={query.type}
                        onChange={(e) => dataChange(e, 'O')}
                        >
                            <MenuItem value='0'>Sin filtro</MenuItem>
                            <MenuItem value='2'>Tipo vacuna</MenuItem>
                            <MenuItem value='1'>Estado vacunación </MenuItem>
                            <MenuItem value='3'>Rango fechas vacunación</MenuItem>
                    </Select>
                </FormControl>  
            </Grid>
        )
    }

    const form = () => { // renderiza el formulario
        if(query.type === FILTER_NO){
            return null;
        }
        if(query.type === FILTER_VACCINATION_TYPE){
            return (
                <Grid item xs={12} sm={6} >
                    <FormControl className={classes.formControl}>
                        <InputLabel id="tipo-label">Tipo Vacuna</InputLabel>
                        <Select
                            labelId="tipo-label"
                            id="tipo-select"
                            value={query.param1}
                            onChange={(e) => dataChange(e, 'T')}
                            >
                            <MenuItem value='Sputnik'>Sputnik</MenuItem>
                            <MenuItem value='AstraZeneca'>AstraZeneca</MenuItem>
                            <MenuItem value='Pfizer'>Pfizer</MenuItem>
                            <MenuItem value='Jhonson&Jhonson'>Jhonson&Jhonson</MenuItem>
                        </Select>
                    </FormControl>  
                </Grid>
            )
        }
        if(query.type === FILTER_VACCINATION_STATUS){
            return (
                <Grid item xs={12} sm={6} >
                    <FormControl className={classes.formControl}>
                        <InputLabel id="vacunado-label">Estado</InputLabel>
                        <Select
                            labelId="vacunado-label"
                            id="vacunado-select"
                            value={query.param1}
                            onChange={(e) => dataChange(e, 'S')}
                            >
                            <MenuItem value='vacunados'>Si Vacunado</MenuItem>
                            <MenuItem value='novacunado'>No Vacunado</MenuItem>
                        </Select>
                    </FormControl>  
                </Grid>
            )
        }
        if(query.type === FILTER_VACCINATION_RANGE){
            return (
                <React.Fragment>
                    <Grid item xs={12} sm={6} ></Grid>
                    <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container style={{width:'100%', marginTop:'-1.1em'}}>
                                <KeyboardDatePicker
                                    style={{width:'100%'}}
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline-from"
                                    label="Desde"
                                    value={query.param1}
                                    onChange={(e) => dataChange(e, 'F')}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}      
                                />
                            </Grid>
                        </MuiPickersUtilsProvider> 
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container style={{width:'100%', marginTop:'-1.1em'}}>
                                <KeyboardDatePicker
                                    style={{width:'100%'}}
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline-until"
                                    label="Hasta"
                                    value={query.param2}
                                    onChange={(e) => dataChange(e, 'U')}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}      
                                />
                            </Grid>
                        </MuiPickersUtilsProvider> 
                    </Grid>
                </React.Fragment>
            )
        }
        return null;
    }

    // dialogo para eliminar al usuario
    const dialogDeleteUser = deleteUser.delete ? <DeleteUser user={deleteUser.user} onClose={() => setDeleteUser({delete:false, user:{}})}/> : null;

    // renderiza el componente
    return (
        <React.Fragment>
            <CssBaseline />
            {dialogDeleteUser}
            <main>
                <Container className="items-card-grid" maxWidth="md">
                    <Grid container spacing={4}>
                        {selectFilter()}
                        {form()}
                    </Grid>
                    <Grid container spacing={4}>
                        {table()}
                    </Grid>
                </Container>
            </main>

            {/* Footer */}
            <footer className="items-footer">
                <Copyright />
            </footer>
            {/* End footer */}
            </React.Fragment>
      );
}

const mapStateToProps = (state) => ({
    login : state.data.login,
});

const mapDispatchToProps = {
    aShowUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryUser);
