/**
 * Created by Andrei Ticala on 2017-02-01.
 */
$(document).ready(function () {
    var calc = [];

    $('.number').on('click', function () {
        $('.screen-calc p').append(this.value);
        calc.push(this.value);
        console.log(calc.toString());
    });

    $('.equals-btn').on('click', function () {
        doMath();
    });

    $('#allClear').on('click', function () {
        calc = [];
        $('.screen-calc p').html('');
    });

    $('.operator').on('click', function () {

    });

});

function doMath() {
    alert('a');
}