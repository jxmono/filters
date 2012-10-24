define(function() {

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

        // for each module instance I listen to
        for (var miid in config.listen) {
            var miidEvents = config.listen[miid];
            // for each event for this instance
            for (var name in miidEvents) {
                var handler = miidEvents[name];
                // if the handler is a module function name
                if (typeof handler === "string" && typeof self[handler] === "function") {
                    self.on(name, miid, function(data) {
                        self[handler].call(self, data);
                    });
                    continue;
                }
                // else it must be object
                if (handler instanceof Object) {
                    // TODO
                }
            }
        }
    }

    return init;
});

