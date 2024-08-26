const container = document.querySelector('.container');
const search = document.querySelector('.searchbar button');
const weatherBox = document.querySelector('.weather-box .weather');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIkey = 'aa487e12ed67ff2cd436540c7f72c10d';
    const city = document.querySelector('.searchbar .city').value; 

    if (city === '') {
        return;
    }
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(json => {
            
            if (json.cod !== 200) { 
                throw new Error(json.message); 
            }

            const image = weatherBox.querySelector('img');
            const temp = weatherBox.querySelector('.temp');
            const description = weatherBox.querySelector('.description');
            const humidity = document.querySelector('.weather-details .humidity .info-humidity span');
            const wind = document.querySelector('.weather-details .wind .info-wind span');
            
            switch(json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    updatebackground('clearback.jpg')
                    break;
                case 'Rain':
                    image.src = 'rain.png'; 
                    updatebackground('rainback.jpg')
                    break;
                case 'Clouds': 
                    image.src = 'cloud.png'; 
                    updatebackground('cloudback.jpg')
                    break;
                case 'Snow':
                    image.src = 'snow.jpg'; 
                    updatebackground('snowback.jpg')
                    break;
                case 'Haze':
                    image.src = 'haze.png'; 
                    updatebackground('hazeback.jpg')
                    break;

                case 'Mist':
                    image.src = 'mist.png'; 
                    updatebackground('mistback.jpg')
                    break;
                default:
                    image.src = 'cloud.png'; 
                    updatebackground('IMG_0425.JPG')
            }
            
            temp.innerHTML = `${json.main.temp} <span>°C</span>`;
            description.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${json.wind.speed} Km/h`;
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });
        function updatebackground(imagePath) {
            document.body.style.backgroundImage = `url(${imagePath})`;
            document.body.style.backgroundSize = 'cover'; 
            document.body.style.backgroundPosition = 'center';
        }
    
});
