const apiKey= 'cfc445057598d6566207a298ce362407'
const info = document.getElementById('info')
const button = document.getElementById('search')
const city = document.getElementById('city')


async function getJSON(url) {
	try {
		const response = await fetch(url)
		return await response.json();
	} catch (error) {
		throw error;
	}
}

async function getCity(url) {
	const theCity = await getJSON(url);
	const location = `https://api.openweathermap.org/data/2.5/onecall?lat=${theCity.coord.lat}&lon=${theCity.coord.lon}&units=imperial&appid=${apiKey}`;
    const data = await getJSON(location);
    return Promise.all([theCity,data]);
}

function generateHTML(respond) {
  
var future = new Date(); // get today date
future.setDate(future.getDate() + 7); // add 7 days
var finalDate = future.getFullYear() +'-'+ ((future.getMonth() + 1) < 10 ? '0' : '') + (future.getMonth() + 1) +'-'+ future.getDate();
  var newHTML = `<div class="display2"><p>City: ${respond[0].name}</p>`;
  newHTML += `<p class="display2">Country: ${respond[0].sys.country}</p></div>`;
  newHTML += `<p class="display2">Current weather: ${respond[0].weather[0].description}</p>`;

newHTML += `<header class="table">
  <div class="col">Day</div>
  <div class="col">Low</div>
  <div class="col">High</div>
  <div class="col">Weather</div>
  </header>`
  
  for (var i = 0; i < respond[1].daily.length; i++) {
     newHTML += `<div class="table">
                <div class="col">${finalDate}${i}</div>
                <div class="col">${(respond[1].daily[i].temp.min)}</div>
                <div class="col">${(respond[1].daily[i].temp.max)}</div>
                <div class="col"><img src="http://openweathermap.org/img/wn/${respond[1].daily[i].weather[0].icon}@2x.png"></img></div>
                </div>`
            }
  info.innerHTML = newHTML;
}

button.addEventListener('click', (event) => {
   event.target.textContext = "Loading....";
   var urlCity = `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial&appid=${apiKey}`;
   getCity(urlCity)
     .then(generateHTML)
     .catch( e => {
     	(info.innerHTML) = '<h3 class="display2">Something went wrong</h3>'
     })
});


