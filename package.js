Package.describe({
  summary: "full support: jQuery dataTables, reactive, Bootstrap 3, multiple tables per page.",
  version: "1.0.2",
  git: "ssteinerXgit@github.com:ssteinerx/meteor-reactive-datatables"
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