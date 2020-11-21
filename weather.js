var searchBox=document.querySelector('.inputBox');
var temp=document.querySelector('.temp');
var city=document.querySelector('.city');
var dates=document.querySelector('.date');
var weather=document.querySelector('.weather');
var hi_low=document.querySelector('.hi-low');
var wind=document.querySelector('.wind');
var body=document.querySelector("body");
var time=document.querySelector(".time")

const api={
    key:"cf797e7e895a395a631e1542cb0c9f8d",
    baseUrl:"https://api.openweathermap.org/data/2.5/"
}

searchBox.addEventListener('keypress',startQuery);

function startQuery(event){
    if(event.charCode === 13){
        getWeatherData(searchBox.value);
    }
}

function getWeatherData(query){
    fetch(`${api.baseUrl}weather?q=${query}&appid=${api.key}`)
    .then(weather => weather.json())
    .then(data=> {
        console.log(data);
        displayWeatherData(data)
    } )
}


function displayWeatherData(data){
    city.innerHTML=`${data.name} , ${data.sys.country}`;

    var date=new Date();
    var formattedDate=formatDate(date);
    dates.innerHTML=formattedDate;


    temp.innerText=`${Math.round(data.main.temp-273.15)}°c`

    weather.innerHTML=`${data.weather[0].main}`

    hi_low.innerHTML=`${Math.round(data.main.temp_min-273.15)}°c / ${Math.round(data.main.temp_max-273.15)}°c`

    wind.innerHTML=`Wind: ${data.wind.speed} km/h `

    var backgroundImage=weatherImage(data.weather[0].icon);
    console.log(backgroundImage)
  
    body.setAttribute('background',backgroundImage);

}

function formatDate(d){
    var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    var day=days[d.getDay()];
    var date=d.getDate();
    var month=months[d.getMonth()];
    var year=d.getFullYear();
    return `${day} ${date} ${month} ${year}`
}


function weatherImage(weatherIcon){
    var weather="";
    switch(parseInt(weatherIcon)){
        case 1:weather+="clear sky ";
                break;
        case 2:
        case 3:
        case 4:weather+="few clouds ";
                break;
        case 9:
        case 10:weather+="rain ";
                break;
        case 11:weather+="thunder storm ";
                break;
        case 13:weather+="snow ";
                break;
        case 50:weather+="mist ";
                break;
        default:weather+="few clouds ";
                break;
    }

    if(weatherIcon.endsWith("n")){
        weather+="night";
    }else if(weatherIcon.endsWith("d")){
        weather+="day";
    }

    return "./images/"+weather+".jpg";
}