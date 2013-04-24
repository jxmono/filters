var Events = require('github/adioo/events');

module.exports = function (config) {

    var self = this;
    var filter = {};

    function mergeCategoryFilter (data) {
        filter.category = data.id;
        filter.category = data ? data.id : undefined;
    }

    function mergeSearchFilter(data) {
        // TODO
    }

    self.mergeCategoryFilter = mergeCategoryFilter;

    Events.call(self, config);
};

