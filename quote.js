


hideAll();

$("#building-type").on("change", function(dropdownEvent){
    dropdownEvent.preventDefault();
    hideAll();
    if(isResidential())
    {
        $("#res").show();
    }
    else if (isCommercial())
    {
        $("#com").show();
    }
    else if (isCorporate())
    {
      
        $("#corp").show();
    }
    else if (isHybrid())
    {
       
        $("#hyb").show();
    }
    
});

function hideAll()
{
    $("#res, #com,#corp , #hyb").hide();
}

function isResidential()
{
    var input = $("#building-type").val();
     return input==="residential";
}
/** gettter */
function getBuildingType()
{
    return $("#building-type").val();
}

/*Boolean functions */
function isCommercial()
{ 
     return getBuildingType()==="commercial";
}

function isCorporate()
{
     return getBuildingType()==="corporate";
}

function isHybrid()
{
     return getBuildingType()==="hybrid";
}