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
        console.log(weekly.data)
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
        vm.weekly = updated
        $state.go('weekly')
      })
      .catch(err => console.log(err))
    }
  }
})();
