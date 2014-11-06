Template.ReactiveDatatable.rendered = function () {
	var data = this.data;
    var datatable = new ReactiveDatatable(data.options, data.id);
    this.autorun(function(){
    	if (typeof data.tableData === "function"){
    		console.log("Deprecation warning: tableData should not be a function, it should be the return value of the function that retrieves your data.");
	        datatable.update(data.tableData());
	    }
	    else{
	    	datatable.update(data.tableData);
	    }
    });
};