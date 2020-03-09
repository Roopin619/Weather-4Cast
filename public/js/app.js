const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');
const bodyElement = document.querySelector('body');

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();      // to prevent refresh on form submission
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    messageFour.textContent = '';
    messageFive.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecastData.summary + " It is currently " + data.forecastData.currentTemp + " °C.";
                messageThree.textContent = "Minimum Temperature : " + data.forecastData.minTemp + " °C.";
                messageFour.textContent = "Maximum Temperature : " + data.forecastData.maxTemp + " °C.";
                messageFive.textContent = "There is a " + data.forecastData.precipProbability + "% chance of rain.";

                if (data.forecastData.precipProbability > 40) {
                    bodyElement.style.backgroundImage = "url('../img/rainy.jpg')";
                } else if (data.forecastData.currentTemp > 30) {
                    bodyElement.style.backgroundImage = "url('../img/sunny.jpg')";
                } else if (data.forecastData.currentTemp < 5) {
                    bodyElement.style.backgroundImage = "url('../img/snowy.jpg')";
                } else {
                    bodyElement.style.backgroundImage = "url('../img/cloudy.jpg')";
                }
            }
        });
    });
});
