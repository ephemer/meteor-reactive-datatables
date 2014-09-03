Package.describe({
  summary: "Create FAST and reactive jQuery DataTables using standard Meteor Cursors and DataTables API. Bootstrap 3 Compatible.",
  version: "1.0.1",
  git: "https://github.com/ephemer/meteor-reactive-datatables.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0');
  api.use(['templating'], 'client');
  api.addFiles([
  	'jquery.dataTables.min.js',
  	'reactive-datatables.js',
  	'reactive-datatable-template.html',
  	'reactive-datatable-template.js',
  ], 'client');
});

/*Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ephemer:reactive-datatables');
  api.addFiles('reactive-datatables-tests.js');
});
*/