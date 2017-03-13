'use strict';

function roundToThreeDp(num) {
    return parseFloat(num.toFixed(3));
}

function updateNumScalePossibleValues(questionNum) {
    var min = parseInt($('#minScaleBox-' + questionNum).val(), 10);
    var max = parseInt($('#maxScaleBox-' + questionNum).val(), 10);
    var step = parseFloat($('#stepBox-' + questionNum).val());

    if (max <= min) {
        max = min + 1;
        $('#maxScaleBox-' + questionNum).val(max);
    }

    step = roundToThreeDp(step);
    if (step === 0) {
        step = 0.001;
    }

    var $stepBox = $('#stepBox-' + questionNum);
    $stepBox.val(isNaN(step) ? '' : step);

    var possibleValuesCount = Math.floor(roundToThreeDp((max - min) / step)) + 1;
    var largestValueInRange = min + (possibleValuesCount - 1) * step;
    var $numScalePossibleValues = $('#numScalePossibleValues-' + questionNum);
    var possibleValuesString = void 0;
    if (roundToThreeDp(largestValueInRange) !== max) {
        $numScalePossibleValues.css('color', 'red');

        if (isNaN(min) || isNaN(max) || isNaN(step)) {
            possibleValuesString = '[Please enter valid numbers for all the options.]';
        } else {
            possibleValuesString = '[The interval ' + min.toString() + ' - ' + max.toString() + ' is not divisible by the specified increment.]';
        }

        $numScalePossibleValues.text(possibleValuesString);
        return false;
    }
    $numScalePossibleValues.css('color', 'black');
    possibleValuesString = '[Based on the above settings, acceptable responses are: ';

    // step is 3 d.p. at most, so round it after * 1000.
    if (possibleValuesCount > 6) {
        possibleValuesString += min.toString() + ', ' + (Math.round((min + step) * 1000) / 1000).toString() + ', ' + (Math.round((min + 2 * step) * 1000) / 1000).toString() + ', ..., ' + (Math.round((max - 2 * step) * 1000) / 1000).toString() + ', ' + (Math.round((max - step) * 1000) / 1000).toString() + ', ' + max.toString();
    } else {
        possibleValuesString += min.toString();
        var cur = min + step;
        while (max - cur >= -1e-9) {
            possibleValuesString += ', ' + (Math.round(cur * 1000) / 1000).toString();
            cur += step;
        }
    }

    possibleValuesString += ']';
    $numScalePossibleValues.text(possibleValuesString);
    return true;
}