$("#results-display").hide();
$("#submitData").click(function(){
    $("#results-display").removeClass();
    $("#results-display").hide();
    //alert("Ha ha ha...I am submitted!!!");

    var valid = false;
    //alert($("#firstname").val().length);
    //alert($("#username").val().length);
    //alert($("#password").val().length);
    if(($("#firstname").val().length >0) && ($("#username").val().length >0) && ($("#password").val().length >0)){
    	valid = true;
    }else{
 		//alert("VALID="+ valid);
         $("#results-display").html("Enter all fields....");
         $("#results-display").addClass("alert alert-danger");
        $("#results-display").show();
    }


    if(valid){
    	var myKeyVals = { "firstname" : $("#firstname").val(), "lastname" : $("#lastname").val(), "emailaddress" : $("#emailaddress").val(), "phonenumber" : $("#phonenumber").val(), "username_1" : $("#username").val(), "password_1" : $("#password").val() }
		//alert("myKeyVals="+ myKeyVals);
    	var saveData = $.ajax({
          	type: 'POST',
          	url: "/bin/aemtraining/userinfo",
              data: myKeyVals,
              dataType: "text",
              success: function(resultData) {
             //alert("Save Complete ");
             // alert("resultData="+resultData);
              $("#results-display").html(resultData);
              $("#results-display").addClass("alert alert-success");
              $("#results-display").show();
          	}
    	});
    	saveData.error(function() { alert("Something went wrong"); });
    }else{
         $("#results-display").html("Enter Firstname, User Name and Password");
         $("#results-display").addClass("alert alert-danger");
         $("#results-display").show();
    }

});

// Function for validating Login form
var validateForm = function() {
    alert("in validateform");
    var valid = false;
    alert($("#firstname").val().length);
    alert($("#username").val().length);
    alert($("#password").val().length);
    if(($("#firstname").val().length >0) && ($("#username").val().length >0) && ($("#password").val().length >0)){
    	valid = true;
 	}
    return valid;
}
