const apiKey = "8f426cdc3eb119ec2f5d4da97189d603";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

var citynameInput = document.getElementById("search");
var searchButton = document.getElementById("searchImg");
var darkMode = document.getElementById("darkmode");
var weatherPhoto = document.getElementById("img2");

const changeTheme = () => {
    var darkTheme = document.querySelector("body")

    if (darkMode.textContent == "Dark mode") {
        darkMode.textContent = "default";
        darkTheme.style.backgroundColor = "black";
    }

    else if (darkMode.textContent == "default") {
        darkMode.textContent = "Dark mode";
        darkTheme.style.backgroundColor = "white";
    }
}


const weatherdetails = async (city) => {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.getElementById("errormessage").style.display = "block";
        document.getElementById("showmode").style.display = "none";
    }
    else {
        document.getElementById("errormessage").style.display = "none";

        var data = await response.json();
        var citySelect = document.querySelector("#city");
        citySelect.innerHTML = data.name;

        var cityDegree = document.querySelector("#celcius");
        cityDegree.innerHTML = Math.round(data.main.temp) + "°C";

        var cityHumidity = document.querySelector("#humidity_Id");
        cityHumidity.innerHTML = Math.round(data.main.humidity) + "%";

        var citywind = document.querySelector("#wind_speed_Id");
        citywind.innerHTML = Math.round(data.wind.speed) + "km/h";

        document.getElementById("showmode").style.display = "block";

        if (data.weather[0].main == "Mist") {
            weatherPhoto.src = "./images/fogy.jpg"
        }
        else if (data.weather[0].main == "Clouds") {
            weatherPhoto.src = "./images/cloud.jpg"
        }
        else if (data.weather[0].main == "Rain") {
            weatherPhoto.src = "./images/rainy.jpeg"
        }
        else if (data.weather[0].main == "Clear") {
            weatherPhoto.src = "./images/sunny.jpeg"
        }
        else if (data.weather[0].main == "Drizzel") {
            weatherPhoto.src = "./images/drizzel.jpg"
        }

    }
};
searchButton.addEventListener("click", () => { weatherdetails(citynameInput.value) });
darkMode.addEventListener("click", changeTheme);
