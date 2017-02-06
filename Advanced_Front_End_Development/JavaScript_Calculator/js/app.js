/**
 * Created by Andrei Ticala on 2017-02-01.
 */
$(document).ready(function () {
    var calc = [];

    $('.btn-default').on('click', function () {
        $('#calc').append(this.innerHTML);
        if (this != $('#equals'))
            calc.push(this.innerHTML);
    });

    $('#clear-all').on('click', function () {
        $('#calc').html('');
        $('#response').html('');
        calc = [];
    });
    $('#clear-element').on('click',function () {
        calc.pop();
        $('#calc').html(calc.toString());
    });

    $('#equals').on('click', function () {
        calc.pop();
        if (/\d/.test(calc[calc.length-1])) {
            var a = calc.join('');
            $('#response').html(eval(a));
            calc = [];
            $('#calc').html('');
        } else {
            $('#response').html('Error');
            $('#calc').html('');
            calc=[];
        }
    });

});
