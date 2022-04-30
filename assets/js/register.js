
$(document).ready(function(){

var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var mobileNumberRegex =  /^[6-9]\d{9}$/;
var nameRegex = /^[a-zA-Z ]*$/;
var userNameRegex = /^[a-zA-Z0-9]([-](?![-])|[a-zA-Z0-9]){2,15}[a-zA-Z0-9]$/;

$('#sendCode').click(function(){
	
	var email = $('#emailTag').val();
	$('#emailAddressSpanTag').hide();
	if(email === undefined ||  email.length==0){
		$('#emailAddressSpanTag').show();
		$('#emailAddressHtml').html('Email address is required');
		return;
	}else if(!emailRegex.test(email)) {
		$('#emailAddressSpanTag').show();
		$('#emailAddressHtml').html('Email address is invalid');
		return;
	}
    SendCode(email);
	
});

function SendCode(email){
	         $.ajax({
                    url: 'https://ncepc.in/Account/Api/Account/GenerateEmailCode',
                    type: 'GET',
                    dataType: 'json', beforeSend: function (xhr) {
                        xhr.setRequestHeader("AjaxAuthorization", "Ajax Session Checking");
                    },
                    data: { email: email },
                    success: function (rd) {
                      $('#sendCodeTag').hide();
					  $('#emailTag').prop("readonly", true);
					     $('#verificationCodeTag').show();
						    $('#verifyTag').show();
                    },
                    error: function (result) {
						$('#sendCodeTag').hide();
					  $('#emailTag').prop("readonly", true);
					     $('#verificationCodeTag').show();
						    $('#verifyTag').show();
						alert('some error occured, please try again...')
					}
                   
                })
	
}

console.log('aaa');
$('.contactInfo').hide();

 $('#btnRegister').prop('disabled', true);
			$('#userNameField').keyup(function () {
                var userNameField = $(this).val();

                if (userNameField.trim().length >= 4) {
                    ValidateuserNameField(userNameField.trim());
                } else {
                    $('#userNameField').addClass('borderValidateRed');
                    $('#userNameFieldError').show();
                    $('#userNameFieldErrorText').html('4 Characters Minimum.');
                }
            })
			
			  function ValidateuserNameField(userNameField) {
                $('#save').prop('disabled', true);

                //console.log(userNameField);
                $.ajax({
                    url: '' + "/Admin/ValidateUserName",
                    type: 'POST',
                    dataType: 'json', beforeSend: function (xhr) {
                        xhr.setRequestHeader("AjaxAuthorization", "Ajax Session Checking");
                    },
                    data: { userName: userNameField, contactId: modelJquery.ContactId },
                    success: function (rd) {
                        if (rd.response) {
                            userNameFieldExsists = true;
                            $('#userNameField').addClass('borderValidateRed');
                            $('#userNameFieldError').show();
                            $('#userNameFieldErrorText').html('User Name Already Exsists.');

                        } else {
                            userNameFieldExsists = false;
                            $('#userNameField').removeClass('borderValidateRed');
                            $('#userNameFieldError').hide();
                        }
                        $('#save').prop('disabled', false);

                    },
                    error: function (result) {
                    if (result.status == 302) {
                                $('#sessionExpiredLogoutPopup').modal('show');
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Some error occured please try again.',
                                });
                            } }
                })
            };
$('#btnRegister').click(function(){
	console.log('aa');
	       //$('#btnRegister').prop('disabled', true);

});

   function postPayment() {
     
            $.ajax({
                url: "https://localhost:5001/api/Reference/GetCompetitiveSubjects",
				crossDomain: true,
              /*  type: 'POST',
                dataType: 'json', beforeSend: function (xhr) {
                    xhr.setRequestHeader("AjaxAuthorization", "Ajax Session Checking");
                },
                data: { userName: userNameField, contactId: contactJson.ContactId },
                
				*/
				type:'GET',
				/* 
              "Access-Control-Allow-Origin":"*", "Access-Control-Request-Headers":"x-requested-with"*/
				 headers: {
              "accept": "application/json",
			  
          },
				data:{ boardId:6},
	
				success: function (rd) {
                    if (rd.response) {
                        userNameFieldExsists = true;

                        $('#userNameField').addClass('borderValidateRed');
                        $('#userNameFieldError').show();
                        $('#userNameFieldErrorText').html('User Name Already Exsists.');

                    } else {
                        userNameFieldExsists = false;
                        $('#userNameField').removeClass('borderValidateRed');
                        $('#userNameFieldError').hide();
                    }
                    $('#save').prop('disabled', false);

                },
                error: function (result) {
          }
            })
        };
});