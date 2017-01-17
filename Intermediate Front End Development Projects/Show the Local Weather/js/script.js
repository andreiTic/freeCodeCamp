/**
 * Created by AndreiTic on 17/01/17.
 */
$(document).ready(function () {
    var longitude;
    var latitude;
    var units = 'metric';

    $('#toggle-units').on('click', function () {
            var unitsBtn = $('#toggle-units');
            units = unitsBtn.attr('data-toggle');
            if (units == 'imperial') {
                unitsBtn.attr('data-toggle', 'metric').html('Celsius');
            } else {
                unitsBtn.attr('data-toggle', 'imperial').html('Fahrenheit');
            }
        }
    );

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
                $('#wi').addClass('wi-owm-'+data.weather[0].id);
                $('#city').append(data.name);
                $('#temp').prepend(data.main.temp);
                $('#temp_min').prepend(data.main.temp_min);
                $('#temp_max').prepend(data.main.temp_max);
                $('#cloudiness').append(data.clouds.all);
                $('#wind_speed').append(data.wind.speed);
                $('#wind_direction').prepend(data.wind.deg+'° ');
                $('#wind_deg').addClass('towards-'+data.wind.deg+'-deg');

            })
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }


});
