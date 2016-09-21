if (!NikovacevicIO) {
  // Publicly-available, globally-scoped object
  var NikovacevicIO = {};
}
(function () {

  //////////////////////////////////////////////////////////////////////////////
  // Components

  var UI;
  // UI functions and objects
  UI = {};

  UI.navTitleDropdownButton = document.getElementById("nav-title-dropdown-button");
  UI.navTitleDropdownMenu = document.getElementById("nav-title-dropdown-menu");

  //////////////////////////////////////////////////////////////////////////////
  // Functions

  // Toggle the nav drop-down links, leading to subdomains
  UI.toggleNavDropdown = function () {
    if (UI.navTitleDropdownMenu.classList.toggle('hidden')) {
      console.log("Show");
      UI.navTitleDropdownButton.innerHTML = "&#x25BC;";
      console.log(UI.navTitleDropdownButton.innerHTML);
    } else {
      console.log("Hide");
      UI.navTitleDropdownButton.innerHTML = "&#x25B2;";
      console.log(UI.navTitleDropdownButton.innerHTML);
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Events

  UI.navTitleDropdownButton.addEventListener("click", UI.toggleNavDropdown);

})();
