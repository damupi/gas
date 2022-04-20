function copyAndPasteGA4CDs(){
  var sourcePropertyId;
  sourcePropertyId = "properties/***write_your_template_id_GA4_property_here***";
  
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('GA4 Property ID', 'Enter the Destination GA4 Property ID: 1234', ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton() == ui.Button.OK) {
      var pid = response.getResponseText();
      destinationPropertyId = "properties/" + pid;
    } else if (response.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user canceled the dialog.');
    return;
  } else {
    Logger.log('The user closed the dialog.');
    return;
  };

  var customDimensionsLst = AnalyticsAdmin.Properties.CustomDimensions.list(sourcePropertyId);   

  // console.log(customDimensionsLst);
  
   if (customDimensionsLst.customDimensions && customDimensionsLst.customDimensions.length)  {
     for (var i = 0; i < customDimensionsLst.customDimensions.length; i++) {
        // console.log(customDimensionsLst.customDimensions[i].parameterName);
        // console.log(customDimensionsLst.customDimensions[i].displayName);
        // console.log(customDimensionsLst.customDimensions[i].scope);
        var body = {};
        body["parameterName"] = customDimensionsLst.customDimensions[i].parameterName;
        body["displayName"] = customDimensionsLst.customDimensions[i].displayName;
        body["scope"] = customDimensionsLst.customDimensions[i].scope;

        try{
          //console.log(body);
          AnalyticsAdmin.Properties.CustomDimensions.create( body, destinationPropertyId)
        }catch(error) {
          console.log(error.message);
          Browser.msgBox(error.message);
        }
        
     }
   } else {console.log('There are no Custom Dimensions for the property Id', getCellDisplayValue('COPY AND PASTE GA4 CDs','E4'));Browser.msgBox(error.message);};
   return customDimensionsLst.customDimensions;
  
}
