(function() {
  "use strict";

  angular
    .module("app")
    .controller("WeeklyController", WeeklyController);

  WeeklyController.$inject = ["$state", "$http", "$window", "WeeklyResource", "userService"]

  function WeeklyController($state, $http, $window, WeeklyResource, userService) {
    var vm = this;

    vm.weekly = [];
    vm.challenge = {};
    vm.getWeekly = getWeekly;
    vm.checkbox = checkbox;
    vm.allDone = false;
    vm.checkAllDone = checkAllDone;

    getWeekly();
    function getWeekly() {
      $http({
        method: 'GET',
        url: "/api/weekly",
      })
      .then(weekly => {
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
      .then(updated => {
        console.log('FRONTEND RESPONSE')
        console.log(updated)
        console.log(updated.data.weekly[0])
        vm.weekly = updated.data.weekly[0]
        $state.go('weekly')
      })
    }

    function checkAllDone() {
      var done = true;
      vm.weekly.challenges.forEach(challenge => {
        console.log('challenge complete: ' + challenge.completed)
        if (!challenge.completed) {done = false}
        console.log('allDone: ' + done)
      })
      vm.allDone = done
    }

    function checkbox(challenge) {
      changeCompletion(challenge);
      checkAllDone();
    }

  }
})();
