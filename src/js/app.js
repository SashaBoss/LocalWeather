var app = angular.module('LocalWeather', []);

var apiKey = 'ac6ddc9daa54317b3f571c9238e0006a';
var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?';

app.controller('LocalWeatherController', [
    '$scope', '$http', '$window', function ($scope, $http, $window) {
        $scope.isCelsius = false;

        $scope.temperature = 0;
        $scope.humidity = 0;
        $scope.pressure = 0;
        
        $scope.city = '';

        $scope.weatherDescription = '';
        $scope.icon = '';

        $scope.latitude = 48.464717;
        $scope.longitude = 35.046183;

        $scope.getLocalWeather = function () {
            if ($window.navigator.geolocation) {
                $window.navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.latitude = position.coords.latitude;
                    $scope.longitude = position.coords.longitude;
                });
            }
            var url = createUrl($scope.latitude, $scope.longitude);
            $http.get(url).then(parseData, onError);
        }

        $scope.toggleTemperature = function() {
            if ($scope.isCelsius) {
                $scope.temperature = fromCelsiusToFahrengheit($scope.temperature);
            } else {
                $scope.temperature = fromFahrengeightToCelsium($scope.temperature);
            }
            $scope.isCelsius = !$scope.isCelsius;
        }

        function parseData(response) {
            $scope.city = response.data.name;
            $scope.temperature = fromKelvinsToCelsium(response.data.main.temp);
            $scope.humidity = response.data.main.humidity;
            $scope.pressure = response.data.main.pressure;
            $scope.weatherDescription = response.data.weather[0].description;
            $scope.isCelsius = true;
        }

        function onError(errorData) {
            console.log(errorData);
        }

        function createUrl(latitude, longitude) {
            return  apiUrl + 'lat=' + latitude + "&lon=" + longitude + "&APPID=" + apiKey;
        }

        function fromKelvinsToCelsium(kelvins) {
            return kelvins - 273.15;
        }

        function fromCelsiusToFahrengheit(celsius) {
            return ((9 * celsius)/5 + 32).toFixed(2);
        }

        function fromFahrengeightToCelsium(fahrs) {
            return ((5 / 9) * (fahrs - 32)).toFixed(2);
        }
    }
]);
