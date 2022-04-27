import React from 'react'; //Importamos react
import AppRoutes from '../routes/routes';
import Header from './Header';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';

class App extends React.Component {

   render() {
     return(
       <div>
           <NotificationContainer/>
           <div>
                <Header/>
           </div>
           <div>
                <AppRoutes/>
           </div>
       </div>
     )
   }

}

export default App