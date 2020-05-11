
(function ($) {
    "use strict";


    /*==================================================================
   [ Focus input ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        if (check) {
            login(input[0].value, input[1].value);
        }
        return false;
    });

    $(document).ready(function ($) {
        $(document).on('submit', '#submit-form', function (event) {
            event.preventDefault();

            alert('page did not reload');
        });
    });



    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    function login(username, password) {
        fetch("http://127.0.0.1:3000/login", { method: "POST", body: JSON.stringify({ username, password }), headers: { "Accept": "application/json", "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }).then(resp => resp.json().then(resp => {

            if (resp.status == "fail") {
                console.log(resp.status);
                return alert(resp.message);
            }

            else {
                location.href = "/perfil.html";
            }

        }));
    }

})(jQuery);