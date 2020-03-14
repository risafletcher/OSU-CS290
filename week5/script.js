document.getElementById('weatherForm').addEventListener('submit', (e) => {
    const cityName = document.getElementById('cityName').value;
    const countryCode = document.getElementById('countryCode').value;
    const zipcode = document.getElementById('zipcode').value;
    const errorContainer = document.getElementById('weatherError');
    if (!countryCode || countryCode && !cityName && !zipcode) {
        errorContainer.textContent = 'Please enter a city name or zipcode.';
    } else {
        errorContainer.textContent = '';
        const apiKey = '345debc28abef7625e7bbf25545c9d4b';
        let url;
        if (countryCode) {
            url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${apiKey}`;
        } else if (zipcode) {
            url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${countryCode}&appid=${apiKey}`;
        }
        if (url) {
            const weatherResultsContainer = document.getElementById('weatherResults');
            weatherResultsContainer.textContent = 'Loading...';
            const req = new XMLHttpRequest();
            req.open('GET', url, true);
            // req.setRequestHeader('Content-Type', 'application/json');
            req.addEventListener('load', () => {
                if (req.status >= 200 && req.status < 400) {
                    const response = JSON.parse(req.responseText);
                    console.log(response);
                    const { weather: [{ main, description }], main: { temp } } = response;
                    weatherResultsContainer.textContent = `${main}, ${description}, ${temp}`;
                } else {
                    weatherResultsContainer.textContent = '';
                    errorContainer.textContent = 'There was an error loading weather data.';      
                }
            })
            req.send(null);
        }
    }
    e.preventDefault();
})

document.getElementById('dummyForm').addEventListener('submit', (e) => {
    const nameResult = document.getElementById('nameResult');
    const descriptionResult = document.getElementById('descriptionResult');
    nameResult.textContent = 'Loading...';
    descriptionResult.textContent = 'Loading...';
    const req = new XMLHttpRequest();
    const payload = {
        name: document.getElementById('nameInput').value,
        description: document.getElementById('descriptionInput').value,
    };
    req.open('POST', 'http://httpbin.org/post', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', () => {
        if (req.status >= 200 && req.status < 400) {
            const { json } = JSON.parse(req.responseText);
            nameResult.textContent = json.name;
            descriptionResult.textContent = json.description;
        } else {
            nameResult.textContent = '';
            descriptionResult.textContent = '';
            document.getElementById('dummyError').textContent = 'There was an error loading the data.';
        }
    })
    req.send(JSON.stringify(payload));
    e.preventDefault();
})
