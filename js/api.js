import {crearGrafico} from  "./creaGrafico.js";
import {creaCardTemperatura} from "./cardTemperatura.js";
import {creaCardLluvias} from "./cardLluvias.js";
import {creaCardGeneral} from "./cardInfoGeneral.js"

const _btnBuscar = document.getElementById('btnBuscar');
const _txtUbicacion = document.getElementById('txtUbicacion');
const URL = 'https://www.meteosource.com/api/v1/free/';
const apiKey = 'sj2c8ibylrapbyosgq0sc2kesz6ayck2ypajpkng';
const URL_FIND_PLACES = URL + 'find_places?text=' ;
const table = document.getElementById('bodyTable');
let localidades = [];
let latitude = '';
let longitud = '';
let IDLocalidad = '';
let DescLocalidad = '';
// let grafico1;
// let grafico2;
// let grafico3;
let elevation = 0;
let unidadMedida= '';
let timezone = '';
let infoGrafico =[];

function localidad(){
    const index = localidades.findIndex((el) => el.place_id == IDLocalidad);
    console.log("index: " + index);
    HabilitaEfectoCargando();
    const localidad = localidades[index];
    console.log("lat: " + localidad.lat  + ' lon: ' + localidad.lon);
    latitude = localidad.lat;
    longitud = localidad.lon;
    DescLocalidad = localidad.name.toUpperCase();
    console.log("DescLocalidad: " + DescLocalidad);
    const URL_FIND_WEATHER = URL + `point?lat=${latitude}&lon=${longitud}&sections=current%2Cdaily&language=en&units=auto&key=${apiKey}`;
    const url = URL_FIND_WEATHER;
    console.log(`url::${url}`);
    
    let infoTemp = [];
    let infoTempGeneral = {};
    const getDataAPI= async ()=>{
        const response = await fetch(url);
        const datos = await response.json();
        
        infoTemp = datos.daily.data;
        infoGrafico = infoTemp;
        //infoTemp = datos.current;
        infoTempGeneral = datos.current;
        elevation = datos.elevation;
        unidadMedida = datos.units;
        timezone = datos.timezone;
        console.log(infoTempGeneral);
        console.log('unidadMedida:',unidadMedida);
        DehabilitaEfectoCargando();
    };
    getDataAPI()
    .then((result)=>{
      //Habilita card de Info y Grafico
      document.getElementById('rowInfo').style.display = 'flex';
      document.getElementById('rowGrafico').style.display = 'block';
      //Oculta Tabla Localidades
      document.getElementById('tabla-contenedor').style.display = 'none';
      
      // document.getElementById('theadLocalidades').style.display = 'none';
      ///////////////////////////////////////////////
      //Card Localidad Info General
      creaCardGeneral(elevation,latitude,longitud,DescLocalidad);
      ///////////////////////////////////////////////
      //Card Temperatura
      creaCardTemperatura(infoTemp,infoTempGeneral,unidadMedida);
      ///////////////////////////////////////////////
      //Card lluvias
      creaCardLluvias(infoTemp);
      //Card Grafico Pronostico tiempo 7 dias
      crearGrafico(infoGrafico);
    })
    .catch((error)=>{
      console.error(`Hemos tenido un problema::${error}`)
      alert("Hemos tenido un inconveniente, intente nuevamente. Por favor.");
    });
}

  function selectLocalidad(id){
    console.log("id: " + id);
    const index = localidades.findIndex((el) => el.place_id == id);
    console.log("index: " + index);
    const localidad = localidades[index];
    console.log("lat: " + localidad.lat  + ' lon: ' + localidad.lon);
    this.latitude = localidad.lat;
    this.longitud = localidad.lon;
  }

  _btnBuscar.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('evento click');
    HabilitaEfectoCargando();
    const url =URL_FIND_PLACES + `${_txtUbicacion.value}&language=en&key=${apiKey}`;
    console.log(`url::${url}`);
    const getData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      localidades = data;
      console.log(`data::${localidades}`);
      document.getElementById('rowInfo').style.display = 'none';
      document.getElementById('rowGrafico').style.display = 'none';
      DehabilitaEfectoCargando();
    };
    getData().then((result) => {
        console.log(`result::${result}`);
        document.getElementById('tabla-contenedor').style.display = 'flex';
        table.innerHTML ='';

        if (localidades.length > 0) {
          localidades.forEach((element, index) => {
            console.log(element.name);
            table.innerHTML += `
            <td data-label="Id">${element.place_id}</td>
            <td data-label="Nombre">${element.name}</td>
            <td data-label="Area">${element.adm_area1}</td>
            <td data-label="Provincia">${element.adm_area2}</td>
            <td data-label="Pais">${element.country}</td>
            <td data-label="Seleccionar">
            <button id="button-${index}" class="btn btn-primary">Seleccionar</button>
            </td>
            `; // <=======
          });
          localidades.forEach((element, index) => {
            document
              .getElementById(`button-${index}`)
              .addEventListener("click", () => funcionIntermedia(index));
          });
        } else {
          table.innerHTML = `
          <div>
              <h4>Sin resultados</h4> 
          </div>
          `;
          document.getElementById('rowInfo').style.display = 'none';
          document.getElementById('rowGrafico').style.display = 'none';
          
        } 
    })
    .catch((error)=>{
      console.error(`Hemos tenido un problema::${error}`)
      alert("Hemos tenido un inconveniente, intente nuevamente. Por favor.");
    });
  });
  const funcionIntermedia = function (index) {    // <=======
    const element = localidades[index];
    console.log(`Click realizado en ${element.place_id}`);
    IDLocalidad = element.place_id;
    localidad();
    //selectLocalidad(element.place_id);
  }
  function HabilitaEfectoCargando(){
    document.getElementById('contenedorcargando').style.display = 'flex';
  }
  function DehabilitaEfectoCargando(){
    document.getElementById('contenedorcargando').style.display = 'none';
  }