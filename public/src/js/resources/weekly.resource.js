(function() {
  angular.module('app')
    .factory("WeeklyResource", WeeklyResource);

  WeeklyResource.$inject = ['$resource'];

  function WeeklyResource($resource) {
    return $resource(
      "/api/weekly", {},
      {
        'update': { method: 'PUT'}
      }
    );
  }
})();
