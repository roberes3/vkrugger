// Modulo que tiene funciones utilitarias


// pregunta si es un email valido
export const isEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

// pregunta si es cedula valida
export const isCedula = (cedula) => {
    //Preguntamos si la cedula consta de 10 digitos
 if(cedula.length == 10){
    
    //Obtenemos el digito de la region que sonlos dos primeros digitos
    var digito_region = cedula.substring(0,2);
    
    //Pregunto si la region existe ecuador se divide en 24 regiones
    if( digito_region >= 1 && digito_region <=24 ){
      
      // Extraigo el ultimo digito
      var ultimo_digito   = cedula.substring(9,10);

      //Agrupo todos los pares y los sumo
      var pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));

      //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
      var numero1 = cedula.substring(0,1);
      var numero1 = (numero1 * 2);
      if( numero1 > 9 ){ numero1 = (numero1 - 9); }

      var numero3 = cedula.substring(2,3);
      var numero3 = (numero3 * 2);
      if( numero3 > 9 ){ numero3 = (numero3 - 9); }

      var numero5 = cedula.substring(4,5);
      var numero5 = (numero5 * 2);
      if( numero5 > 9 ){ numero5 = (numero5 - 9); }

      var numero7 = cedula.substring(6,7);
      var numero7 = (numero7 * 2);
      if( numero7 > 9 ){ numero7 = (numero7 - 9); }

      var numero9 = cedula.substring(8,9);
      var numero9 = (numero9 * 2);
      if( numero9 > 9 ){ numero9 = (numero9 - 9); }

      var impares = numero1 + numero3 + numero5 + numero7 + numero9;

      //Suma total
      var suma_total = (pares + impares);

      //extraemos el primero digito
      var primer_digito_suma = String(suma_total).substring(0,1);

      //Obtenemos la decena inmediata
      var decena = (parseInt(primer_digito_suma) + 1)  * 10;

      //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
      var digito_validador = decena - suma_total;

      //Si el digito validador es = a 10 toma el valor de 0
      if(digito_validador == 10)
        var digito_validador = 0;

      //Validamos que el digito validador sea igual al de la cedula
      if(digito_validador == ultimo_digito){
        return true;
      }else{
        return false;
      }
      
    }else{
      // es falso porque la region no pertenece
      return false;
    }
 }else{
    //es falso porque si la cedula tiene mas o menos de 10 digitos
    return false;
 }    
}

// determina si es requerido
export const isRequered = (str) => {
    str = String(str).trim(); // retira los espacios del principio y final
    if(!str || str.length < 2){
        return false
    }
    return true;
}

// determina si es requerido
export const isPassword = (str) => {
    str = String(str).trim(); // retira los espacios del principio y final
    if(!str || str.length < 6){
        return false
    }
    return true;
}

// determina si solo contiene letras
export const isOnlyLetters = (str) => {
    if(!str){ // si es vacio
        return true;
    }
    return String(str)
        .match(
            /^[A-Za-z ]+$/
        );
}

// verifica que un numero sea valido
export const isNumber = (str, min, max) => {
    if(!str){
        return false;
    }
    try{
        let number = parseInt(str);
        if(number >= min && number <= max){
            return true;
        }
    }catch(e){}
    return false;
}

// compara dos fechas
export const compareDate = (date1, date2) => {
    let date1D = new Date(date1);
    let date2D = new Date(date2);

    date1D.setMilliseconds(0);
    date1D.setMinutes(0);
    date1D.setSeconds(0);
    date1D.setHours(0);

    date2D.setMilliseconds(0);
    date2D.setMinutes(0);
    date2D.setSeconds(0);
    date2D.setHours(0);

    if(date1D <= date2D){
        return true;
    }
    return false;
}

// formate la fecha 
export const formatDate = (date) => {
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
}

// determina si solo contiene letras
export const isLettersNumbers = (str) => {
    if(!str){ // si es vacio
        return true;
    }
    return String(str)
        .match(
            /^[A-Za-z0-9 _]+$/
        );
}