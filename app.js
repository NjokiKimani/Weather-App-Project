let apiKey = "d1bfa8b608cc07b251c544946b2756ed";
let city = "Tacoma";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;



function showTemperature(response){
console.log(response.data);
let dateElement = document.querySelector('.date');
dateElement.innerHTML = formatDay(response.data.dt * 1000);
let timeElement = document.querySelector(".time");
timeElement.innerHTML = formatTime();

}
axios.get(apiUrl).then(showTemperature);


function formatDay(dateStamp){
    let date = new Date(dateStamp);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let day = days[date.getDay()];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[date.getMonth()];
    let today = date. getDate();

    return`${day}, ${month} ${today}`;
}

function formatTime(){
    let date = new Date();
let hour = date.getHours();
let minutes = date.getMinutes();
if(minutes<10){
return `${hour}:0${minutes}`;
}
else{
    return `${hour}:${minutes}`;
}
}
formatTime();