/**
 * Created by andrei on 17/01/17.
 */
$(document).ready(function () {
    $('#quoteBtn').on('click', function () {
        var lang = $('select').val();
        var url = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang='+lang+'&jsonp=?';
        $.getJSON(url, function (json) {
            $('p').html(JSON.stringify(json.quoteText));
            $('cite').html(JSON.stringify(json.quoteAuthor));
        }, 'jsonp');
    });
});