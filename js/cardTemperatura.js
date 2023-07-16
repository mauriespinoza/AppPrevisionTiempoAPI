const lblTempActual = document.getElementById('lblTempActual');
const lblTempMin_1 = document.getElementById('lblTempMin_1');
const lblTempMin_2 = document.getElementById('lblTempMin_2');
const lblTempMax_1 = document.getElementById('lblTempMax_1');
const lblTempMax_2 = document.getElementById('lblTempMax_2');
const lblUnidadMetrica = document.getElementById('lblUnidadMetrica');

export const creaCardTemperatura = (infoTemp, infoTempGeneral,unidadMedida) => {
     //Card Temperatura
     console.log('creaCardTemperatura()'); 
     lblTempMin_1.innerText = infoTemp[0].all_day.temperature_min;
      lblTempMin_2.innerText = infoTemp[1].all_day.temperature_min;
      lblTempMax_1.innerText = infoTemp[0].all_day.temperature_max;
      lblTempMax_2.innerText = infoTemp[1].all_day.temperature_max;
     if(unidadMedida =='metric'){
       unidadMedida = 'C°'
     } else if(unidadMedida == 'us'){
       unidadMedida = 'F°'
     } 
     lblUnidadMetrica.innerText = 'Temperatura del Aire en ' + unidadMedida;
     lblTempActual.innerText=  infoTempGeneral.temperature;
}