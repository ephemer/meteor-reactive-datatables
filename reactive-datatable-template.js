Template.ReactiveDatatable.rendered = function () {
	var data = this.data;
	var options = typeof data.options === 'function' ? data.options() : data.options;
    var datatable = new ReactiveDatatable(options);
    this.autorun(function(){
        datatable.update(data.tableData());
    });
};