// Functions for login and registration page (/user/login or /user/register)

$(() => {
  // On document ready

  // Define constants
  const $toggle = $('nav.toggle');
  const $loginForm = $toggle.siblings('.login');
  const $registerForm = $toggle.siblings('.register');

  $toggle.on('click', '#login', (e) => {
    $(e.target).addClass('active');
    $(e.target).next().removeClass('active');
    $loginForm.show();
    $registerForm.hide();
  });

  $toggle.on('click', '#register', (e) => {
    $(e.target).addClass('active');
    $(e.target).prev().removeClass('active');
    $registerForm.show();
    $loginForm.hide();
  });

  const verifyInputNotEmpty = ($form) => {
    for (input of $form.find(`input[type='text']`)) {
      console.log($(input).val());
      if ($(input).val().length === 0) {
        throw new Error('All fields are required and cannot be empty');
      }
    }
    if ($form.find(`input[type='password']`).val().length < 5) {
      throw new Error('Please choose a password at least 5 characters long');
    }
  };

  const ajaxLoginHandler = ($form, procedure) => {
    try {
      verifyInputNotEmpty($form);
      $.ajax(`/user/${procedure}`, { method: 'POST', data: $form.serialize() })
        .then(// Successful
          () => {
            window.location.href = '/';
          }
        ).catch(err => {
          throw new Error(err.responseText);
        })
    } catch (err) {
      console.log(err.message);
      $form.find('div.error-message').append(err.message);
    };
  };

  $loginForm.on('submit', (e) => {
    e.preventDefault();
    ajaxLoginHandler($registerForm, 'login');
  });

  $registerForm.on('submit', (e) => {
    e.preventDefault();
    ajaxLoginHandler($registerForm, 'register');
  });

})
