(function() {
  "use strict";

  angular
    .module("app")
    .controller("WeeklyController", WeeklyController);

  WeeklyController.$inject = ["$state", "$http"]

  function WeeklyController($state, $http) {
    var vm = this;

    vm.weekly       = [];
    vm.challenge    = {};
    vm.getWeekly    = getWeekly;
    vm.checkbox     = checkbox;
    vm.allDone      = false;
    vm.checkAllDone = checkAllDone;
    vm.awardBadge   = awardBadge
    vm.goToProfile  = goToProfile;

    getWeekly();

    function getWeekly() {
      $http({
        method: 'GET',
        url: "/api/weekly",
      })
      .then(function(weekly) {
        vm.weekly = weekly.data;
      })
    }

    function changeCompletion(challenge) {
      var completed = vm.weekly.challenges[vm.weekly.challenges.indexOf(challenge)].completed;

      completed = !completed

      $http({
        method: 'PUT',
        url: '/api/weekly',
        data: vm.weekly
      })
      .then(function(updated) {
        vm.weekly = updated.data.weekly[0]
        $state.go('weekly')
      })
    }

    function checkAllDone() {
      vm.allDone = (vm.weekly.challenges.every(function(challenge) {
        return challenge.completed
      }))
    }

    function checkbox(challenge) {
      changeCompletion(challenge);
      checkAllDone();
    }

    function awardBadge() {
      $http({
        method: 'POST',
        url: '/api/users/me',
        data: vm.weekly
      })
    }

    function goToProfile() { // ui-sref won't work on bootstrap modals
      $state.go('profile')
    }



  }
})();
