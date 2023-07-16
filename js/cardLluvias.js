const lblLluviaCant_1 = document.getElementById('lblLluviaCant_1');
const lblLluviaCant_2 = document.getElementById('lblLluviaCant_2');
const lblLluviaTipo_1 = document.getElementById('lblLluviaTipo_1');
const lblLluviaTipo_2 = document.getElementById('lblLluviaTipo_2'); 

export const creaCardLluvias = (infoTemp)=>{
         //Card lluvias
        //  let lluvia_1 = infoTemp[0].all_day.precipitation.total;
        //  let lluviaTipo_1 = infoTemp[0].all_day.precipitation.type;
        //  let lluvia_2 = infoTemp[1].all_day.precipitation.total;
        //  let lluviaTipo_2 = infoTemp[1].all_day.precipitation.type;

         lblLluviaCant_1.innerText = infoTemp[0].all_day.precipitation.total;
         lblLluviaCant_2.innerText = infoTemp[1].all_day.precipitation.total;
         lblLluviaTipo_1.innerText = infoTemp[0].all_day.precipitation.type;
         lblLluviaTipo_2.innerText = infoTemp[1].all_day.precipitation.type;
}