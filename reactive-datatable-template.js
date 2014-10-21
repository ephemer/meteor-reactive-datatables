Template.ReactiveDatatable.rendered = function () {
	var data = this.data;
    var datatable = new ReactiveDatatable(data.options);
    this.autorun(function(){
        datatable.update(data.tableData());
    });
};
Template.ReactiveDatatable.helpers({
    id: function () {
        return data.options.id + "_wrapper";
    }
});