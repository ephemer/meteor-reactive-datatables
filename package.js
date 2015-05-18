Package.describe({
  name: 'reactive-datatables',
  summary: "Fast and reactive jQuery DataTables using standard Cursors / DataTables API. Supports Bootstrap 3.",
  version: "1.0.1",
  git: "https://github.com/rossmartin/meteor-reactive-datatables.git"
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.0');
  api.use(['templating'], 'client');
  api.addFiles([
  	'jquery.dataTables.min.js',
    'dataTables.bootstrap.js',
  	'reactive-datatables.js',
  	'reactive-datatable-template.html',
  	'reactive-datatable-template.js',
  ], 'client');
});

/*Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ephemer_reactive-datatables');
  api.addFiles('reactive-datatables-tests.js');
});
*/
