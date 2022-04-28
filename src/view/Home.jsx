import React, { useEffect, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Data from '../services/data';

import Copyright from '../components/Footer';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';


// registro necesario para mostrar el grafico
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


// Componente react inicial, que muestra el grafico de barras con estadisticas
export default function Home() {

  const [count, setCount ] = useState(0);

   // recibe la notificacion de las estadisticas
  const notify = (data, stadistics) => {
    setCount(count+1); // realiza un nueva renderizacion
  } 

  // utiliza la use subscribe para suscribirse a los datos
  // y de esta manera realizar una notificacion cuando exista cambios
  useEffect( () => {
      Data.addSubscription('home', notify);
      return () => {
          Data.removeSubscription('home');
      }
  });

  const stadistics = Data.getStadistics();

  console.log("Estadisticas: ", stadistics);

  // etiquetas del grafico
  const labels = ['Sputnik', 'AstraZeneca', 'Pfizer', 'Jhonson&Jhonson', 'No Vacunados'];
  
  // coloca el titulo numero de vacunados y no vacunados
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Empleados de Krugger ( ${stadistics.vacated} Vacunados y ${stadistics.noVacated} No Vacunados )`
      },
    },
  };

  // coloca los datos acerca de los tipos de vacunas
  const data = {
      labels,
      datasets: [
        {
          label: 'Número de Empleados',
          data: [stadistics.sputnik, stadistics.astraZeneca, stadistics.pfizer, stadistics.jhonson, stadistics.noVacated],
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }    
      ],
  };  

  // crea el render
  return (
    <React.Fragment>
        <CssBaseline />
        <main>
            <Container className="items-card-grid" maxWidth="md">
            {/* Grafico de barras */}
            <Grid container spacing={4}>
                <Bar options={options} data={data} />
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
        </React.Fragment>
  );
}