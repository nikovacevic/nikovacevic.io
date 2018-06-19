(function () {
  UI = {};
  UI.viewportHeight = $(window).height();
  UI.viewportWidth = $(window).width();
  UI.fullScreenNav = $("nav#full-screen-nav");
  UI.headerNav = $("header>nav");

  UI.init = function () {
    if (location.href.indexOf("#") >= 0) {
      // Find the name of the anchor
      let n = location.href.substr(location.href.indexOf("#")+1);
      // Find the anchor by name, if it exists
      let a = document.querySelector('a[name="'+n+'"]');
      if (!a) {
        return;
      }
      // Set y value as y-value of the anchor, offset by the header height
      let y = a.offsetTop;
      y -= UI.headerNav.height() + 10;
      // Scroll to the y position
      window.scrollTo(0, y);
    }

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
