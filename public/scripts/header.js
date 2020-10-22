const MOBILEHAMWIDTH = '-66.93vw'

$(() => {
  //on document ready

  //get ham-open button
  $hamOpen = $('#ham-menu-open');
  //get ham-close button
  $hamClose = $('#ham-menu-close');
  //get mainlinks
  $hamMenu = $('#main-header-links');

  //TODO: add conditionals to show links on desktop, and only use hamburger on mobile
  console.log($hamMenu);
  //define open onclick
  $hamOpen.click(() => {
    console.log("open!");
    $hamMenu.removeClass('closed');
    $hamMenu.addClass('open');
  });
    //change style right:0
  //define close function
  $hamClose.click(()=> {
    console.log("close!");
    // $hamMenu.css('right', MOBILEHAMWIDTH);
    $hamMenu.removeClass('open');
    $hamMenu.addClass('closed');
  });
    //change style right:-67vw
});