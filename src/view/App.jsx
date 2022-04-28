import React from 'react'; //Importamos react
import AppRoutes from '../routes/routes';
import Header from '../components/Header';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';

// Componente en el que inicia la aplicacion
class App extends React.Component {

   render() {
     return(
       <div>
           {/*Contendor de notificaciones */}
           <NotificationContainer/>
           <div>
                {/* Cabecera de la aplicacion */}
                <Header/>
           </div>
           <div>
                {/* Paginas que seran mostradas al usuario */}
                <AppRoutes/>
           </div>
       </div>
     )
   }

}

export default App