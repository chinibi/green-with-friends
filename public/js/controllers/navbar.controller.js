(function() {
  "use strict";

  angular
    .module("app")
    .controller("NavbarController", NavbarController);

  NavbarController.$inject = ["$http", "$log", "$state", "authService", "userService"];

  function NavbarController($http, $log, $state, authService, userService) {
    var vm = this;

    vm.authService = authService;
    vm.goToProfile = goToProfile;

    $log.info("NavbarController loaded!");


    function goToProfile() {
      $state.go('profile');
    }
  }
})();
