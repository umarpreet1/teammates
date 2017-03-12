'use strict';

(function() {

    $.getJSON(window.location.origin + '/js/developers.json', function(data) {

        $.each(data.contributors, function(i, contributor) {
            var $div = contributor.multiple ? $('#contributors-multiple') : $('#contributors-single');
            $div.append(
                '<li>'
                + (contributor.username ? getGitHubLink(contributor.username, contributor.name) : contributor.name)
                + '</li>'
            );
        });

        $.each(data.committers, function(i, committer) {
            var $div = committer.endPeriod ? $('#committers-past') : $('#committers-current');
            $div.append(
                '<li>'
                + getGitHubLink(committer.username, committer.name)
                + ' (' + committer.startPeriod + ' - ' + (committer.endPeriod ? committer.endPeriod : '') + ')'
                + '</li>'
            );
        });

        $.each(data.teammembers, function(i, teammember) {
            if (teammember.currentPosition) {
                $('#teammembers-current').append(
                    '<li>'
                    + '<div class="row margin-top-7px">'
                        + '<div class="col-xs-8 col-xs-offset-2 col-sm-5 col-sm-offset-0 col-md-4 col-lg-3">'
                            + '<img class="img-responsive" src="' + teammember.image + '" alt="' + teammember.name + '">'
                        + '</div>'
                        + '<div class="col-xs-10 col-xs-offset-1 col-sm-7 col-sm-offset-0 col-md-8 margin-top-7px">'
                            + getLinkToUrl(teammember.url, teammember.name) + '<br><br>'
                            + '<strong>' + teammember.currentPosition + '</strong>'
                            + listDownPastPositions(teammember.pastPositions)
                        + '</div>'
                    + '</div>'
                    + '</li>'
                );
            } else {
                $('#teammembers-past').append(
                    '<li>'
                    + (teammember.image ? '<img src="' + teammember.image + '" '
                        + 'alt="' + teammember.name + '" width="120px"><br>' : '')
                    + (teammember.url ? getLinkToUrl(teammember.url, teammember.name) : teammember.name)
                    + listDownPastPositions(teammember.pastPositions)
                    + '</li>'
                );
            }
        });

    });

    function listDownPastPositions(pastPositions) {
        if (!pastPositions) {
            return '';
        }
        if (typeof pastPositions === 'object') {
            return '<br>' + pastPositions.join('<br>');
        }
        return ' (' + pastPositions + ')';
    }

    function getGitHubLink(username, name) {
        return getLinkToUrl('https://github.com/' + username, name);
    }

    function getLinkToUrl(url, name) {
        return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + name + '</a>';
    }

})();
