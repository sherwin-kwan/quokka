// Use this file for functions that will be invoked on multiple pages in Quokka.

//Copy the text content of an element to clipboard:
const copyToClipboardElementText = function (element) {
  const $container = $('<input>');
  $('body').append($container);
  $container.val($(element).text()).select();
  document.execCommand('copy');
  $container.remove();
};

//Copy any provided string to clipboard:
const copyToClipboardAnyString = function (string) {
  const $container = $('<input>');
  $('body').append($container);
  $container.val(string).select();
  document.execCommand('copy');
  $container.remove();
};
