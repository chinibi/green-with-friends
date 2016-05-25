(function () {
  'use strict';

  angular
    .module('app')
    .factory("userService", userService);

  userService.$inject = ["$log", "$http", "$window"];

  function userService($log, $http, $window) {
    $log.info("user service loaded!");

    var service = {
      create: create,
      me:     me
    };
    return service;

    function create(data) {
      var promise = $http({
        method: 'POST',
        url:    '/api/users',
        data:   data
      });

      return promise;
    }

    function me() {
      var token = $window.localStorage.getItem('shmee-banana');

      var promise = $http.get('/api/users/me',
      {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
      })

      return promise;
    }

  }

})();
