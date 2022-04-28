import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

// Componente que muestra el pie de la pagina
const Footer = () => (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" target="_blank" href="https://krugercorp.com/">
          Kruger, 
        </Link>{' Roberto Escobar '}
        {new Date().getFullYear()}
        {'.'}
  </Typography>
);

export default Footer;