$(function () {
  UI = {};
  UI.toggleFullScreenNav = function (nav) {
    nav.toggleClass('visible');
    $("header>nav").toggleClass('scrolled', nav.hasClass('visible'));
  }
  $('.toggle-menu').click(function () {
    var nav = $("nav#full-screen-nav");
    UI.toggleFullScreenNav(nav);
  });
});
