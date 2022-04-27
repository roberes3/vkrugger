import React, {useEffect} from 'react';
import { connect } from "react-redux";
import { aFilterItems, aShowItem, aAddPurchaseItem, aChangeQuantityItem } from '../redux/actions';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Data from '../services/data';

import Copyright from '../components/Copyright';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Empleados Vacunados',
      },
    },
  };
  
  const labels = ['Sputnik', 'AstraZeneca', 'Pfizer', 'Jhonson&Jhonson'];

  export const data = {
    labels,
    datasets: [
      {
        label: 'Vacunas',
        data: [4, 4, 5, 5],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
      
    ],
  };

// Componente react inicial, que muestra el grafico de barras con estadisticas
class Home extends React.Component {

    // constructor
  constructor(props) {
    super(props);
  }

  // crea el render
  render(){
      return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Container className="items-card-grid" maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    <Bar options={options} data={data} />;
                </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className="items-footer">
                <Typography variant="h6" align="center" gutterBottom>
                  Estadística
                </Typography>

                <Copyright />
            </footer>
            {/* End footer */}
            </React.Fragment>
      )
  }
}


const mapStateToProps = (state) => ({
    login : state.data.login,
});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);