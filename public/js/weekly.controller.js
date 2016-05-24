(function() {
  "use strict";

  angular
    .module("app")
    .controller("WeeklyController", WeeklyController);

  WeeklyController.$inject = ["$state", "WeeklyResource"]

  function WeeklyController($state, WeeklyResource) {
    var vm = this;

    vm.weekly = [];
    vm.challenge = {};
    vm.getWeekly = getWeekly;
    vm.checkbox = checkbox;

    getWeekly();
    function getWeekly() {
      WeeklyResource.get().$promise
        .then(weekly => {
          vm.weekly = weekly
        })
    }

    function checkbox(challenge) {
      var completed = vm.weekly.challenges[vm.weekly.challenges.indexOf(challenge)].completed;

      completed = !completed

      WeeklyResource.update({id: "574381becd7bc0b87359dfd4"}, vm.weekly).$promise.then(updated => {
        vm.weekly = updated;
        $state.go('weekly')
      })
    }
  }
})();
