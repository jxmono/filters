var Events = require("github/jillix/events");

module.exports = function (config) {

    var self = this;
    var filter = {};

    function mergeCategoryFilter (data) {
        // TODO the following logic is vulnerable when id === 0
        var oldCat = filter.category;
        var newCat = data ? data.id : undefined;
        if (oldCat !== newCat) {
            if (newCat) {
                filter.category = newCat;
            } else {
                delete filter.category;
            }
            self.emit("filterChanged", filter);
        }
    }

    function mergeSearchFilter (data) {

        // TODO move hardcoded filter keys to configuration
        delete filter["type"];

        for (var i in data) {
            switch (i) {
                case "priceRange":
                    // priceRange is a 2-element array
                    filter.price = {
                        $gte: data[i][0] * 100,
                        $lte: data[i][1] * 100
                    }
                    break;
                case "type":
                    filter.type = data.type;
                    break;
                case "text":
                    if (!data.text) {
                        delete filter.description;
                    } else {
                        filter.description = { $regex : ".*" + data.text.split(" ").join(".*") + ".*", $options: "i" } ;
                    }
                    break;
            }
        }
        self.emit("filterChanged", filter);
    }

    function clearFilters () {
        filter = {};
        self.emit("filterChanged", filter);
    }

    self.mergeCategoryFilter = mergeCategoryFilter;
    self.mergeSearchFilter = mergeSearchFilter;
    self.clearFilters = clearFilters;

    Events.call(self, config);
};

