ReactiveDatatable = function(options) {
    var self = this;

    this.options = options = _.defaults(options, {
        // Any of these can be overriden by passing an options
        // object into your ReactiveDatatable template (see readme)
        // rowId must be set in order to find the changed / appended row(s)
        rowId: '_id',
        stateSave: true,
        stateDuration: -1, // Store data for session only
        pageLength: 5,
        lengthMenu: [3, 5, 10, 50, 100],
        columnDefs: [{ // Global default blank value to avoid popup on missing data
            targets: '_all',
            defaultContent: '–––'
        }],
        stateLoadParams: function(settings, data) {
            // Make it easy to change to the stored page on .update()
            self.page = data.start / data.length;
        }
    });
};

ReactiveDatatable.prototype.update = function(data) {
    if (!data) return;
    var self = this;

    var existingData = self.datatable.rows().data().toArray();
    var dataDifference = self.difference(existingData, data);

    if (data.length > existingData.length) {
        /**
         * ADD ROW
         */
        // console.log("//////////// ADD //////////////");
        dataDifference.forEach(function(dataItem) {

            var index = self.datatable.row('#' + dataItem._id);

            if (index.length > 0) {
                self.datatable.row(index[0]).data(dataItem).invalidate();
            } else {
                self.datatable.row.add(dataItem);
            }

        });

    } else if (data.length < existingData.length) {
        /**
         * REMOVE ROW
         */
        // console.log("//////////// REMOVE //////////////");
        dataDifference.forEach(function(dataItem) {
            var index = self.datatable.row('#' + dataItem._id);
            self.datatable.row('#' + dataItem._id).remove();
        });
    } else if (!existingData.length) {
        /**
         * INITIALIZE
         */
        // console.log("//////////// INIT //////////////");
        // Data initializing or we have the same data
        self.datatable.rows.add(data);
    }
    self.datatable.draw(false);
};