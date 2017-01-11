var app = angular.module('LocalWeather', []);

var apiKey = 'ac6ddc9daa54317b3f571c9238e0006a';
var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?';

app.controller('LocalWeatherController', [
    '$scope', '$http', '$window', function ($scope, $http, $window) {
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
            
        }

        function parseData(response) {
            $scope.city = response.data.name;
            $scope.temperature = response.data.main.temp;
            $scope.humidity = response.data.main.humidity;
            $scope.pressure = response.data.main.pressure;
            $scope.weatherDescription = response.data.weather[0].description;
        }

        function onError(errorData) {
            console.log(errorData);
        }

        function createUrl(latitude, longitude) {
            return  apiUrl + 'lat=' + latitude + "&lon=" + longitude + "&APPID=" + apiKey;
        }
    }
]);
