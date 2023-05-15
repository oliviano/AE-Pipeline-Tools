myComp = app.project.activeItem;

myExposureCtrl = myComp.layers.addSolid([0.2,0.2,0.2], "| Exposure Control |", myComp.width, myComp.height,1);
myExposureCtrl.startTime = 0
myExposureCtrl.adjustmentLayer = true;
myExposureCtrl.label = 11
//$.write(myExposureCtrl.id)
//$.write("_")

myOcio = myComp.layers.addSolid([0.2,0.2,.2], "| openColorIO | D3 |", myComp.width, myComp.height,1);
myOcio.startTime = 0
myOcio.adjustmentLayer = true;
myOcio.label = 11
var myOcioID = myOcio.id
//$.write(myOcio.id)
//$.write("_")

// Load openColorIO preset
var presetFolder = Folder.myDocuments.fsName + '/Adobe/After Effects 2022/User Presets/';
var ocioffx = 'OCIO - LINEAR SRGB-REC2020.ffx';
var presetfilepath = presetFolder + ocioffx; // "path/to/mypreset.ffx";
var pfile = File(presetfilepath);

myOcio.applyPreset(pfile);

// Build Guide Layert for OCIO rec709 preview
myPreviewOcio = myComp.layers.addSolid([0.2,0.2,.2], "| openColorIO | r709 Preview |", myComp.width, myComp.height,1);
myPreviewOcio.startTime = 0
myPreviewOcio.adjustmentLayer = true;
myPreviewOcio.guideLayer = true;
myPreviewOcio.label = 8
myPreviewOcio.enabled = false
//$.write(myPreviewOcio.id)
//$.write("_")

// Load openColorIO preset for 709 Preview
var ocioffx = 'OCIO - REC2020-REC709.ffx';
var presetfilepath = presetFolder + ocioffx; // "path/to/mypreset.ffx";
var pfile = File(presetfilepath);

myPreviewOcio.applyPreset(pfile);


// Add Exposure & Lumetri to Exposure Ctrl
myExposureCtrlFX = myExposureCtrl.property("Effects").addProperty("Exposure")
myExposureCtrlFX = myExposureCtrl.property("Effects").addProperty("Lumetri Color")

// Testing Layer ID for referencing layers. -> should integrate in earlier calls.
// app.project.layerByID(myOcioID).property("Effects").addProperty("Exposure")