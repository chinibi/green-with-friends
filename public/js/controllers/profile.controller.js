(function () {

  angular
    .module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$http'];

  function ProfileController($http, $window, userService) {
    var vm = this;

    vm.badges = [];

    showBadges();
    function showBadges() {
      $http({
        method: 'GET',
        url: '/api/users/me',
      })
      .then(function(user) {
        vm.badges = user.data.data.badges;
      });
    }
  }
})();
