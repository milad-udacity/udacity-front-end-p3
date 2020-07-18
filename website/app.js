const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const key = '635019b1b185197f1525d4d444260a27';

let d = new Date();
const date = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const postCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;    
    getTemperature(baseURL, postCode, key)
        .then(function (data) {
            postData('http://localhost:3000/addWeatherData', {
                temperature: data.main.temp,
                date,
                user_response: feelings
            })
                .then(function () {
                    updateUI()
                })
        })
}

const getTemperature = async (baseURL, code, key) => {
    const response = await fetch(baseURL + code + ',us' + '&APPID=' + key)    
    try {
        const data = await response.json();                
        return data;
    }
    catch (error) {
        console.log('error', error);
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
    const request = await fetch('http://localhost:3000/all');
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