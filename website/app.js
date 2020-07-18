const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const key = '635019b1b185197f1525d4d444260a27';

const hostApi = 'http://localhost:3000';
// const hostApi = 'https://weather-app-p3.herokuapp.com' ;    

let d = new Date();
const date = d.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const cityName = document.getElementById('city').value;
    const feelings = document.getElementById('feelings').value;
    getTemperature(baseURL, cityName, key)
        .then(async (data) => {
            try {
                let response = await postData(`${hostApi}/addWeatherData`, {
                    temperature: data.main.temp,
                    date,
                    user_response: feelings
                })
                updateUI(response);
                if (document.getElementById('alert')) {
                    document.getElementById('alert').remove()
                }
            } catch (error) {
                const header = document.getElementById('header')
                let alert = document.createElement('div');
                alert.setAttribute('role', 'alert');
                alert.setAttribute('class', 'alert alert-danger')
                alert.innerHTML = "City name is not correct";
                alert.setAttribute('id', 'alert');
                header.appendChild(alert);
                console.log(error.message);
            }
        })
}

const getTemperature = async (baseURL, cityName, key) => {
    try {
        const response = await fetch(baseURL + cityName + ',us' + '&APPID=' + key)
        const data = await response.json();
        console.log(data);
        if (response.ok === true) {
            return data;
        } else {
            throw Error()
        }
    }
    catch (error) {
        console.log(error);
    }
}

const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postRequest.json();
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}

// Update user interface
const updateUI = async () => {
    const request = await fetch(`${hostApi}/all`);
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
    }
    catch (error) {
        console.log('error', error);
    }
}