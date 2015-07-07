Template.ReactiveDatatable.rendered = function() {
    var data = this.data;
    var reactiveDataTable = new ReactiveDatatable(data.options);

    // Help Blaze cleanly remove entire datatable when changing template / route by
    // wrapping table in existing element (#datatable_wrap) defined in the template.
    var table = document.createElement('table');
    table.className = 'table dataTable';
    
    // Render the table element and turn it into a DataTable
    $(this.find('#datatable_wrapper')).append(table);
    var dt = $(table).DataTable(data.options);
    reactiveDataTable.datatable = dt;

    dt.on('page.dt', function(e, settings) {
        var info = dt.page.info();
        reactiveDataTable.page = info.page;
    });

    this.autorun(function() {
        reactiveDataTable.update(data.tableData());
    });
};