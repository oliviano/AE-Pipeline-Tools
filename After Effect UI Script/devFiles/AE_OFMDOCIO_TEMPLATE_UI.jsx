// AUTOMATICALLY CHECKS for Panel vs Window and runs appropriatly 
// https://www.goodboy.ninja/blog/the-secret-to-a-dockable-scriptui-panel
// https://scriptui.joonas.me/

var isPanel = this instanceof Panel; // true or false
var dialog = isPanel  ? this : new Window("dialog");

// DIALOG
// ======
    dialog.text = "RRRR !!"; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["center","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

// MAINPANEL
// =========
var mainPanel = dialog.add("panel", undefined, undefined, {name: "mainPanel"}); 
    mainPanel.text = "OFMD"; 
    mainPanel.orientation = "column"; 
    mainPanel.alignChildren = ["left","top"]; 
    mainPanel.spacing = 10; 
    mainPanel.margins = 10; 

var button_ocio = mainPanel.add("button", undefined, undefined, {name: "button_ocio"}); 
    button_ocio.text = "OCIO TEMPLATE"; 
    
if (!isPanel) {
	dialog .show();
}

// BUTTON CALLSBACK
// =========

button_ocio.onClick = ofmdTemplate();


function ofmdTemplate(){
        var undoGroup = localize("$$$/AE/Script/ocio_template");
        app.beginUndoGroup(undoGroup);
        
        myComp = app.project.activeItem;

        myExposureCtrl = myComp.layers.addSolid([0.2,0.2,0.2], "| Exposure Control |", myComp.width, myComp.height,1);
        myExposureCtrl.startTime = 0
        myExposureCtrl.adjustmentLayer = true;
        myExposureCtrl.label = 11
        // Add Exposure & Lumetri to Exposure Ctrl
        myExposureCtrlFX = myExposureCtrl.property("Effects").addProperty("Exposure")
        myExposureCtrlFX = myExposureCtrl.property("Effects").addProperty("Lumetri Color")        
        
        
        // CODE HERE
        app.endUndoGroup();
        return()
    }