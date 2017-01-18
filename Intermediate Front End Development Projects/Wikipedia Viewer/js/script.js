/**
 * Created by andrei on 17/01/17.
 */
$(document).ready(function () {
    $('#search-btn').on('click', function () {
        $('#results').empty();
        searchWiki();
    });
    $('#search-input').keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
            searchWiki();
        }
    });
});

function searchWiki() {
    var keywords = $('#search-input').val();

    var url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' +
        keywords;

    $.getJSON(url, function (response) {
        var resultsList = response.query.search;

        for ( var result in resultsList) {
            var title = resultsList[result].title;
            var description = resultsList[result].snippet;
            $('#results').append('<div class="panel panel-default">' +
                '<div class="panel-heading">' +
                '<h3 class="panel-title"><a href="https://en.wikipedia.org/wiki/'+title+'">'+title+'</a></h3>' +
                '</div>' +
                '<div class="panel-body">' +
                description +
                '</div>' +
                '</div>');
        }
    });
}