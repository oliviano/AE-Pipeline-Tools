/*
// AUTOMATICALLY CHECKS for Panel vs Window and runs appropriatly 
// https://www.goodboy.ninja/blog/the-secret-to-a-dockable-scriptui-panel
// https://scriptui.joonas.me/
*/


/*
VPMD OFMD AE SCRIPT MK3 with WINDOW UI
*/
(function createNullsFromPaths (thisObj) {
    /* Build UI */
    function buildUI(thisObj) {

        var windowTitle = "VPMD TOOLS MK2";
        var firstButton = "OCIO TEMPLATE ALL";
        var secondButton = "Linear to rec2020";
        var thirdButton = "EXPOSURE";
        var fourthButton = "GUIDE";
        var win = (thisObj instanceof Panel)? thisObj : new Window('palette', windowTitle);
            win.spacing = 0;
            win.margins = 4;
            var myButtonGroup = win.add ("group");
                myButtonGroup.spacing = 4;
                myButtonGroup.margins = 0;
                myButtonGroup.orientation = "column";
                win.button1 = myButtonGroup.add ("button", undefined, firstButton);
                win.button2 = myButtonGroup.add ("button", undefined, secondButton);
                win.button3 = myButtonGroup.add ("button", undefined, thirdButton);
                win.button4 = myButtonGroup.add ("button", undefined, fourthButton);
                myButtonGroup.alignment = "left";
                myButtonGroup.alignChildren = "left";

            win.button1.onClick = function(){
                exposureCtrl();                  
                ocioBase();
                r709Preview();
            }
            win.button2.onClick = function(){
               ocioBase();
            }
            win.button3.onClick = function(){
                exposureCtrl();
            }
            win.button4.onClick = function(){
                r709Preview();
            }
        win.layout.layout(true);

        return win
    }


    // Show the Panel
    var w = buildUI(thisObj);
    if (w.toString() == "[object Panel]") {
        w;
    } else {
        w.show();
    }


    /* General functions */
   
    
    function ocioBase(){
        myComp = app.project.activeItem;
        myOcio = myComp.layers.addSolid([0.2,0.2,.2], "| openColorIO | D3 |", myComp.width, myComp.height,1);
        myOcio.startTime = 0
        myOcio.adjustmentLayer = true;
        myOcio.label = 11
        var myOcioID = myOcio.id
        $.write(myOcio.id)
        $.write("_")

        // Load openColorIO preset
        var presetFolder = Folder.myDocuments.fsName + '/Adobe/After Effects 2022/User Presets/';
        var ocioffx = 'OCIO - LINEAR SRGB-REC2020.ffx';
        var presetfilepath = presetFolder + ocioffx; // "path/to/mypreset.ffx";
        var pfile = File(presetfilepath);

        myOcio.applyPreset(pfile);
        return
    }

    function exposureCtrl(){
        myComp = app.project.activeItem;
        myExposureCtrl = myComp.layers.addSolid([0.2,0.2,0.2], "| Exposure Control |", myComp.width, myComp.height,1);
        myExposureCtrl.startTime = 0
        myExposureCtrl.adjustmentLayer = true;
        myExposureCtrl.label = 11
        
        // Add Exposure & Lumetri to Exposure Ctrl
        myExposureCtrlFX = myExposureCtrl.property("Effects").addProperty("Exposure")
        myExposureCtrlFX = myExposureCtrl.property("Effects").addProperty("Lumetri Color")
    }

    function r709Preview(){
        // Build Guide Layert for OCIO rec709 preview
        myComp = app.project.activeItem;
        myPreviewOcio = myComp.layers.addSolid([0.2,0.2,.2], "| openColorIO | r709 Preview |", myComp.width, myComp.height,1);
        myPreviewOcio.startTime = 0
        myPreviewOcio.adjustmentLayer = true;
        myPreviewOcio.guideLayer = true;
        myPreviewOcio.label = 8
        myPreviewOcio.enabled = false
        
        var myPreviewOcioID = myPreviewOcio.id
        $.write(myPreviewOcio.id)
        $.write("_")

        
        
        // Load openColorIO preset for 709 Preview
        var ocioffxPreview = 'OCIO - REC2020-REC709.ffx';
        var presetFolder = Folder.myDocuments.fsName + '/Adobe/After Effects 2022/User Presets/';
        var presetfilepath = presetFolder + ocioffxPreview; // "path/to/mypreset.ffx";
        var pfilePreview = File(presetfilepath);
        
        app.project.layerByID(myPreviewOcioID).applyPreset(pfilePreview);
        //myPreviewOcio.applyPreset(pfilePreview);

    }

    function createNull(targetComp){
        return targetComp.layers.addNull();
    }


    /* General functions END */
   



})(this);
