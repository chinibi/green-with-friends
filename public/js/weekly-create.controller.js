(function() {
  "use strict";

  angular
    .module("app")
    .controller("WeeklyCreateController", WeeklyCreateController);

  WeeklyCreateController.$inject = ["$state", "$http"];

  function WeeklyCreateController($state, $http) {
    var vm = this;

    vm.newWeekly   = {};
    vm.badge       = '';
    vm.description = '';
    vm.imgURL      = '';
    vm.challenges  = [];
    vm.addChallengeField    = addChallengeField;
    vm.removeChallengeField = removeChallengeField;
    vm.createWeekly         = createWeekly;

    for (var i=1; i<=4; i++) {
      vm.challenges.push({
        description: ''
      });
    }

    function addChallengeField() {
      vm.challenges.push({
        description: ''
      });
    }

    function removeChallengeField(remove) {
      vm.challenges = vm.challenges.filter(challenge => {
        return challenge != remove
      })
    }

    function createWeekly() {
      vm.newWeekly = {
        badge: vm.badge,
        description: vm.description,
        imgURL: vm.imgURL,
        challenges: vm.challenges
      };

      $http({
        method: "POST",
        url: '/api/weekly',
        data: vm.newWeekly
      })
      .then(() => {
        vm.newWeekly = {};
        alert('new weekly created');
        $state.go('welcome');
      });
    }

  }
})();
