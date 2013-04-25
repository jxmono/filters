var Events = require('github/jillix/events');

module.exports = function (config) {

    var self = this;
    var filter = {};

    function mergeCategoryFilter (data) {
        filter.category = data ? data.id : undefined;
        self.emit('filterChanged', filter);
    }

    function mergeSearchFilter (data) {
        // TODO
        self.emit('filterChanged', filter);
    }

    self.mergeCategoryFilter = mergeCategoryFilter;
    self.mergeSearchFilter = mergeSearchFilter;

    Events.call(self, config);
};

