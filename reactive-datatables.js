ReactiveDatatable = function(options) {
	var self = this;

	this.options = options = _.defaults(options, {
		// Any of these can be overriden by passing an options
		// object into your ReactiveDatatable template (see readme)
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
		},
		// rowId must be set in order to find the changed / appended row(s)
		rowId: false
	});
};

ReactiveDatatable.prototype.update = function(data) {
	if (!data) return;
	var self = this;

	if (self.options.rowId) {
		// find the data difference
		var dataDifference = self.dataDifference(data, self.datatable.rows().data().toArray());

		if (dataDifference.length > 0) {

			dataDifference.forEach(function(dataItem) {
				var index = self.datatable.row('#' + dataItem._id);
				if (index.length > 0) {
					// we have that row, update it
					self.datatable.row(index[0]).data(dataItem).invalidate();
				} else {
					// we don't have it, add the row to datatable
					self.datatable.row.add(dataItem);
				}
			});

		} else {
			// Data initializing or we have the same data
			self.datatable.rows.add(data);
		}
		self.datatable.draw(false);

	} else {

		// rowId was not set, so we have to use the old method - update the whole table
		self.datatable
			.clear()
			.rows.add(data)
			.draw(false)
			.page(self.page || 0) // XXX: Can we avoid drawing twice?
			.draw(false); // I couldn't get the page drawing to work otherwise

	} // do we have rowId?

};