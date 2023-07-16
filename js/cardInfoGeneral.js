const alturaLocalidad = document.getElementById('lblAltura');
const coordenadasLocalidad = document.getElementById('lblCoordenadas');
const lblLocalidad= document.getElementById('lblLocalidad');
const fecha  = document.getElementById('lblFecha');
const velocidadViento = document.getElementById('lblViento');

export const creaCardGeneral = (elevation,latitude,longitud,DescLocalidad,infoTemp)=>{
     //Card Localidad Info General
     console.log('creaCardGeneral()');
     alturaLocalidad.innerText = 'Altura: ' + elevation + ' msnm';
     console.log("elevation::",elevation);
     coordenadasLocalidad.innerText = 'Coordenadas Lat: ' + latitude + '   Lon: ' + longitud;
     const date = new Date();   
     let fechaActual =date.getFullYear();
     fecha.innerText = date;
     lblLocalidad.innerText = DescLocalidad;
     velocidadViento.innerText = 'Velocidad Viento: ' + infoTemp[0].all_day.wind.speed + ' Dirección: ' + infoTemp[0].all_day.wind.dir + ' Angulo: ' + infoTemp[0].all_day.wind.angle;
}