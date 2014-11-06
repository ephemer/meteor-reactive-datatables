ReactiveDatatable = function (options, id) {
	// Use the base id they passed one in, otherwise default to 'datatable'
	var tableID = id || "datatable";    // TODO: don't allow default any more as it will
										//		 cause multiple instances to have 
										// 		 non-unique DOM ids
	if (tableID === "datatable"){
		// TODO: ssteinerX -- November 6, 2014
		//		 see if there's a way of getting the name of the parent template being
		//       rendered so we can point them directly at the right piece of code.
		console.log("reactive-datatable: Deprecation warning, must have unique 'id' in Template.yourtemplate.helpers");
	}

	// TODO: ss -- November 5, 2014
	//		 iterate through tableID_0...tableID_??
	//		 while( $("#tableID_??"));
	//		 tableID = tableID_??  // first one not alread in document
	//		 to make sure that we don't create duplicate IDs
	var self = this;

	this.options = options = _.defaults({
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
	}, options);

	// Help Blaze cleanly remove entire datatable when changing template / route by
	// wrapping table in existing element (#{{id}}_wrap) defined in the template.
	var table = document.createElement('table');
	table.id = tableID;
	table.className = "table dataTable";
	
	// Render the table element inside our wrapper and turn it into a DataTable
	// NOTE: DataTable uses tableID_wrapper so we use 'tableID_outside_wrapper' to 
	//		 avoid creating a duplicate ID
	var ourDivID = "#" + tableID + "_outside_wrapper";
	$(ourDivID).append(table);
	this.datatable = $(table).DataTable(options);

};

ReactiveDatatable.prototype.update = function (data){
	if(!data.length) return;
	var self = this;

	self.datatable
		.clear()
		.rows.add(data)
		.draw(false)
		.page(self.page || 0) // XXX: Can we avoid drawing twice?
		.draw(false);		  // I couldn't get the page drawing to work otherwise
};