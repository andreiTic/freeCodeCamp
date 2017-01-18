/**
 * Created by AndreiTic on 17/01/17.
 */
$(document).ready(function () {

    var units = 'metric';
    getWeather(units);
    $('#toggle-units').on('click', function () {
            var unitsBtn = $('#toggle-units');
            units = unitsBtn.attr('data-toggle');
            if (units == 'imperial') {
                unitsBtn.attr('data-toggle', 'metric').html('Celsius');
            } else {
                unitsBtn.attr('data-toggle', 'imperial').html('Fahrenheit');
            }
            getWeather(unitsBtn.attr('data-toggle'));
        }
    );
});
function getWeather(units) {
    var longitude;
    var latitude;

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
                (units == 'metric')? unit = 'celsius' :  unit = 'fahrenheit';

                $('#wi').addClass('wi-owm-' + data.weather[0].id);
                $('#city').append(data.name);
                $('#temp').html(data.main.temp+'<i class="wi wi-'+unit+'">');
                $('#temp_min').html(data.main.temp_min+'<i class="wi wi-'+unit+'">');
                $('#temp_max').html(data.main.temp_max+'<i class="wi wi-'+unit+'">');

                $('#cloudiness').append(data.clouds.all);
                $('#wind_speed').append(data.wind.speed);
                $('#wind_direction').prepend(data.wind.deg + '° ');
                $('#wind_deg').addClass('towards-' + data.wind.deg + '-deg');

            })
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
