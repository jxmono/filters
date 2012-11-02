define(["github/adioo/events/v0.1.0/events"], function(Events) {

    var self = null;

    var filter = {};

    function mergeCategoryFilter(data) {
        filter.category = data.id;
        self.emit("filterChanged", filter);
    }

    function mergeSearchFilter(data) {
        // TODO
    }

    function init(config) {

        self = this;

        self.mergeCategoryFilter = mergeCategoryFilter;

        Events.call(self, config);
    }

    return init;
});

