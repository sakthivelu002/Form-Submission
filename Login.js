var name;
var gender;
var number;

var uname = '';

function registerfirstvalid()
{
  name = $('#InputName1').val();
  gender = $('input[name="gender"]:checked').val();
  number = $('#InpuNumber1').val();

  console.log(name,gender,number);
  $.ajax({
    type: "GET",
    url: "pwd.html",
    success: function(data) {
      $('#dynBody').html(data);
    },
    error:function(response){
      alert('Data Fetch Failed');
    }
  })
}

/*
  $.get('pwd.html',function(data) {
      $('#dynBody').html(data);
    });

$.ajax({
  dataType: "json",
  url: url,
  data: data,
  success: success
});
*/

function registertwovalid(){

  console.log(name,gender,number);

  var email = $('#InputEmail1').val();
  var pwd = $('#InputPassword1').val();

  console.log('CAPTURE COMPLETE', name, gender, email, number, pwd);

  $.getJSON('users.json', function(data) {
    //ADDING USER
    var addData = {
      [name]: {
        "name": name,
        "gender": gender,
        "number": number,
        "email": email,
        "pwd": pwd
      }
    };
    $.extend(true, data, addData);

    console.log('GET COMPLETE', addData, data);

    //SAVING EDITED DATA
    var newData = JSON.stringify(data);

    jQuery.post('Signup.php', {
        newData: newData
    });
    console.log('SAVE COMPLETE');
    window.location = "index.html";
  });

}
/*
function SubmitLoginResponse()
{
  $("form[name='login']").validate({
    rules:{
      email:{
        required: true,
        email: true
      },
      pwd:{
        minlength: 5,
        required :true
      }
    },
      messages: {
        email: {
            required : "Email is required",
            email: "Enter Complete address"
        },
        pwd: {
          minlength: "Passwords must be atleast 5 characters long",
          required: "Password is Required"
        },
    },
    submitHandler: function(form) {
        loginValid();
      }});
      return false;
}
*/
function SubmitFirstResponse()
{
  uname = '';
  $("form[name='registration']").validate({
    rules: {
      name1: "required",
      gender: "required",
      number: {
        required: true,
        minlength: 10,
        maxlength: 10
      }
    },
    messages: {
      name1: "Please enter Name",
      gender: "Please Select One Gender",
      number: {
        required: "Please provide a number",
        minlength: "Mobile Number Should be 10-digit",
        maxlength:"Mobile Number Should not exceed 10-digit"
      }
     },
    submitHandler: function(form) {
          registerfirstvalid();
        }});
      return false;
}

function SubmitSecondResponse()
{
  $("form[name='registration']").validate({
    rules: {
          email: {
            required: true,
            email: true
          },
          pwd1:{
            minlength: 5,
            required :true
          },
          InputPassword1: {
            required: true,
          },
          pwd2:{
            equalTo: "#InputPassword1",
            required: true,
            minlength: 5
          }
        },

  messages: {
            email: {
                required : "Enter Mail",
                required: "Enter Complete address"
            },
            pwd1: {
              minlength: "Passwords must be atleast 5 characters long",
              required: "Password is Required"
            },
            InputPassword1:{
                required: "Password is Required"
            },
            pwd2: {
               equalTo: "Passwords doesn't match",
               required: "Password is required",
               minlength: "Passwords must be atleast 5 characters long"
            }
        },
        submitHandler: function(form) {
            registertwovalid();
          }});
          return false;
  }

/*
function validatePassword() {
        var validator = $("#loginForm").validate({
            rules: {
                password: "required",
                confirmpassword: {
                    equalTo: "#password"
                }
            },
            messages: {
                password: " Enter Password",
                confirmpassword: " Enter Confirm Password Same as Password"
            }
        });
        if (validator.form()) {
            alert('Sucess');
        }
    }
*/
function loginValid() {

  var email = $('#InputEmail').val();
  var pass = $('#InputPass').val();
  var flag = 0;
  var adminval = 0;

  console.log("Display Success",email,pass);

  $('#loginerror').html("");

  $.getJSON('users.json', function(data) {

      try{
            $.each( data, function( index, details)
            {
              console.log("Fetch Success");

              if(data[index].email == email && data[index].pwd == pass)
              {
                if(data[index].email =="admin@site.com" && data[index].pwd == "Password#13")
                {
                  console.log("Admin login Success");
                  adminval = 1;
                }
                console.log("Success");
                flag = 1;
              }
            });
            if(flag == 0){
              alert('login error');
              $('#loginerror').html("Invalid Username/Password");
            }
            else if(flag == 1){
              window.location = "form.html";
            }
            if(adminval == 1)
            {
              console.log("Admin Val Check Status");
              window.location = "Search.html";
            }
          }
      catch (e){
        console.log("Error");
      }
  });

}