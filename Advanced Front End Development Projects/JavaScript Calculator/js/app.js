/**
 * Created by Andrei Ticala on 2017-02-01.
 */

$(document).ready(function () {
    $('button').on('click',function () {
        $('.screen-calc p').append(this.value);
    });
});