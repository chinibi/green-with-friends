(function() {
  "use strict";

  angular
    .module("app")
    .config(appRoutes);

  appRoutes.$inject = ["$urlRouterProvider", "$stateProvider"];

  function appRoutes($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state("welcome", {
        url:         "/",
        templateUrl: "/js/templates/welcome.html"
      })
      .state("signin", {
        url:          "/signin",
        templateUrl:  "/js/templates/signin.html",
        controller:   "SignInController",
        controllerAs: "vm"
      })
      .state("profile", {
        url:         "/profile",
        templateUrl: "/js/templates/profile.html",
        controller:  "ProfileController",
        controllerAs: "pc"
      })
      .state("weekly", {
        url:          "/weekly",
        templateUrl:  "/js/templates/weekly.html",
        controller:   "WeeklyController",
        controllerAs: "wc"
      })
      .state("weekly-new", {
        url:          "/new-weekly",
        templateUrl:  "/js/templates/weekly-create.html",
        controller:   "WeeklyCreateController",
        controllerAs: "wcc"
      });

    $urlRouterProvider.otherwise("/");
  }

})();
