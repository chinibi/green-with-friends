(function () {

  angular
    .module('app')
    .controller('ProfileController', ProfileController)

  ProfileController.$inject = ['$http', '$window', 'userService']

  function ProfileController($http, $window, userService) {
    var vm = this;
    var token = $window.localStorage.getItem('shmee-banana');

    vm.user = null;

    userService.me()
      .then(user => vm.user = user.data)
  }
})();
