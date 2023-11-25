let latitude = document.getElementById('lat');
let longitude = document.getElementById('lon');

const button_coordinates = document.getElementById('btn_coordinates');
const resetButton = document.getElementById('reset');

let coordinateDiv = document.getElementById('coordinates');

const APIKEY = '7cf66b5215db60e56aa4e23f5e4ed5fb';
button_coordinates.addEventListener('click', getValues);

function isValidCoordinates(latitudeStr, longitudeStr) {
	const latitude = parseFloat(latitudeStr);
	const longitude = parseFloat(longitudeStr);
  
	if (isNaN(latitude) || isNaN(longitude)) {
	  return false;
	}
  
	if (latitude < -90 || latitude > 90) {
	  return false;
	}
  
	if (longitude < -180 || longitude > 180) {
	  return false;
	}
  
	return true;
}

function getValues() {
	let lat = latitude.value;
	let lon = longitude.value;
	if (isValidCoordinates(lat, lon))
		getWeatherCoordinates(lat, lon);
	else
		alert('Incorrect coordinates!!!')
}

async function getWeatherCoordinates(lat, lon) {
	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&lang=ru`);
	
	weather = await response.json();
	outputCoordinates(weather);
}

function kelvinToCelsius(kelvin) {
	var celsius = Math.round(kelvin - 273.15);
	return celsius;
}

function outputCoordinates(weather) {
	const createAndAppendElement = (tag, text) => {
		const element = document.createElement(tag);
		element.innerHTML = text;
		return element;
	};
	
	const cityName = createAndAppendElement('h3', 'Город: ' + weather.name);
	const country = createAndAppendElement('h3', 'Страна: ' + weather.sys.country);
	const celsiusTemp = kelvinToCelsius(weather.main.temp);
	const temperature = createAndAppendElement('h3', 'Температура: ' + celsiusTemp + ' °C');
	const weatherGroup = createAndAppendElement('h3', 'Погода: ' + weather.weather[0].description);
	
	const imageUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
	const imgElement = document.createElement('img');
	imgElement.src = imageUrl;
	
	document.getElementById('output').append(cityName, country, temperature, weatherGroup, imgElement);
	
	resetButton.style.display = 'block';
	}
	

resetButton.addEventListener('click', reset)
function reset() {
	document.getElementById('output').remove()
	location.reload();
	resetButton.style.display = 'none'
}