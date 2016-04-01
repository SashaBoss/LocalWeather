document.addEventListener("DOMContentLoaded", function() {
    var latitude = 0;
    var longitude = 0;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        });
    }

    var res = getWeather(longitude, latitude);
    console.log(res);
});

var getWeather = function(longitude, latitude) {
    var temperature = 0;
    var apiKey = 'ac6ddc9daa54317b3f571c9238e0006a';
    var url = 'http://api.openweathermap.org/data/2.5/weather?';
    url += 'lat=' + latitude + "&lon=" + longitude + "&APPID=" + apiKey;
    jQuery.ajax({
        url: url,
        type: "GET",
        async: false,
        success: function(data) {
            console.log(data);
            temperature = data.main.temp;
            console.log(temperature);
        }
    });
    console.log("Berfore return =" + temperature);
    return temperature;
};