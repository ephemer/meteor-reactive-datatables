ReactiveDatatable = function (options) {
	var tableID = "datatable";
	var self = this;

	this.options = options = _.defaults(options, {
		// Any of these can be overriden by passing an options 
		// object into your ReactiveDatatable template (see readme)
		stateSave: true,
		stateDuration: -1, // Store data for session only
		pageLength: 5,
		lengthMenu: [ 3, 5, 10, 50, 100 ],
		columnDefs: [{ // Global default blank value to avoid popup on missing data
			targets: "_all",
			defaultContent: "–––"
		}],

		stateLoadParams: function ( settings, data ){
			// Make it easy to change to the stored page on .update()
			self.page = data.start / data.length;
		}
	});

	// Help Blaze cleanly remove entire datatable when changing template / route by
	// wrapping table in existing element (#datatable_wrap) defined in the template.
	var table = document.createElement('table');
	table.id = tableID;
	table.className = "table dataTable";
	
	// Render the table element and turn it into a DataTable
	$("#datatable_wrapper").append(table);
	this.datatable = $(table).DataTable(options);

};

ReactiveDatatable.prototype.update = function (data){
	if (!data) return;
	var self = this;

	self.datatable
		.clear()
		.rows.add(data)
		.draw(false)
		.page(self.page || 0) // XXX: Can we avoid drawing twice?
		.draw(false);		  // I couldn't get the page drawing to work otherwise
};
