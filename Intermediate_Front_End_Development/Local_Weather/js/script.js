/**
 * Created by AndreiTic on 17/01/17.
 */
var weather;
$(document).ready(function () {
    weather = new Weather();
    weather.getWeather();

    $('#toggle-units').on('click', function () {
            weather.toggleUnits();
            $(this).html(weather.getDegreeUnits());
            weather.getWeather();
        }
    );
});

var Weather = function (){
  var units = 'metric';


  this.toggleUnits = function(){
    units = (units === 'metric') ? 'imperial':'metric';
  };

  this.getDegreeUnits = function(){
      return (units === 'metric') ? 'Fahrenheit':'Celsius';
  };

  this.getWeather = function(){
    getWeather(units);
  };

    function getWeather(units) {
        var longitude, latitude;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;

                var url = 'http://api.openweathermap.org/data/2.5/weather?' +
                    'lat=' + latitude +
                    '&lon=' + longitude +
                    '&units=' + units +
                    '&appid=5d8e878ce4229f91fb1d45d154cde7a2';

                $.getJSON(url, function (data) {
                    var unitDegree = (units == 'metric') ?  'celsius' : 'fahrenheit';
                    var unitSpeed = (units == 'metric') ?  'm/s' : 'mil/h';

                    $('#wi').addClass('wi-owm-' + data.weather[0].id);
                    $('#city').html(data.name);
                    $('#temp').html(data.main.temp + '<i class="wi wi-' + unitDegree + '">');
                    $('#temp_min').html(data.main.temp_min + '<i class="wi wi-' + unitDegree + '">');
                    $('#temp_max').html(data.main.temp_max + '<i class="wi wi-' + unitDegree + '">');

                    $('#cloudiness').html(data.clouds.all);
                    $('#wind_speed').html(data.wind.speed+unitSpeed);
                    $('#wind_direction').html(data.wind.deg + '° ' + '<i class="wi wi-wind towards-' + data.wind.deg + '-deg">');
                })
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }


};
