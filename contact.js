
(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })


    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })    
    })

    /*==================================================================
    [ Validate ]
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });
    */

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
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
    
    function getFormData(form) {
        var elements = form.elements;
    
        var fields = Object.keys(elements).filter(function(k) {
              return (elements[k].name !== "honeypot");
        }).map(function(k) {
          if(elements[k].name !== undefined) {
            return elements[k].name;
          // special case for Edge's html collection
          }else if(elements[k].length > 0){
            return elements[k].item(0).name;
          }
        }).filter(function(item, pos, self) {
          return self.indexOf(item) == pos && item;
        });
    
        var formData = {};
        fields.forEach(function(name){
          var element = elements[name];
          
          // singular form elements just have one value
          formData[name] = element.value;
    
          // when our element has multiple items, get their values
          if (element.length) {
            var data = [];
            for (var i = 0; i < element.length; i++) {
              var item = element.item(i);
              if (item.checked || item.selected) {
                data.push(item.value);
              }
            }
            formData[name] = data.join(', ');
          }
        });
    
        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
        formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default
    
        //console.log(formData);
        return formData;
      }

    $('#gform').on( "submit", function(event) {
        event.preventDefault();
        var input = $('.validate-input .input100');
        var valid = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                valid = false;
            }
        }

        if(valid) {
            var form = event.target;
            var data = getFormData(form);
            
            var contact = {};
            contact.email = data.email;
            contact.first_name = data.name;
            contact.company = data.organization;
            contact.phone = data.phone;
            contact.webnote = data.message;
            contact.tags = "Website Contact";

            _agile.create_contact(contact, {
                success: function (data) {
                    console.log("success");
                },
                error: function (data) {
                    console.log("error");
                }
            });
            $.post(form.action, getFormData(form));
            $('#gform').hide();
            $('#success').attr('class', 'd-block');
        } else {
            return false;
        }
    });

    $('.modal').on('hidden.bs.modal', reset);

    function reset(){
        $('#gform').show(); $('#success').attr('class', 'd-none');
        $('#gform').trigger("reset");
        $('.validate-form .input100').each(function(){
            $(this).removeClass('has-val');
            hideValidate(this);
            $('.true-validate').removeClass('true-validate')
        });
    }
})(jQuery);