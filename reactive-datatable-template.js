Template.ReactiveDatatable.rendered = function () {
	var data = this.data;
    var datatable = new ReactiveDatatable(data.options, data.id);
    this.autorun(function(){
        datatable.update(data.tableData());
    });
};