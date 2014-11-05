Template.ReactiveDatatable.rendered = function () {
	var data = this.data;
	console.log("in rd.rendered");
	console.log(data);
    var datatable = new ReactiveDatatable(data.options, data.id);
    this.autorun(function(){
        datatable.update(data.tableData());
    });
};