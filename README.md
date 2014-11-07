# Reactive Datables

Provides a [meteor.js](http://www.meteor.com) way of using [jquery.dataTables](http://datatables.net/) with reactively-updating data, instant search, state saving / pagination etc.

## Compatibility!

**NOTE: This is a fork of ephemer:reactive-datatables**
 
**The ephemer version did not support multiple reactive tables on the same page.**

**This version does (fully).**

**There are several "backwards compatibility hacks" in this version which will be removed in ssteinerx:reactive-datatables Version 1.1.0**

**Deprecation warnings will be provided in all 1.0.x versions, they will become errors in 1.1.0**

**Watch your console!** 

## Installation

`meteor remove ephemer:reactive-datatables`
`meteor add ssteinerx:reactive-datatables`

## Usage

In your template:

    <template name="containsTheDataTable">
        {{> ReactiveDatatable tableData=reactiveDataFunction options=optionsObject id=id}}
    </template>

**Important:** `reactiveDataFunction` must *return a __function__ that returns an array* as shown below:

    dataTableData = function () {
        return Meteor.users.find().fetch(); 	// or .map()
    };
    
    Template.containsTheDataTable.helpers({
        reactiveDataFunction: function () {
            return dataTableData;
        },
        optionsObject: optionsObject, 		 	// see below
        id:"theIdToUseForYourTable"
    });

Set up your datatable's options as per the [datatables](http://www.datatables.net/) API e.g:

    var optionsObject = {
        columns: [{
            title: 'Real Name',
            data: 'profile.realname', // note: access nested data like this
            className: 'nameColumn'
        }, 
        {
            title: 'Photo',
            data: 'profile.picture',
            render: renderPhoto, // optional data transform, see below
            className: 'imageColumn'
        }],
    }
    
    function renderPhoto(cellData, renderType, currentRow) {
        // You can return html strings, change sort order etc. here
        // Again, see [datatables](http://www.datatables.net/)
        var img = "<img src='" + cellData + "' title='" + currentRow.profile.realname + "'>"
        return img;
    }

I've deliberately continued to keep this package as close as possible to the original API
nor does this module exposed any global variables.

You can access the DataTable API in the usual jquery way using the '#{{id}}' selector from your template, i.e., to get an array with your data:

`$('#{{id}}').DataTable().rows()`

## About returning a function

The reason you need to return a function with an array and not just the array itself (see code example above) is because the autorun / reactive context is on the datatable end (which is how the datatable knows to do the reactive updates).

If you just pass an array into the datatable (this would involve a 1-line source code change), it won't know when the array has been updated. This is because arrays by themselves don't have an .invalidate() function attached. The trick of passing a wrapped function into the datatable's template is the only way I can see to encapsulate the datatable functionality in a package. Please send me a pull request if you can see a better way around this.

## Acknowledgements (ephemer)

Thank you to @smowden for finding the key to getting this whole package off the ground: `$('#datatable').DataTable().clear().rows.add(data).draw()`

## Acknowledgements (ssteinerX)

Big thanks to ephemer:reactive-datatables for providing a launchpoint for this project.