/*------ Global ------*/
// Matching passwords keyup false
$.validator.setDefaults({ onkeyup: false });

// Global Error Messaging.
function displayErr(page, type, customMsg) {
  $('.msg').remove();
  var msg = '';
  var msgClass = "msg msg-error";
  var genericErr = "There was a problem with your request, please try again later.";
  switch(page) {
    case "registration":
      if(type === "success") {
        msg = "Please check your email to activate your account.";
        msgClass = "msg msg-success";
      } else {
        msg = genericErr;
      }
      break;
    case "login":
      if(type != "success" && !customMsg) {
        msg = genericErr;
      } else {
        msg = customMsg;
      }
      break;
    case "advertise":
      if(type === "success") {
        msg = "Your message has been sent successfully.";
        msgClass = "msg msg-success";
      } else {
        msg = genericErr;
      }
      break;
    case "password":
      if(type === "success") {
        msg = "Your message has been sent successfully.";
        msgClass = "msg msg-success";
      } else {
        msg = genericErr;
      }
      break;
  }
  $('.header').after('<div class="' + msgClass + '">' + msg + '</div>');
}

/*------ Login ------*/
// Validate matching passwords on signup
/*jQuery.validator.addMethod("matchers", function(value, element) {
return $('#signupPassword').val() == $('#signupPasswordConfirm').val();
}, "Please enter matching passwords.");

// Validate password strength
jQuery.validator.addMethod("pwStrength", function(value, element) {
	var _pwAll = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/])/;
return _pwAll.test(value);
}, "Please check your password strength.");*/


$(window).load(function() {
	if($('#container').hasClass('dNone')) {
    $('#loader').fadeOut(500, function() {
      $('#loader').remove();
    });
    $('#header').fadeIn(500);
    $('#container').fadeIn(1000);
	}
});