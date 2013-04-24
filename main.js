var Events = require('github/adioo/events');

module.exports = function (config) {

    var self = this;
    var filter = {};

    function mergeCategoryFilter (data) {
        filter.category = data.id;
        self.emit('filterChanged', filter);
    }

    function mergeSearchFilter(data) {
        // TODO
    }

    self.mergeCategoryFilter = mergeCategoryFilter;

    Events.call(self, config);
};

