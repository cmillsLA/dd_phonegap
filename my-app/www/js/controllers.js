'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.service( 'userInfo', [ '$rootScope', '$location', function( $rootScope, $location ) {

		return {

      // Check user is logged in.
			verifyLogin: function(init) {
        if($.cookie("fuelcid")) {
          return true;
        } else {
          if(!init) {
            $location.path('/login').replace();
          }
          return false;
        }
			},

      // Return user cookie.
      checkCookie: function() {
        return $.cookie("fuelcid");
      }

		}

	}])
	.controller('activate', [ '$rootScope', '$scope', '$http', '$location', '$timeout', 'userInfo', function( $rootScope, $scope, $http, $location, $timeout, userInfo) {

    $('.home').hide();
    $('.logout').hide();
    $('.login').show();

  }])
  .controller('password', [ '$rootScope', '$scope', '$http', '$location', '$timeout', 'userInfo', function( $rootScope, $scope, $http, $location, $timeout, userInfo) {
    
    $scope.setupPassword = function() {
      console.log('setup password');
      $('.msg').remove();
      $('.home').hide();
      $('.logout').hide();
      $('.login').show();

      // Login validation.
      $('#passwordForm').validate({
        rules: {
          passwordEmail: {
            required: true,
            minlength: 2,
            email: true
          }
        },
        messages: {
          passwordEmail: {
            required: "Please enter an email address.",
            minlength: "Please enter a valid email address.",
            email: "Please enter a valid email address."
          }
        }
      });

    };

    // Submit Login Form
    $scope.password = function() {
      if($('#passwordForm').valid()) {
        $.ajax({
          type: 'GET',
          url:'/api/password?email=' + $('#passwordEmail').val(),
          success: function(d) {
            displayErr('password', 'success');
            $('#password-wrap').html('<p>Please follow the link in your email address to reset your password.</p>')
          },
          error: function(d) {
            displayErr('password', 'error');
          }
        });
        return false;
      }
    };



    if(!userInfo.verifyLogin(true)) {
      $scope.setupPassword();
    } else {
      $location.path('/dashboard').replace();
    }

    // If logged in, redirect to dashboard
    /*$scope.checkLogin = function() {
      console.log('check login');
      var token = $.cookie("fuelcid");
      if(token) {
        $location.path('/dashboard').replace();
      } else {
        // Setup jquery validate
        $scope.setupPassword();
      }
    };

    // Verify login
    $scope.checkLogin();*/

  }])
  .controller('advertise', [ '$rootScope', '$scope', '$http', '$location', '$timeout', 'userInfo', function( $rootScope, $scope, $http, $location, $timeout, userInfo) {

    $scope.setupAdvertise = function() {
      $('.home').show();
      $('.logout').show();
      $('.login').hide();
      $('#advertise-form').validate({
        rules: {
          advertiseName: {
            required: true,
            minlength: 2
          },
          advertiseEmail: {
            required: true,
            minlength:2,
            email: true
          },
          advertiseMsg: {
            required: true,
            minlength:2
          }
        },
        messages: {
          advertiseName: {
            required: "Please enter your name.",
            minlength: "Please enter a valid name."
          },
          advertiseEmail: {
            required: "Please enter an email address.",
            minlengh: "Please enter a valid email address."
          },
          advertiseMsg: {
            required: "Please enter a message.",
            minlengh: "Please enter a message."
          }
        }
      });
    };

    $scope.advertise = function() {
      if($('#advertise-form').valid()) {
        var advObj = {
          name: $('#advertiseName').val(),
          email: $('#advertiseEmail').val(),
          company: $('#advertiseCompany').val(),
          message: $('#advertiseMsg').val()
        };
        $.ajax({
          type: "POST",
          contentType: "application/json; charset=UTF-8",
          dataType: "json",
          url: '/api/advertise',
          data: JSON.stringify(advObj),
          crossDomain: true,
          success: function(d) {
            displayErr('advertise', 'success');
            $('#advertise-wrap').html('<p>Thank you, your message has been sent.  We will respond within two business days.</p>');
          },
          error: function(d) {
            displayErr('advertise', 'error');
          }
        });
      }
    };

    if(userInfo.verifyLogin()) {
      $scope.setupAdvertise();
    }

  }])
  .controller('category', [ '$rootScope', '$scope', '$http', '$location', '$timeout', 'userInfo', function( $rootScope, $scope, $http, $location, $timeout, userInfo) {

    $scope.setupCategory = function() {
      $('.home').show();
      $('.logout').show();
      $('.login').hide();
    };

    if(userInfo.verifyLogin()) {
      $scope.setupCategory();
    }

  }])
  .controller('help', [ '$rootScope', '$scope', '$http', '$location', '$timeout', 'userInfo', function( $rootScope, $scope, $http, $location, $timeout, userInfo) {

    $scope.setupHelp = function(showBtns) {
      if(showBtns) {
        $('.home').show();
        $('.logout').show();
        $('.login').hide();
      } else {
        $('.home').hide();
        $('.logout').hide();
        $('.login').show();
      }
    };

    if(userInfo.verifyLogin()) {
      $scope.setupHelp();
    }

  }])
  .controller('points', [ '$rootScope', '$scope', '$http', '$location', '$timeout', 'userInfo', function( $rootScope, $scope, $http, $location, $timeout, userInfo) {

    $scope.setupPoints = function() {
      $('.home').show();
      $('.logout').show();
      $('.login').hide();
    };

    if(userInfo.verifyLogin()) {
      $scope.setupPoints();
    }

  }])
  .controller('revenue', [ '$rootScope', '$scope', '$http', '$location', '$timeout', 'userInfo', function( $rootScope, $scope, $http, $location, $timeout, userInfo) {

    $scope.setupRevenue = function() {
      $('.home').show();
      $('.logout').show();
      $('.login').hide();
    };

    if(userInfo.verifyLogin()) {
      $scope.setupRevenue();
    }

  }])
	.controller('global', [ '$rootScope', '$scope', '$http', '$location', 'userInfo', function( $rootScope, $scope, $http, $location, userInfo) {

    $scope.logOut = function() {
      $.removeCookie('fuelcid', { path: '/' });
      $('.logout').hide();
      $('.home').hide();
      $('.login').hide();
      $location.path('/login').replace();
		};

    $scope.login = function() {
      $location.path('/login').replace();
    }

	}])
	.controller('dashboard', [ '$rootScope', '$scope', '$http', '$location', 'userInfo', function ($rootScope, $scope, $http, $location, userInfo) {

    $scope.setupDashboard = function() {
      $('.msg').remove();
      $('.home').fadeIn();
      $('.logout').fadeIn();
      $('.login').hide();
    };

		// Verify login
		if(userInfo.verifyLogin()) {
      $scope.setupDashboard();
    }

  }])
  .controller('login', [ '$rootScope', '$scope', '$http', '$location', 'userInfo', function($rootScope, $scope, $http, $location, userInfo) {

  $scope.setupLogin = function() {
    console.log('setuplogin');
    $('.msg').remove();
    $('.home').hide();
    $('.logout').hide();
    $('.login').hide();

    $('#loginAccordion').accordion();

    // Validate password strength
    /*jQuery.validator.addMethod("pwStrength", function(value, element) {
     var _pwAll = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/])/;
     return _pwAll.test(value);
     }, "Please check your password strength.");*/

    // Login validation.
    $('#loginForm').validate({
      rules: {
        loginUser: {
          required: true,
          minlength: 2,
          email: true
        },
        loginPW: {
          required: true,
          minlength:2
        }
      },
      messages: {
        loginUser: {
          required: "Please enter your username.",
          minlength: "Please enter a valid username.",
          email: "Username must be a valid email address."
        },
        loginPW: {
          required: "Please enter a password.",
          minlengh: "Please enter a valid password."
        }
      }
    });
    // Signup Validation.
    jQuery.validator.addMethod("matchers", function(value, element) {
      return $('#signupPW').val() == $('#signupPWVerify').val();
    }, "Passwords do not match.");

    $('#signupForm').validate({
      rules: {
        signupUser: {
          required: true,
          minlength: 2,
          email: true
        },
        signupPW: {
          required: true,
          minlength:2,
          matchers: true
        },
        signupPVerifyW: {
          required: true,
          minlength:2,
          matchers: true
        }
      },
      messages: {
        signupUser: {
          required: "Please enter your username.",
          minlength: "Please enter a valid username.",
          email: "Username must be a valid email address."
        },
        signupPW: {
          required: "Please enter a password.",
          minlengh: "Please enter a valid password."
        },
        signupPWVerify: {
          required: "Please enter a password.",
          minlengh: "Please enter a valid password."
        }
      }
    });

  };

  // Submit Login Form
  $scope.login = function() {
    if($('#loginForm').valid()) {
      var usrObj = {
        username: $('#loginUser').val(),
        password: $('#loginPW').val()
      };
      $.ajax({
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        url: '/api/login',
        data: JSON.stringify(usrObj),
        success: function(d) {
          if(d.success == true) {
            $location.path('/dashboard').replace();
            $scope.$apply();
          } else {
            displayErr('login', 'error', d.errors);
          }
        },
        error: function(d) {
          displayErr('login', 'error');
        }
      });
      return false;
    }
  };

  // Submit Registration
  $scope.register = function() {
    var _scope = $scope;
    if($('#signupForm').valid()) {
      var usrObj = {
        username: $('#signupUser').val(),
        password: $('#signupPW').val(),
        email: $('#signupUser').val()
      };
      $.ajax({
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        url: '/api/adduser',
        data: JSON.stringify(usrObj),
        crossDomain: true,
        success: function(d) {
          if(d.success) {
            displayErr('registration', 'success');
          } else {
            displayErr('registration', 'error');
          }
        },
        error: function(d) {
          displayErr('registration', 'error');
        }
      });
    }
    return false;
  };

  // Forgot Password Submit
  $scope.forgotPasswordSubmit = function() {
    var _scope = $scope;
    if($('#forgotPasswordForm').valid()) {
      $.ajax({
        type: 'GET',
        url:'http://edafeks.dyndns.biz:9090/api/v1/users/forgot/?email=' + $('#forgotPasswordEmail').val(),
        success: function(d) {
          _scope.closeLightbox();
          displayMessage($('div.form-signin'),'passwordReset', true);
        },
        error: function(e) {
          _scope.closeLightbox();
          if(d.responseJSON) {
            displayMessage($('div.form-signin'),'errorCustom', true, d.responseJSON.messages[0].message);
          } else {
            displayMessage($('div.form-signin'), 'error', true);
          }
        }
      });
    }
    return false;
  };

  $scope.checkPwStrength = function(e) {
    var _pw = $(e.currentTarget).val();
    if(_pw.length < 8) {
      $('.pwStrength').hide();
      $('#pwShort').show();
    } else {
      var _pwStrength = 0;
      var _pwLower = /^(?=.*[a-z])/;
      var _pwUpper = /^(?=.*[A-Z])/;
      var _pwSpecial = /^(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/])/;
      if(_pwUpper.test(_pw)) { // uppercase
        _pwStrength++;
      }
      if(_pwLower.test(_pw)) { // lowercase
        _pwStrength++;
      }
      if(_pwSpecial.test(_pw)) { // special character
        _pwStrength++;
      }
      $('.pwStrength').hide();
      if(_pwStrength == 0 || _pwStrength == 1) {
        $('#pwWeak').show();
      } else if(_pwStrength == 2) {
        $('#pwGood').show();
      } else {
        if(_pwStrength == 3) {
          $('#pwStrong').show();
        }
      }
    }
    $('#pwStrength').show();
  };

  $scope.help = function(e) {
    $location.path('/help').replace();
    //$scope.$apply();
  };

  if(userInfo.verifyLogin(true)) {
    $location.path('/dashboard').replace();
  } else {
    $scope.setupLogin();
  }

}]);