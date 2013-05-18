// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//create a namespace object in the example namespace:
require jquery
require jquery_ujs
require_tree

YAHOO.namespace("example.colorpicker")

//create a new object for this module:
YAHOO.example.colorpicker.inDialog = function() {

	//Some shortcuts to use in our example:
	var Event=YAHOO.util.Event,
		Dom=YAHOO.util.Dom,
		lang=YAHOO.lang;

//In our initialization function, we'll create the dialog;
//in its render event, we'll create our Color Picker instance.
init: function() {

	// Instantiate the Dialog
	this.dialog = new YAHOO.widget.Dialog("yui-picker-panel", { 
		width : "500px",
		fixedcenter : true,
		visible : false, 
		constraintoviewport : true,
		buttons : [ { text:"Submit", handler:this.handleSubmit, isDefault:true },
					{ text:"Cancel", handler:this.handleCancel } ]
	 });

// Once the Dialog renders, we want to create our Color Picker
// instance.
this.dialog.renderEvent.subscribe(function() {
	if (!this.picker) { //make sure that we haven't already created our Color Picker
		YAHOO.log("Instantiating the color picker", "info", "example");
		this.picker = new YAHOO.widget.ColorPicker("yui-picker", {
			container: this.dialog,
			images: {
				PICKER_THUMB: "assets/picker_thumb.png",
				HUE_THUMB: "assets/hue_thumb.png"
			}
			//Here are some other configurations we could use for our Picker:
			//showcontrols: false,  // default is true, false hides the entire set of controls
			//showhexcontrols: true, // default is false
			//showhsvcontrols: true  // default is false
		});

		//listen to rgbChange to be notified about new values
		this.picker.on("rgbChange", function(o) {
			YAHOO.log(lang.dump(o), "info", "example");
		});
	}
});	

// Wire up the success and failure handlers
this.dialog.callback = { success: this.handleSuccess, thisfailure: this.handleFailure };
// We're all set up with our Dialog's configurations;
// now, render the Dialog
this.dialog.render();
YAHOO.util.Event.onDOMReady(YAHOO.example.colorpicker.inDialog.init, YAHOO.example.colorpicker.inDialog, true); 