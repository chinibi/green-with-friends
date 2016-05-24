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

    function checkbox(challenge) {
      var completed = vm.weekly.challenges[vm.weekly.challenges.indexOf(challenge)].completed;

      completed = !completed

      // WeeklyResource.update({username: req.decoded.username}, vm.weekly).$promise.then(updated => {
      //   vm.weekly = updated;
      //   $state.go('weekly')
      // })

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
  }
})();
