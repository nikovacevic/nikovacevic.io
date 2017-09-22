if (!UI) {
  var UI = {};
}
(function () {
  // On click of menu button, toggle menu
  var btn = document.getElementById("nav-button");
  btn.onclick = function () {
    var headerNav = document.getElementById("header-nav");
    var primaryNav = document.getElementById("primary-nav");
    var secondaryNav = document.getElementById("secondary-nav");
    primaryNav.classList.toggle("hidden-sm");
    secondaryNav.classList.toggle("hidden-sm");
    headerNav.classList.toggle("secondary");
  };
})();
