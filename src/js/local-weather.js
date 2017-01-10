var localWeather = (function($) {
    var temperature = 0;
    var apiKey = 'ac6ddc9daa54317b3f571c9238e0006a';
    var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
    var currentWeather;

    function getWeather(longitude, latitude) {
        var url = baseUrl += 'lat=' + latitude + "&lon=" + longitude + "&APPID=" + apiKey;
        $.ajax({
            url: url,
            type: "GET",
            async: false,
            success: function (data) {
                currentWeather = data;
                temperature = data.main.temp;
            }
        });
    };

    function getLocalWeather() {
        var latitude;
        var longitude;
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(function (position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
            });
        }
        getWeather(longitude, latitude);
    }

    function init() {
        getLocalWeather();
    }

    return {
        init: init,
        getLocalWeather: getLocalWeather
    }
})(jQuery);