// Functions for login and registration page (/user/login or /user/register)

const { format } = require("morgan");

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

  $loginForm.on('submit', async (e) => {
    e.preventDefault();
    // VAlidation code here
    //
    const valid = true;
    //
    //
    if (valid) {
      const result = await $.ajax('/user/login', {method: 'POST', data: $loginForm.serialize()});
    };
  });

  $registerForm.on('submit', async (e) => {
    e.preventDefault();
    // VAlidation code here
    //
    const valid = true;
    //
    //
    if (valid) {
      const result = await $.ajax('/user/register', {method: 'POST', data: $registerForm.serialize()});
    };
  });

})
