(function() {
  'use strict';

  angular
    .module('app')
    .controller('FriendsController', FriendsController);

  FriendsController.$inject = ["$state", "$http", "userService"];

  function FriendsController($state, $http, userService) {
    var vm = this;

    vm.friendRequests = [];
    vm.friendList = [];
    vm.friendRequestUsername = '';
    vm.friendRequestBody = {};
    vm.newRequest = newRequest;
    vm.acceptRequest = acceptRequest;

    getFriends();
    function getFriends() {
      userService.me()
        .then(user => {
          console.log(user)
          vm.friendRequests = user.data.data.friendRequests
          vm.friendList = user.data.data.friends;
        })
    }

    function newRequest() {
      vm.friendRequestBody.username = vm.friendRequestUsername;
      $http({
        method: 'POST',
        url: '/api/users/friends/new',
        data: vm.friendRequestBody
      })
      .then(() => {
        vm.friendRequestUsername = '';
        alert('friend request submitted')
      })
    }

    function acceptRequest(invite) {
      $http({
        method: 'POST',
        url: '/api/users/friends/accept',
        data: invite
      })
      .then(newFriend => {
        vm.friendRequests.splice(vm.friendRequests.indexOf(invite), 1);
        vm.friends.unshift(newFriend);
      })
    }

  }
})();
