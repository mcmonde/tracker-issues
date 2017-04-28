humhub.module('tracker', function (module, require, $) {

    var client = require('client');

    var designateTag = function (evt) {
        client.submit(evt).then(
            function (resp) {
                "use strict";
                console.log(resp);
            }
        ).catch(function (e) {
            module.log.error(e, true);
        }).finally(function () {
            evt.finish();
        });
    };

    var stream = require('stream');

    var finishIssue = function (evt) {
        var entry = stream.getStream().entry(
            evt.$target.closest(".wall-entry").data('contentKey')
        );
        client.post(evt.url, {
            'data': {'IssueRequest[status]': 40},
            'dataType': 'html'
        }).then(function () {
            entry.reload();
        }).catch(function (err) {
            module.log.error(err, true);
        });
    };

    var modal = require('ui.modal');
    var getCreateForm = function (event) {
        var value = $('[name="space[]"]').val();
        if (value && value[0]) {
            event.url += '&sguid=' + value[0];
        } else {
            value = $('[name="u"]').val();
            event.url += '&uguid=' + value;
        }
        return modal.submit(event);
    };

    module.export({
        designateTag: designateTag,
        finishIssue: finishIssue,
        getCreateForm: getCreateForm
    });
});