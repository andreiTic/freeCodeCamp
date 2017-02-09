/**
 * Created by andrei on 07/02/17.
 */
$(document).ready(function () {
// Instantiate a counter
    clock = new FlipClock($('.clock'), 1, {
        clockFace: 'MinuteCounter',
        autoStart: false,
        countdown: true,
        callbacks: {
            interval: function() {
                var time = this.factory.getTime().time;

                if(time == 0) {

                }
            }
        }
    });

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
                }

                if (parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }

            } else if (type == 'plus') {

                if (currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
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
        clock.start();
    });

    $("#stop").on('click', function () {
        clock.stop();
    });

    $("#reset").on('click', function () {
        clock.setTime(1500);
    });
});
