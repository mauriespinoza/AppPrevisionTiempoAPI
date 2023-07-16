const alturaLocalidad = document.getElementById('lblAltura');
const coordenadasLocalidad = document.getElementById('lblCoordenadas');
const lblLocalidad= document.getElementById('lblLocalidad');
const fecha  = document.getElementById('lblFecha');

export const creaCardGeneral = (elevation,latitude,longitud,DescLocalidad)=>{
     //Card Localidad Info General
     alturaLocalidad.innerText = 'Altura: ' + elevation;
     console.log("elevation::",elevation);
     coordenadasLocalidad.innerText = 'Coordenadas Lat: ' + latitude + '   Lon: ' + longitud;
     const date = new Date();   
     let fechaActual =date.getFullYear();
     fecha.innerText = date;
     lblLocalidad.innerText = DescLocalidad;
}