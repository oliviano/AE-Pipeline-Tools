// RENDER MULTIPLE VARIATION OF COMP FROM CSV //
// DON"T FORGET TO SET TOOLKIT to Adobe after effects :) 
// script by olivier jean - v1 September 2024 //
// use: dir /s /b *.png > pngfilelist.txt to generate file list

// added rescaling :)

// Global Variables
var csvFile = File("D:/TEST/AE_TemplateRender - OUPUT3.csv"); // Set your CSV path here
var comp_template = "Template_COMP";
var scalefactor = 0.75;

csvFile.open("r");

// Function to parse CSV file
function parseCSV(file) {
    var csvData = [];
    while (!file.eof) {
        var line = file.readln();
        csvData.push(line.split(","));
    }
    return csvData;
   
}

var data = parseCSV(csvFile);
 $.writeln(data);
csvFile.close();

// Access the project and find the template composition
var proj = app.project;
var templateComp = null;

// Find the template composition named "Template_COMP"
for (var i = 1; i <= proj.numItems; i++) {
    if (proj.item(i).name === comp_template && proj.item(i) instanceof CompItem) {
        templateComp = proj.item(i);
        break;
    }
}

// If template composition is not found, show an alert
if (templateComp == null) {
    alert("Template composition not found.");
} else {
    // Parse headers from the first row of the CSV
    var headers = data[0];

    // Loop through the CSV rows (starting from the second row)
    for (var i = 1; i < data.length; i++) {
        var row = data[i];

        // Duplicate the template composition & name it from the CSV
        var newCompName = row[headers.indexOf("NewCompName")];
        var newComp = templateComp.duplicate();
        newComp.name = newCompName;

        // Replace image in "template_Image1"
        var imagePath1 = row[headers.indexOf("ImagePath1")];
        var imageFile1 = File(imagePath1);
        var imageLayer1 = newComp.layer("template_Image1");

        if (imageFile1.exists && imageLayer1 != null && imageLayer1 instanceof AVLayer) {
            var footage1 = app.project.importFile(new ImportOptions(imageFile1));
            imageLayer1.replaceSource(footage1, false);
            
            // Get image resolution (width, height) and comp dimensions
            var imageWidth1 = footage1.width;
            var imageHeight1 = footage1.height;
            var compWidth = newComp.width;
            var compHeight = newComp.height;

            // Calculate scale based on resolution relative to composition
            var scaleX1 = (compWidth / imageWidth1) * 100 * scalefactor ;
            var scaleY1 = (compHeight / imageHeight1) * 100 * scalefactor ;
            var scale1 = Math.min(scaleX1, scaleY1); // Uniform scaling to fit in the comp // change this to scale to higher or lower dims

            // Set the scale of the image layer // add dimension if 3D layer
            imageLayer1.property("Scale").setValue([scale1, scale1,scale1]);                 
            
        } else {
            alert("Image file not found or invalid layer for template_Image1: " + imagePath1);
        }

        // Replace image in "template_Image2"
        var imagePath1 = row[headers.indexOf("ImagePath1")];
        var imageFile1 = File(imagePath1);
        var imageLayer2 = newComp.layer("template_Image2");

        if (imageFile1.exists && imageLayer2 != null && imageLayer2 instanceof AVLayer) {
           // var footage2 = app.project.importFile(new ImportOptions(imageFile2));
            imageLayer2.replaceSource(footage1, false);
      
           // Get image resolution (width, height) and comp dimensions
            var imageWidth1 = footage1.width;
            var imageHeight1 = footage1.height;
            var compWidth = newComp.width;
            var compHeight = newComp.height;

            // Calculate scale based on resolution relative to composition
            var scaleX1 = (compWidth / imageWidth1) * 100 * scalefactor ;
            var scaleY1 = (compHeight / imageHeight1) * 100 * scalefactor ;
            var scale1 = Math.min(scaleX1, scaleY1); // Uniform scaling to fit in the comp // change this to scale to higher or lower dims

            // Set the scale of the image layer // add dimension if 3D layer
            imageLayer2.property("Scale").setValue([scale1, scale1,scale1]);     
            
       
        } else {
            alert("Image file not found or invalid layer for template_Image2: " + imagePath2);
        }
        
        
        // Add the new composition to the render queue
        var renderQueueItem = app.project.renderQueue.items.add(newComp);
        
        // Set render settings template (e.g., "Best Settings")
        renderQueueItem.applyTemplate("Best Settings");
  
        // Set the output module template (e.g., "Lossless")
        var outputModule = renderQueueItem.outputModule(1);
        outputModule.applyTemplate("PNG_Seq");
        

        // Get the output path from the CSV and set it in the render queue
        var outputPath = row[headers.indexOf("OutputPath")];
        var outputFile = File(outputPath);

        // Set the destination path in the output module
        renderQueueItem.outputModule(1).file = outputFile;
    }

    alert("Compositions created and image layers replaced successfully!");
}

"Script completed successfully";
