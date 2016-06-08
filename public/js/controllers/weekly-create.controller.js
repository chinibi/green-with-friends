(function() {
  "use strict";

  angular
    .module("app")
    .controller("WeeklyCreateController", WeeklyCreateController);

  WeeklyCreateController.$inject = ["$timeout", "$state", "$http"];

  function WeeklyCreateController($timeout, $state, $http) {
    var vm = this;

    vm.newWeekly   = {};
    vm.badge       = '';
    vm.description = '';
    vm.imgURL      = '';
    vm.challenges  = [];
    vm.addChallengeField    = addChallengeField;
    vm.removeChallengeField = removeChallengeField;
    vm.createWeekly         = createWeekly;

    // animations whoaaaaa
    vm.hideThis = hideThis;
    vm.showThis = showThis;

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
        hideThis();
        $timeout(showThis, 500)
        $timeout(() => {
          $state.go('welcome')
        }, 2000)
      });
    }

    function hideThis() {
      vm.startFade = true;
      $timeout(() => {
        vm.hidden = true;
      }, 500)
    }

    function showThis() {
      vm.startEmerge = true;
      $timeout(() => {
        vm.emerge = true;
      }, 500)
    }

  }
})();
