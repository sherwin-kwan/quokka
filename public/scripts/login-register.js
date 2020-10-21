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

  $loginForm.on('submit', (e) => {
    e.preventDefault();
    // VAlidation code here
    //
    const valid = true;
    //
    //
    if (valid) {
      $.ajax('/user/login', { method: 'POST', data: $loginForm.serialize() })
        .then(// Successful
          (data, status, xhr) => {
            window.location.href = '/';
          }
        )
        .catch(err => {
          alert(err.responseText);
        });
    };
  });

  $registerForm.on('submit', (e) => {
    e.preventDefault();
    // VAlidation code here
    //
    const valid = true;
    //
    //
    if (valid) {
      $.ajax('/user/register', { method: 'POST', data: $registerForm.serialize() })
        .then(// Successful
          (data, status, xhr) => {
            window.location.href = '/';
          }
        )
        .catch(err => {
          alert(err.responseText);
        });
    };
  });

})
