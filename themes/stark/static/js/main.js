(function () {
  UI = {};
  UI.viewportHeight = $(window).height();
  UI.viewportWidth = $(window).width();
  UI.fullScreenNav = $("nav#full-screen-nav");
  UI.headerNav = $("header>nav");

  UI.init = function () {
    // Remove loading state
    setTimeout(function () {
      $("main, body").removeClass('loading');
    }, 200)
  }

  UI.toggleFullScreenNav = function (nav) {
    nav.toggleClass('visible');
    $("header").toggleClass('scrolling', nav.hasClass('visible'));
  }

  $('.toggle-menu').click(function (e, ui) {
    UI.toggleFullScreenNav(UI.fullScreenNav);
  });

  $(window).scroll(function (e, ui) {
    if ($(document).scrollTop() > 30) {
      $('header').addClass('scrolling');
    } else {
      $('header').removeClass('scrolling');
    }
  });

  UI.fullScreenNav.find('a').click(function (e, ui) {
    UI.toggleFullScreenNav(UI.fullScreenNav);
  });
})();

$(document).ready(function () {
  UI.init();
});
