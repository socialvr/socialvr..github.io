/**
 * Convrge VR Online library
 */

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var playersOnline = {};
var playersWatching = 0;
var soundOn = true;
var ogTitle;

var bindEvents = function () {
    $('#toggle-sound').on('click', toggleSound);
    $('#toggle-invert').on('click', toggleInvert);
};

var toggleInvert = function () {
    $('body').toggleClass('inverted');
};

var getNumPlayersOnline = function () {
    $.getJSON('/online/list', updateNumOnline);
};

var updateNumOnline = function (data) {
    console.log(data);

    checkForNewPlayers(data.playersOnline);

    updatePlayersOnline(data.playersOnline);
    updatePlayersWatching(data.playersWatching);
    updateTitle();
};

var checkForNewPlayers = function (curPlayersOnline) {
    for (var key in curPlayersOnline)
    {
        if (!playersOnline[key] && soundOn)
        {
            playJoinedSound();
            return;
        }
    }
};

var updatePlayersOnline = function (_playersOnline) {

    playersOnline = _playersOnline;

    var names = '';
    var i = 0;
    for (var key in playersOnline)
    {
        if (i != 0)
        {
            names += ' | ' + playersOnline[key];
        }
        else
        {
            names += playersOnline[key];
        }
        i++;
    }

    if (i == 0)
    {
        $('.player-names-container').hide();
    }
    else
    {
        $('.player-names-container').text(names);
        $('.player-names-container').show();
    }

    $('#num-players').text(Object.size(playersOnline));
};

var updatePlayersWatching = function (_playersWatching) {
    playersWatching = _playersWatching;

    if (playersWatching == 0)
    {
        $('.players-watching-container').hide();
    }
    else
    {
        $('.players-watching').text(playersWatching);
        $('.players-watching-container').show();
    }
};

var playJoinedSound = function () {
    $('#joined-audio')[0].play()
};

var toggleSound = function () {
    soundOn = !soundOn;

    if (soundOn) {
        $('#toggle-sound .btn-text').text('Sound is on');
        $('.glyphicon-volume-up').show();
        $('.glyphicon-volume-off').hide();
        $('.sound-prompt').show();
    }
    else
    {
        $('#toggle-sound .btn-text').text('Sound is off');
        $('.glyphicon-volume-off').show();
        $('.glyphicon-volume-up').hide();
        $('.sound-prompt').hide();
    }
};

var updateTitle = function () {
    $('title').text(Object.size(playersOnline) + ' - ' + ogTitle);
};

$(document).ready(function () {
    ogTitle = $('title').text();
    bindEvents();
    getNumPlayersOnline();
    setInterval(getNumPlayersOnline, 10000);
    $('.player-names-container').hide();
});