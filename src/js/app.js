var app = angular.module('LocalWeather', []);

app.factory('localWeatherService', [
    '$http', function ($http) {
        var apiKey = 'ac6ddc9daa54317b3f571c9238e0006a';
        var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?';
        var latitude = 0;
        var longitude = 0;

        function getCoords() {
            if (window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(function (position) {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                });
            }
        }

        function formUrl() {
            return apiUrl += 'lat=' + latitude + "&lon=" + longitude + "&APPID=" + apiKey;
        }

        return {
            getLocalWeather: function (successCallback) {
                getCoords();
                var url = formUrl();
                $http.get(url).success(successCallback);
            }
        }
    }
]);

app.controller('LocalWeatherController', [
    '$scope', 'localWeatherService', function ($scope, localWeatherService) {
        $scope.weatherObj = {};

        $scope.temperature = 0;
        $scope.city = '';
        $scope.country = '';

        localWeatherService.getLocalWeather(onSuccess);

        function onSuccess(data) {
            $scope.weatherObj = data;
        }
    }
]);
