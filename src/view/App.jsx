import React from 'react'; //Importamos react
import AppRoutes from '../routes/routes';
import Header from './Header';


class App extends React.Component {

   render() {
     return(
       <div>
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