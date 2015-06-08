
// VARIABLES

// Variable para la localizacion
var lc;
// variable de PhoneGap 
var pgr = false;

int minimo = 4300; //pesos
int unidadMinima = 48;
int banderazo = 17; //unidades
int metrosPorUnidad = 80; //metros
int valorUnidad = 90; //pesos
int recargoPuertaPuerta = 500; //pesos
int recargoNocheFiesta = 1100; //pesos
int tiempoEspera = 50; //segundos
int valorTiempoEspera = 90; //pesos
int inicioNocturna = 20;

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