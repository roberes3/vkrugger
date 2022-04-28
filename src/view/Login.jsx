
import React from "react";
import { connect } from "react-redux";
import { aSendLogin } from '../redux/actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Copyright from '../components/Footer';

// componente que muestra el mensaje de login, cuando existe un error
function LoginMsg(props){
    
    if(props.msg.length == 0){
        return null;
    }else{
        return (
              <Grid item xs>
                  <div className="login-msg" >{props.msg}</div>
              </Grid>
        )
    }
}


// componente react que realiza el login
class Login extends React.Component {

    // constructor
  constructor(props) {
    super(props);

    // obtiene si esta guarda la inforamacion el local storage
    let save = localStorage.getItem('save') === 'true' ;

    // crea el estado el componente
    this.state = {
                  user : save ? localStorage.getItem('user') : '',
                  pass : save ? localStorage.getItem('pass') : '',
                  save : save,
                  userHelp : "",
                  passHelp : "",
                };
  }

  // atiende al login
  sendLogin = () => {
    const {user, pass, save } = this.state;
    let isValid = true;
    
    if(!user){ // si no tiene usuario muestra el error
      this.setState({userHelp:'Ingrese un usuario'})
      isValid = false;
    }
    
    if(!pass){ // si no tiene passsord muestra el error
      this.setState({passHelp:'Ingrese una contraseña'})
      isValid = false;
    }

    if(!isValid){
      return; // si no es valido no envia el login
    }

    if(save){ // guarda la informacion en el local storafe
      localStorage.setItem("user", user);
      localStorage.setItem("pass", pass);
    }else{
      localStorage.setItem("user", "");
      localStorage.setItem("pass", "");
    }
    localStorage.setItem("save", save);

    // envia a procesar el login
    this.props.aSendLogin(user, pass);
  }

  // actualiza los inputs
  dataChange = (e, type) => {
    switch(type){
      case "user":
        this.setState({user: e.target.value});
        break;
      case "pass":
        this.setState({pass: e.target.value});
        break;
      case "save":
        this.setState({save: !this.state.save});
        break;
    }
  }

  render() {
      const { user, pass, passHelp, userHelp, save } = this.state;

      let mailto="mailto:seleccion@ec.krugercorp.com?subject=Solicitud contraseña temporal &body=Solicitó se me asigne una clave temporal del usuario " + user;

      return (
        <Container component="main" maxWidth="xs">

        <CssBaseline />

        <div className="login-paper">

          <Avatar className="login-avatar">
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <form className="login-form" noValidate>

            <TextField variant="outlined" margin="normal" required fullWidth autoFocus value={user} onChange={(e) => this.dataChange(e, 'user')}
              id="user" label="Usuario" name="user" autoComplete="user"
              helperText={userHelp} />

            <TextField variant="outlined" margin="normal" required fullWidth value={pass} onChange={(e) => this.dataChange(e, 'pass')}
              name="password" label="Contraseña" type="password" id="password" autoComplete="current-password"
              helperText={passHelp} />


            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={save} onChange={(e) => this.dataChange(e, 'save')}/>}
              label="Recordarme"
            />

            <Button fullWidth variant="contained" color="primary" className="login-submit" onClick={this.sendLogin}>
              Ingresar
            </Button>

            <LoginMsg msg={this.props.msg}/>

            <Grid container>
              <Grid item xs>
                <Link href={mailto} variant="body2">
                  Olvide mi contraseña?
                </Link>
              </Grid>
              <Grid item>
                
              </Grid>
            </Grid>
          </form>
        </div>

        <Box mt={8}>
          <Copyright />
        </Box>

      </Container>
      );
  }
}

const mapStateToProps = (state) => ({
    msg : state.data.loginMsg,
});

const mapDispatchToProps = {
    aSendLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

