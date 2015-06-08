
// VARIABLES

// Variable para la localizacion
var lc;
// variable de PhoneGap 
var pgr = false;

minimo = 4300; //pesos
unidadMinima = 48; //unidades
banderazo = 17; //unidades
metrosPorUnidad = 80; //metros
valorUnidad = 90; //pesos
recargoPuertaPuerta = 500; //pesos
recargoNocheFiesta = 1100; //pesos
tiempoEspera = 50; //segundos
valorTiempoEspera = 90; //pesos
inicioNocturna = 20; //hora

var fecha = new Date();

var dia = new Array(7);
dia[0]="Domingo";
dia[1]="Lunes";
dia[2]="Martes";
dia[3]="Miercoles";
dia[4]="Jueves";
dia[5]="Viernes";
dia[6]="Sabado";

var mes = new Array(12);
mes[0]="Enero";
mes[1]="Febrero";
mes[2]="Marzo";
mes[3]="Abril";
mes[4]="Mayo";
mes[5]="Junio";
mes[6]="Julio";
mes[7]="Agosto";
mes[8]="Septiembre";
mes[9]="Octubre";
mes[10]="Noviembre";
mes[11]="Diciembre";


// FUNCTIONS


function onBodyLoad() 
{
	// agrega un listener para detectar eventos
    document.addEventListener("deviceready", onDeviceReady, false);
}


function onDeviceReady() 
{
	// Encuentra el tag html donde se escribira la ubicación
    lc = document.getElementById("locationInfo");
    // Bandera para saber que todo va bien con Phonegap
    pgr = true;
}

function setPoints(distancia){
	//Si la distancia no cambia, debe incrementar las unidades dependiendo del tiempo que se esté parado, de lo contrario, calcular distancia
}

function getPay(unidad, fecha, puertaAPuerta){
	precio = 0;
	hora = 0; //tomar hora del parámetro fecha
	dia = "martes"; //tomar dia del parámetro fecha
	if (unidad <= unidadMinima){
		precio = minimo;
	}
	else{
		precio = unidad*valorUnidad;
	}

	if (dia == "sábado" || dia == "domingo" || hora >= 20){
		precio = precio + recargoNocheFiesta;
	}
	if (puertaAPuerta == true){
		precio = precio + recargoPuertaPuerta;
	}

	document.getElementById("counter").innerHTML = precio;

}

function getLocation() 
{
	if(pgr == true) 
	{
		var locOptions = {
        timeout : 5000,
        enableHighAccuracy : true
    };
    // Encuentra la ubicación actual
    navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, locOptions);
    // Limpia el texto mientras se encuentra la ubicación
    lc.innerHTML = "Leyendo la localización...";
    } 
    else
    {
    	alert("PhoneGap no funciona.");
    }
}


function onLocationSuccess(loc) 
{
	alert("onLocationSuccess");
    // Haya la hora actual
    var d = new Date(loc.timestamp);
    // Reemplaza el texto html con los datos encontrados
    lc.innerHTML = '<b>Current Location</b><hr /><b>Latitude</b>: ' + loc.coords.latitude + '<br /><b>Longitude</b>: ' + loc.coords.longitude + '<br /><b>Altitude</b>: ' + loc.coords.altitude + '<br /><b>Accuracy</b>: ' + loc.coords.accuracy + '<br /><b>Altitude Accuracy</b>: ' + loc.coords.altitudeAccuracy + '<br /><b>Heading</b>: ' + loc.coords.heading + '<br /><b>Speed</b>: ' + loc.coords.speed + '<br /><b>Timestamp</b>: ' + d.toLocaleString();
}


function onLocationError(e) 
{
	alert("Geolocation error: #" + e.code + "\n" + e.message);
}


function fecha()
{
	document.write('Fecha: '+fecha.getDate(),'<br>Dia de la semana: '+fecha.getDay(),'<br>Mes (0 al 11): '+fecha.getMonth(),'<br>Año: '+fecha.getFullYear(),'<br>Hora: '+fecha.getHours(),'<br>Hora UTC: '+fecha.getUTCHours(),'<br>Minutos: '+fecha.getMinutes(),'<br>Segundos: '+fecha.getSeconds());
}