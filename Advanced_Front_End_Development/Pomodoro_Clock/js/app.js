/**
 * Created by andrei on 07/02/17.
 */

$(document).ready(newClock());
var clock;
var currentStatus;

function newClock(time, autoStart, status) {

    var isAutoStart = autoStart || false;
    var mode = status || "session";
    var timeInSec = time || Number($("input[name*='session']").val());

    currentStatus = mode;

    clock = $('.clock').FlipClock(timeInSec, {
        clockFace: 'MinuteCounter',
        countdown: true,
        autoStart: isAutoStart,
        callbacks: {
            start: function () {
                activeStatus();
            },
            stop: function () {
                if (clock.getTime().time == 0)
                    endInterval(mode);
            },
            interval: function () {
                var time = $("input[name*='" + mode + "']").val() * 60;
                var currentTime = time - clock.getTime().time;
                var percentage = (currentTime * 100) / time;

                $(".progress-bar").width(percentage + '%').at;
            }
        }
    })
}

function endInterval(interval) {

    var newTime;
    var status;

    if (interval === "session") {
        newTime = Number($("input[name*='break']").val()) * 60;
        status = "break";
    } else {
        newTime = Number($("input[name*='break']").val()) * 60;
        status = "session";
    }

    newClock(newTime, true, status);
}

function changeTime(currentTime) {

    var time = currentTime * 60;
    newClock(time, false, currentStatus);
}


function activeStatus() {
    if (currentStatus === "session") {
        $("#status").html("Session");
    } else {
        $("#status").html("Break");
    }
}

$('.btn-number').click(function (e) {
    e.preventDefault();
    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type == 'minus') {

            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
                changeTime(currentVal);
            }

            if (parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if (type == 'plus') {

            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
                changeTime(currentVal);
            }
            if (parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});

$('.input-number').focusin(function () {
    $(this).data('oldValue', $(this).val());
});

$("#start").on('click', function () {
    $("input[name*='break']").attr('disabled', true);
    $("input[name*='session']").val(25);
    clock.start();
});

$("#stop").on('click', function () {
    clock.stop();
});

$("#reset").on('click', function () {
    $("input[name*='break']").val(5);
    $("input[name*='session']").val(25);
    newClock();
});

