
// Your web app's Firebase configuration
import db from "./firebase";
import { ref, onValue, set, onChildAdded, onChildChanged, onChildRemoved} from "firebase/database";
import password from 'secure-random-password';

// Clase que maneja los datos suminstrados por firebase
class Data {

  constructor(){
      this.init(); // inicializamos los datos
  }

  // coloca los datos en las collecciones correspondientes
  init(){
      // mantiene los usuarios
      this.users = [];
      this.stadistics = {};
      
      // suscripciones de componetes
      this.subscriptions = {};

      // funcion para realizar notificaciones
      const doNotify = (data) => {
         this.notifySubscriptions();
      }      

      // se suscribe a los evento de firebase cuando la
      // colleccion de usuarios ha sido modificada
      const usersRef = ref(db, 'users');
      onChildAdded(usersRef, doNotify);      
      onChildChanged(usersRef, doNotify);      
      onChildRemoved(usersRef, doNotify);  
      
      // obtiene los usuarios actuales
      this.loadUsers((users) => {
          this.users = Object.values(users);
          this.stadistics = this.loadStadistics(this.users);
      })
  }


  // añade la subscripcion del componente que esta escuchando
  addSubscription(name, callback){
    this.subscriptions[name] = callback;
  }

  // remueve la suscripcion del componente
  removeSubscription(name){
    delete this.subscriptions[name];
  }

  // notifica de los cambios a las subscripciones
  notifySubscriptions(){    
    // obtiene los usuarios y las estadisticas
    this.loadUsers( (users) => {
        this.users = Object.values(users);
        this.stadistics = this.loadStadistics(this.users);

        // si no hay suscripciones escuchando no realiza nada
        if(!Object.keys(this.subscriptions).length){
            return;
        }
        // realiza la notificacion a los componentes
        for (let prop in this.subscriptions) {
            let callbackNotify =  this.subscriptions[prop];           
            if(callbackNotify){
              callbackNotify(this.users, this.stadistics);
            }
        }
    });    
  }

  // coloca el username del usuario
  setUserAndPass(employee, callback){
     // verifica que exista el empleado
     if(!employee || !employee.name || !employee.lastName ){
         return null;
     }

     let randomNum = parseInt(Math.random() * (100 - 10) + 10);
     // forma el usuario (Primer nombre del empleado mas punto mas
     // segundo nombre del empleado y mas un numero aleatorio del 10 al 99) 
     // Ejemplo: roberto.escobar25
     let user = employee.name.split(" ")[0].toLowerCase() + "_" +
                employee.lastName.split(" ")[0].toLowerCase() + "_" +
                randomNum;

    // genera un password de 6 caracteres, letras y numeros
    let pass = password.randomPassword({ length: 6, characters: [password.lower, password.upper, password.digits] });

    // verifica si existe el usuario generado en la base de datos
    if(this.isUniqueUser(user)){ // retorna el empleado con el usuario y password
        callback({...employee, user, pass});  
    }else{ // busca un nuevo usuario
        this.getUserAndPass(employee, callback);              
    }      
  }  

  // actualiza datos del empleado
  updateEmployee(employee){
    // actualiza en firebase el empleado
    return set(ref(db, 'users/' + employee.cardId ), employee);
  }

  // inserta los datos del usuario
  addEmployee(employee){
    // actualiza en firebase el empleado
    return set(ref(db, 'users/' + employee.cardId ), employee);
  }

  // elimina los datos del empleado
  deleteEmployee(employee){
    // actualiza en firebase el empleado
    return set(ref(db, 'users/' + employee.cardId ), null);
  }

  // verifica si el usuario existe
  checkUser(user, pass){
    // verifica si existe el usuario generado en la base de datos
    return this.users.find( u => u.user === user && u.pass === pass);        
  }

  // check si la cedula es unica
  isUniqueCardId(idcard){
      return this.users.find( u => u.idcard === idcard) ? false : true;
  }

  // check si el usuario es unico
  isUniqueUser(user){
    return this.users.find( u => u.user === user.user && u.cardId !== user.cardId) ? false : true;
  }

  // obtiene todos los usuarios
  loadUsers(callback){
    const starRef = ref(db, 'users/');
    onValue(starRef, (snapshot) => {
        const data  = snapshot.val();                        
        callback(data);                        
    }, {onlyOnce: true});
  }

  // obtiene las estadisticas
  loadStadistics(data){
    let staditics = { // objeto con las estadisticas
        users     : 0,
        vacated   : 0,
        noVacated : 0,
        sputnik   : 0,
        astraZeneca : 0,
        pfizer      : 0,
        jhonson     : 0,
    }

    if(data){
        // obtiene las estadisticas de los datos
        data.forEach( u => {
            ++staditics.users;
            if(u.isVaccinated){
                ++staditics.vacated;
                switch(u.vaccine.type){
                    case 'Sputnik':
                        ++staditics.sputnik;
                        break;
                    case 'AstraZeneca':
                        ++staditics.astraZeneca;
                        break;
                    case 'Pfizer':
                        ++staditics.pfizer;
                        break;
                    case 'Jhonson&Jhonson':
                        ++staditics.jhonson;
                        break;
                    default:
                        break;
                }
                
            }else{
                ++staditics.noVacated;
            }
        });
    }
    return staditics;
  }

  // obtiene todos los usuarios
  getUsers(){
    return this.users;
  }
  
  // obtiene las estadisticas
  getStadistics(){
    return this.stadistics;
  }
  
}

// inicializa los datos manejados por el firebase
let data = new Data();

export default data;



