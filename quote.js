hideAll();
// this event will show the building type form once one of the building type is selected
$("#building-type").on("change", function (dropdownEvent) {
  dropdownEvent.preventDefault();
  hideAll();
  if (isResidential()) {
    $("#res, #productLine_id").show();
  } else if (isCommercial()) {
    $("#com, #productLine_id").show();
  } else if (isCorporate()) {
    $("#corp, #productLine_id").show();
  } else if (isHybrid()) {
    $("#hyb, #productLine_id").show();
  }
});

//hide the entire form except the radio buttons
function hideAll() {
  $("#res,#com,#corp, #hyb, #productLine_id, #resultsId,#resultsIdError").hide();
}

//change values to canadian currency and handle the Nan
//change values to canadian currency and handle the Nan
function changeToCurrency(num) {
  if (isNaN(num)){
    $("#resultsIdError").show();
    $("#resultsId").hide();
    $("#resultsIdError").html(
      "<strong>The number(s) entered are not valid. Please make sure you have a selected buidling type and entered valid numbers !</strong>"
    ); //handling the NaN error
    $("#resultsIdError").css("color", "red"); //coloring message to red
    
  }
  else{ 
    $("#resultsIdError").hide();
    $("#resultsId").show();
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "CAD",
    }).format(num);
 }
}


/* this output the results of the quote page once the product line is selected
 */
$("input[name='productLine']").on("click", function () {
  var productLineType = $("input:checked").val();

  if (productLineType === "7565") {
    var productLineTypeInNumber = parseInt(productLineType);
    $("#unit_price").val(changeToCurrency(productLineTypeInNumber));
    $("#num_of_elevators").val(getNumberOfElavators());
    var totalPriceforElevator =
      getNumberOfElavators() * productLineTypeInNumber;

    $("#total_price").val(changeToCurrency(totalPriceforElevator));
    var installationFees = totalPriceforElevator * 0.10;
    $("#installation_fees").val(changeToCurrency(installationFees));
    $("#final_price").val(
      changeToCurrency(totalPriceforElevator + installationFees)
    );
  } else if (productLineType === "12345") {
    var productLineTypeInNumber = parseInt(productLineType);
    $("#unit_price").val(changeToCurrency(productLineTypeInNumber));
    $("#num_of_elevators").val(getNumberOfElavators());
    var totalPriceforElevator =
      getNumberOfElavators() * productLineTypeInNumber;

    $("#total_price").val(changeToCurrency(totalPriceforElevator));
    var installationFees = totalPriceforElevator * 0.13;
    $("#installation_fees").val(changeToCurrency(installationFees));
    $("#final_price").val(
      changeToCurrency(totalPriceforElevator + installationFees)
    );
  } else if (productLineType === "15400") {
    var productLineTypeInNumber = parseInt(productLineType);
    $("#unit_price").val(changeToCurrency(productLineTypeInNumber));
    $("#num_of_elevators").val(getNumberOfElavators());
    var totalPriceforElevator =
      getNumberOfElavators() * productLineTypeInNumber;

    $("#total_price").val(changeToCurrency(totalPriceforElevator));
    var installationFees = totalPriceforElevator * 0.16;
    $("#installation_fees").val(changeToCurrency(installationFees));
    $("#final_price").val(
      changeToCurrency(totalPriceforElevator + installationFees)
    );
  }
});

/* Return the the number of elevators*/
function getNumberOfElavators() {
  if (isCommercial()) {
    return parseInt($("#com_ela").val());
  } else if (isResidential()) {
    var numberOfAppartments = parseInt($("#res_apt").val());
    var numberOfFloors = parseInt($("#res_flo").val());
    if (numberOfFloors <= 0 || numberOfOccupantsPerFloor <= 0) {
      return;
    }
    var doorsPerFloor = Math.ceil(numberOfAppartments / numberOfFloors);
    var numberOfElavatorsNeeded = Math.ceil(doorsPerFloor / 6);
    var columns = Math.ceil(numberOfElavatorsNeeded / 20);
    var elevators = columns * numberOfElavatorsNeeded;
    return elevators;
  } else if (isHybrid()) {
    var numberOfFloors = parseInt($("#hyb_floors").val());
    var numberOfOccupantsPerFloor = parseInt($("#hyb_occupants").val());
    var numberOfBasements = parseInt($("#hyb_basements").val());
    if (
      numberOfFloors <= 0 ||
      numberOfOccupantsPerFloor <= 0 ||
      numberOfBasements <= 0
    ) {
      return;
    }
    var totalNumerOfOccupants =
      numberOfOccupantsPerFloor * (numberOfFloors + numberOfBasements);
    var numberOfRequiredElavators = totalNumerOfOccupants / 1000;

    var numberOfColumns = Math.ceil((numberOfFloors + numberOfBasements) / 20);

    var numberOfElavatorsPerColumn = Math.ceil(
      numberOfRequiredElavators / numberOfColumns
    );
    return numberOfElavatorsPerColumn * numberOfColumns;
  } else if (isCorporate()) {
    var numberOfFloors = parseInt($("#corp_floors").val());
    var numberOfOccupantsPerFloor = parseInt($("#corp_occupants").val());
    var numberOfBasements = parseInt($("#corp_basements").val());
    if (
      numberOfFloors <= 0 ||
      numberOfOccupantsPerFloor <= 0 ||
      numberOfBasements <= 0
    ) {
      return;
    }
    var totalNumerOfOccupants =
      numberOfOccupantsPerFloor * (numberOfFloors + numberOfBasements);
    var numberOfRequiredElavators = totalNumerOfOccupants / 1000;

    var numberOfColumns = Math.ceil((numberOfFloors + numberOfBasements) / 20);

    var numberOfElavatorsPerColumn = Math.ceil(
      numberOfRequiredElavators / numberOfColumns
    );
    return numberOfElavatorsPerColumn * numberOfColumns;
  }
}

/** gettter that gets the type of the building */
function getBuildingType() {
  return $("#building-type").val();
}

/*Boolean functions to check the building type */

function isResidential() {
  return getBuildingType() === "residential";
}
function isCommercial() {
  return getBuildingType() === "commercial";
}

function isCorporate() {
  return getBuildingType() === "corporate";
}

function isHybrid() {
  return getBuildingType() === "hybrid";
}
