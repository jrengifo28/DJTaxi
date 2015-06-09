
// VARIABLES

// Variable para la localizacion
var lc;
// variable de PhoneGap 
var pgr = false;

minimo = 4300; //pesos
unidadMinima = 48;
banderazo = 17; //unidades
metrosPorUnidad = 80; //metros
valorUnidad = 90; //pesos
recargoPuertaPuerta = 500; //pesos
recargoNocheFiesta = 1100; //pesos
tiempoEspera = 50; //segundos
valorTiempoEspera = 90; //pesos
inicioNocturna = 20;


// VARIABLES GLOBALES
antLatitud = 0;
antLongitud = 0;
latitud = 0;
longitud = 0;
segundosEspera = 0;
unidades = banderazo;
contador = 0;

// FUNCTIONS


function onBodyLoad() 
{
	// agrega un listener para detectar eventos
    document.addEventListener("deviceready", onDeviceReady, false);

    setInterval(getTime,5000);
}


function onDeviceReady() 
{
	// Encuentra el tag html donde se escribira la ubicación
    lc = document.getElementById("locationInfo");
    // Bandera para saber que todo va bien con Phonegap
    pgr = true;
}

function Geolocation(){
	if(pgr == false) 
	{
		alert("PhoneGap no funciona.");
	}
	else{
		setInterval(getLocation,1000);
	}
}

function getInitLocation(){
	getLocation();
}

function getLocation() 
{
	
	var locOptions = {
       	timeout : 900,
        enableHighAccuracy : true
    };

    // Encuentra la ubicación actual
    navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, locOptions);
    // Limpia el texto mientras se encuentra la ubicación
    lc.innerHTML = "Leyendo la localización...";
}


function onLocationSuccess(loc) 
{
    // Haya la hora actual
    var d = new Date(loc.timestamp);
    // Reemplaza el texto html con los datos encontrados
    lc.innerHTML = '<b>Current Location</b><hr /><b>Latitude</b>: ' + loc.coords.latitude + 
    '<br /><b>Longitude</b>: ' + loc.coords.longitude;

    latitud = loc.coords.latitude;
    longitud = loc.coords.longitude;
    document.getElementById("counter").innerHTML = latitud;
    //setPoints();

}

function onLocationInit(loc) 
{
    var d = new Date(loc.timestamp);
    day = d.getDay();
    if (day == "1")
    	dia = "Lunes";
    else if (day == "2")
    	dia = "Martes";
    else if (day == "3")
    	dia = "Miércoles";
    else if (day == "4")
    	dia = "Jueves";
    else if (day == "5")
    	dia = "Viernes";
    else if (day == "6")
    	dia = "Sábado";
    else if (day == "7")
    	dia = "Domingo";

    //document.getElementById("inicio").innerHTML = '<br /><b>Hora</b>: ' + dia + d.getHours() + ":" + d.getMinutes();
    document.getElementById("fechaHora").innerHTML = '<br /><b>Hora</b>: ' + dia + " " + d.getHours() + ":" + d.getMinutes();
    //document.getElementById("inicio").innerHTML = '<br /><b>Hora</b>: ' + d.toLocaleString();

}

function onLocationError(e) 
{
	alert("Geolocation error: #" + e.code + "\n" + e.message);
}


function setPoints(){
	if ( contador == 0){
		antLongitud = longitud;
		antLatitud = latitud;
	}
	contador = contador +1;
	//Si la distancia no cambia, debe incrementar las unidades dependiendo del tiempo que se esté parado, de lo contrario, calcular distancia
	if (antLongitud == longitud){
		if (segundosEspera >= tiempoEspera){
			unidades = unidades + 1;
			segundosEspera = 0;
		}
		else{
			segundosEspera = segundosEspera + 1;
		}
	}
	else if (sqrt((antLatitud-latitud)^2+(antLongitud-longitud)^2) >= metrosPorUnidad){
		unidades = unidades + 1;
		antLongitud = longitud;
		antLatitud = latitud;
	}
	document.getElementById("counter").innerHTML = unidades;

}

function getPay(unidad, fecha, puertaAPuerta){
	precio = 0;
	hour = fecha.getHours();
	hora = parseInt(hour);
	day = fecha.getDay();
	if (day == "1")
    	dia = "Lunes";
    else if (day == "2")
    	dia = "Martes";
    else if (day == "3")
    	dia = "Miércoles";
    else if (day == "4")
    	dia = "Jueves";
    else if (day == "5")
    	dia = "Viernes";
    else if (day == "6")
    	dia = "Sábado";
    else if (day == "7")
    	dia = "Domingo";

	if (unidad <= unidadMinima){
		precio = minimo;
	}
	else{
		precio = unidad*valorUnidad;
	}

	if (dia == "Sábado" || dia == "Domingo" || hora >= 20){
		precio = precio + recargoNocheFiesta;
	}
	if (puertaAPuerta == true){
		precio = precio + recargoPuertaPuerta;
	}

	document.getElementById("counter").innerHTML = precio;

}

function getTime () {
	var locOptions = {
       	timeout : 5000,
        enableHighAccuracy : true
    };

    // Encuentra la ubicación actual
    navigator.geolocation.getCurrentPosition(onLocationInit, onLocationError, locOptions);
}