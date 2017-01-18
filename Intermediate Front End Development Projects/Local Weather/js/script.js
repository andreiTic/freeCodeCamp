/**
 * Created by AndreiTic on 17/01/17.
 */
$(document).ready(function () {
    var units = 'metric';
    getWeather(units);

    $('#toggle-units').on('click', function () {
            units = $(this).attr('data-toggle');
            if (units === 'imperial') {
                getWeather('metric');
                $(this).attr('data-toggle', 'metric').html('Fahrenheit');
            } else {
                getWeather('imperial');
                $(this).attr('data-toggle', 'imperial').html('Celsius');
            }
        }
    );
});

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
                var unit;

                (units == 'metric') ? unit = 'celsius' : unit = 'fahrenheit';
                $('#wi').addClass('wi-owm-' + data.weather[0].id);
                $('#city').html(data.name);
                $('#temp').html(data.main.temp + '<i class="wi wi-' + unit + '">');
                $('#temp_min').html(data.main.temp_min + '<i class="wi wi-' + unit + '">');
                $('#temp_max').html(data.main.temp_max + '<i class="wi wi-' + unit + '">');

                $('#cloudiness').html(data.clouds.all);
                (units == 'metric') ? unit = 'm/s' : unit = 'mil/h';
                $('#wind_speed').html(data.wind.speed+unit);
                $('#wind_direction').html(data.wind.deg + '° ' + '<i class="wi wi-wind towards-' + data.wind.deg + '-deg">');
            })
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
