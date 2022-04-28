# Aplicación para registro de vacunaciòn de Kruger

Este projecto es un reto desarrollado para Krugger:

Se ha realizado en [React JS](https://es.reactjs.org/).

Y se ha utilizado [Firebase](https://firebase.google.com/) como motor de base de datos


## Descripción de la Aplicaciòn

La aplicación permite, autentificar, registrar, editar, listar y eliminar a empleados

La aplicación cuenta con cinco vistas:

* Login:      Ingreso de credenciales para ingresar al sistema
              (Acceso a todos)

* Principal:  Muestra gráfico estadístico de tipos de vacunas y empleados vacunados
              (Accesso a todos)

* Actualizar Datos :  Actualización de datos del empleado
                      (Mis datos -> Acceso a todos
                      Datos de otro -> Acceso solo a Administradores)

* Añadir Empleado   : Ingresa un nuevo empleado
                      (Acceso solo a Administradores)

* Consultas         : Listar todos los empleados ingresados en el sistema, y filtros                      
                      (Acceso solo a Administradores)


### `Nota:`
Las consultas y gráfico se actualizan en línea si otro usuario ingresa, modifica o elimina empleados       


## Dependencias

Node JS (Se ha probado en la versión 16.14.2)

Browser de su preferencia (Se ha probado bajo Google Chrome)

Conectividad a Internet (Por conexión a Firebase es requerida)


## Iniciar Applicación

En el directorio del proyecto, correr:

### `npm start`

Correr la aplicación en un browser.\
Abrir [http://localhost:3000](http://localhost:3000) para interactuar con la aplicación.

Credenciales para el ingreso al sistema:\
     usuario: robert  &   contraseña: escobar    ->   Administrador\
     usuario: mary    &   contraseña: moreira    ->   Empleado


## La Applicación

* Login \
  ![Vista del Login](https://github.com/roberes3/vkrugger/blob/main/app/login.png)

* Principal \
  ![Vista Principal](https://github.com/roberes3/vkrugger/blob/main/app/home.png)

* Actualizar Datos \
  ![Actualizar Datos](https://github.com/roberes3/vkrugger/blob/main/app/actualizar.png)

* Añadir Empleado \
  ![Actualizar Datos](https://github.com/roberes3/vkrugger/blob/main/app/insertar.png)

* Consultas \
  ![Consultas](https://github.com/roberes3/vkrugger/blob/main/app/consultas.png)
