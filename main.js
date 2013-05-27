var Events = require('github/jillix/events');

module.exports = function (config) {

    var self = this;
    var filter = {};

    function mergeCategoryFilter (data) {
        filter.category = data ? data.id : undefined;
        self.emit('filterChanged', filter);
    }

    function mergeSearchFilter (data) {

        // TODO move hardcoded filter keys to configuration
        delete filter['type'];

        for (var i in data) {
            switch (i) {
                case 'priceRange':
                    // priceRange is a 2-element array
                    filter.price = {
                        $gte: data[i][0],
                        $lte: data[i][1]
                    }
                    break;
                case 'type':
                    filter.type = data.type;
                    break;
            }
        }
        self.emit('filterChanged', filter);
    }

    self.mergeCategoryFilter = mergeCategoryFilter;
    self.mergeSearchFilter = mergeSearchFilter;

    Events.call(self, config);
};

