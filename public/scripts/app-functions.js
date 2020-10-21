// Use this file for functions that will be invoked on multiple pages in Quokka.

//Copy to clipboard - the text of an element:
const copyToClipboardElement = function (element) {
  const $container = $('<input>');
  $('body').append($container);
  $container.val($(element).text()).select();
  document.execCommand('copy');
  $container.remove();
};

