

    $("#res, #com,#corp , #hyb").hide();


$("#building-type").on("change", function(dropdownEvent){
    dropdownEvent.preventDefault();
    var input = $("#building-type").val();
  
    if(input==="residential")
    {
        $("#res, #com,#corp , #hyb").hide();
        $("#res").show();
    }
    else if (input==="commercial")
    {
        $("#res, #com,#corp , #hyb").hide();
        $("#com").show();
    }
    else if (input==="corporate")
    {
        $("#res, #com,#corp , #hyb").hide();
        $("#corp").show();
    }
    else if (input==="hybrid")
    {
        $("#res, #com,#corp , #hyb").hide();
        $("#hyb").show();
    }
    
})