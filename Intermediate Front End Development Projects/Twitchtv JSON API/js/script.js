$(document).ready(function () {
    checkOnlineChannels();
});

var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
function checkOnlineChannels() {

    for (var i = 0; i < channels.length; i++) {
        getStreamData(channels[i]);
    }
}

function getStreamData(channel) {
    var url = 'https://wind-bow.gomix.me/twitch-api/streams/' + channel;

    $.getJSON(url, function (response) {
        if (response.stream == null) {
            offlineStraems(channel);
        } else {
            onlineStream(response);
        }
    });
}

function offlineStraems(channel) {
    var url = 'https://wind-bow.gomix.me/twitch-api/channels/' + channel;

    $.getJSON(url, function (response) {
        var channelName = response.display_name;
        var logoURL = response.logo;
        var channelURL = response.url;

        addPanel('offline', channelName, logoURL, channelURL);
        addPanel('all', channelName, logoURL, channelURL);
    });
}

function onlineStream(stream) {
    var logoURL = stream.stream.channel.logo;
    var channelName = stream.stream.channel.display_name;
    var game = stream.stream.channel.game;
    var channelURL = stream.stream.channel.url;
    var desc = stream.stream.channel.status;
    var viewers = stream.stream.viewers;

    addPanel('online', channelName, logoURL, channelURL, game, desc, viewers);
    addPanel('all', channelName, logoURL, channelURL, game, desc, viewers);
}

function addPanel(tag, channelName, logoURL, channelURL, game, desc, viewers) {

    var panel = '<div class="panel panel-default">' +
        '<div class="panel-heading">' +
        '<h3 class="panel-title">' + channelName + '</h3>' +
        '</div>' +
        '<div class="panel-body">' +
        '<div class="col-sm-2">' +
        '<img class="img-thumbnail img-responsive" src="' + logoURL + '">' +
        '</div>' +
        '<div class="col-sm-9">';

    if (game) {
        panel +=
            '<ul class="list-group">' +
            '<li class="list-group-item" id="game"><strong>Game : </strong>' + game + '</li>' +
            '<li class="list-group-item" id="desc"><strong>Description : </strong>' + desc + '</li>' +
            '<li class="list-group-item" id="viewers"><strong>Viewers : </strong>' + viewers + '</li>' +
            '</ul>'
    }else{
        panel += '<p>Offline</p>';
    }

    panel +=
        '</div>' +
        '<div class="col-sm-1">' +
        '<a class="btn btn-primary" href="' + channelURL + '">View </a>' +
        '</div>' +
        '</div>' +
        '</div>';
    $('#' + tag).append(panel);
}