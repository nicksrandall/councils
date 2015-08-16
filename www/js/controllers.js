// Controllers for the CouncilsApp
angular.module('councilsApp')

.controller("ApplicationController", function(MODALS, $ionicHistory, $scope, $ionicModal, $ionicSideMenuDelegate, Auth, $state) {

  $scope.viewConfig = {
    currentCouncilId: 0,
    currentCouncilTab: "discussion"
  };

  $scope.logout = function () {
    Auth.$unauth();
    return $state.go('simple.welcome');
  };

  $scope.back = function() {
    $ionicHistory.goBack();
  };
})

.controller('LoginController', function ($scope, Auth, $state, $localstorage) {
  $scope.credentials = {
    email: $localstorage.get('email')
  };
  $scope.login = function () {
    Auth.$authWithPassword({
      email: $scope.credentials.email,
      password: $scope.credentials.password
    }).then(function(authData) {
      $localstorage.set('email', $scope.credentials.email);
      $state.go('menu.home');
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  };
})

.controller('SetupController', function($scope, $http, me, $state, $q) {
  $scope.credentials = {};
  $scope.ldsLogin = function () {
    $http.post('http://councils-app.herokuapp.com/api/me', $scope.credentials)
      .then(function (response) {
        me.set(response.data);
        $state.go('simple.create');
      });
  };
})

.controller('CreateController', function ($scope, me, Auth, $firebaseObject, $state, $ionicPopup) {
  var ref = new Firebase('https://councilsapp.firebaseio.com/users');
  var users = $firebaseObject(ref);
  $scope.me = me.get();
  $scope.createAccount = function () {
    var home, uid;
    Auth.$createUser({
        email: $scope.me.email,
        password: $scope.me.pass
      })
      .then(function(userData) {
        uid = userData.uid;
        users[uid] = home = me.get().homeUnitNbr;
        return users.$save();
      })
      .then(function () {
        var ref = new Firebase('https://councilsapp.firebaseio.com/'+home+'/users');
        var members = $firebaseObject(ref);
        members[uid] = me.get();
        return members.$save();
      })
      .then(function () {
        return Auth.$authWithPassword({
          email: $scope.me.email,
          password: $scope.me.pass
        });
      })
      .then(function (authData) {
        $state.go('menu.home');
      })
      .catch(function(error) {
        var alertPopup = $ionicPopup.alert({
           title: 'Error',
           template: error
         });
         alertPopup.then(function(res) {
           $scope.me.pass = '';
         });
      });
  };
})

.controller("HomeController", function($scope, User, currentAuth, $firebaseObject, $firebaseArray) {
  $scope.myAssignments = [];
  $scope.delegatedAssignments = [];
  $scope.discussions = [];

  $scope.update = function (val) {
    if (val._completed) {
      val._cancel = setTimeout(function () {
        val.completed = true;
        val.$save();
      }, 15000);
    } else {
      clearTimeout(val._cancel)
    }
  };

  $scope.councils = ["Bishopric", "Ward Council"];

  User.set(currentAuth.uid)
    .then(function (user) {
      return user.$bindTo($scope, 'user');
    })
    .then(function () {
      var assignments = new Firebase('https://councilsapp.firebaseio.com/'+$scope.user.homeUnitNbr+'/assignments');
      var discussions = new Firebase('https://councilsapp.firebaseio.com/'+$scope.user.homeUnitNbr+'/discussions');

      assignments.orderByChild('assignedTo')
        .equalTo($scope.user.$id)
        .on('child_added', function(snapshot) {
          $scope.myAssignments.push($firebaseObject(snapshot.ref()));
        });

      assignments.orderByChild('assignedBy')
        .equalTo($scope.user.$id)
        .on('child_added', function(snapshot) {
          $scope.delegatedAssignments.push($firebaseObject(snapshot.ref()));
        });

      _.forEach($scope.user.discussions, function (item) {
        var child = discussions.child(item);
        $scope.discussions.push($firebaseObject(child));
      });
    });
})

.controller('DirectoryController', function ($scope, $firebaseArray, $cordovaSms, $cordovaEmailComposer) {
  var ref = new Firebase('https://councilsapp.firebaseio.com/538469/members');
  var scrollRef = new Firebase.util.Scroll(ref, 'surname');
  $scope.members = $firebaseArray(scrollRef);
  scrollRef.scroll.next(25);

  $scope.loadMore = function() {
    // load the next contact
    scrollRef.scroll.next(25);
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };
  
  $scope.email = function (item) {
    $cordovaEmailComposer.isAvailable().then(function() {
       // is available
       var email = {
          to: item.email,
        };

       $cordovaEmailComposer.open(email).then(null, function () {
         // user cancelled email
       });

     }, function () {
       // not available
     });
  };

  $scope.call = function (item) {
    window.location.href='tel:'+item.phone.replace(/\W/, '');
  };
  
  $scope.message = function (item) {
    $cordovaSms
      .send(item.phone.replace(/\W/, ''), '', {})
      .then(function() {
        // Success! SMS was sent
      }, function(error) {
        // An error occurred
      });
  };
})

.controller("AgendaDetailController", function ($scope, $firebaseObject, $firebaseArray, $stateParams, $timeout, AGENDAS, $state, MembersModal) {
  $scope.council = $stateParams.council || 'Bishopric';
  $scope.week = parseInt($stateParams.week);
  $scope.currentWeek = moment().isoWeek();

  if ($scope.council) {
    var ref = new Firebase('https://councilsapp.firebaseio.com/538469/agendas').child($scope.council);
    $scope.availableAgendas = $firebaseArray(ref);
    $scope.openMembersModal = function(dataStore, max) {
      MembersModal.openModal(max, $scope.data[dataStore]).then(function(result) {
        $scope.data[dataStore] = max ===1 ? _.pick(result[0], ['fname', 'lname']) : result.map(function (item) { return _.pick(item, ['fname', 'lname']); });
      });
    };
    var ref = new Firebase('https://councilsapp.firebaseio.com/538469/agendas').child($scope.council).child($scope.week);
    var obj = $firebaseObject(ref);
    obj.$bindTo($scope, 'data')
      .then(function () {
        $timeout(function () {
          angular.element('[auto-resize]').each(function(){ autosize(this); });
        });
      }); 
  } else {
    $state.go('menu.agenda.list');
  }

})

.controller("AgendaController", function(
  $scope,
  HymnService,
  AGENDAS,
  MemberService
) {

  $scope.members = MemberService.getMembers();
  $scope.hymns = HymnService.getList();
  $scope.agendas = AGENDAS;
  $scope.agendaAccess = { "5":true,"6":true,"7":true };

})

.controller("CouncilDiscussionController", function($scope, $stateParams, $state, $firebaseArray, User, MembersModal, $ionicModal, MODALS, Notify) {
    $scope.council = $stateParams.council || 'Bishopric';
    
    if ($scope.council) {

      $ionicModal.fromTemplateUrl(MODALS['createDiscussion'], {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.openModal = function() {
        console.log('open modal');
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      //Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });

      $scope.openMembersModal = function(dataStore, max) {
        MembersModal.openModal(max, $scope.data[dataStore]).then(function(result) {
          $scope.data[dataStore] = max ===1 ? _.pick(result[0], ['fname', 'lname', 'profileImage', '$id', 'tokens']) : result.map(function (item) { return _.pick(item, ['fname', 'lname', 'profileImage', '$id', 'tokens']); });
        });
      };

      var promise = User.get()
        .then(function (me) {
          var ref = new Firebase('https://councilsapp.firebaseio.com/').child(me.homeUnitNbr).child('discussions').orderByChild('council').equalTo($scope.council);;
          $scope.discussions = $firebaseArray(ref);
          return me;
        });

      $scope.data = {
        content: '',
        discussionParticipants: []
      };

      $scope.createDiscussion = function () {
        var creator, discussion, tokens = [];
        promise
          .then(function (me) {
            creator = me;
            discussion = {
              content: $scope.data.content,
              createdBy: me.$id,
              createdDate: new Date().toISOString(),
              userAvatar: me.profileImage,
              userName: me.fname + ' ' + me.lname
            };
            return $scope.discussions.$add(discussion);
          })
          .then(function (ref) {
            var id = ref.key();
            var users = new Firebase('https://councilsapp.firebaseio.com/'+creator.homeUnitNbr+'/users/');
            users.child(creator.$id+'/discussions').push({
              council: $scope.council,
              key: id
            });
            _.forEach($scope.data.discussionParticipants, function (user) {
              if (user.tokens) {
                _.forEach(user.tokens, function (token) {
                  tokens.push(token.token);
                });
              }
              users.child(user.$id+'/discussions').push({
                council: $scope.council,
                key: id
              });
            });
            $scope.modal.hide();
          })
          .then(function () {
            return Notify.send(creator.fname + ' ' + creator.lname + ' just added you to a discussion for '+$scope.council, tokens);
          });
      };

    } else {
      $state.go('menu.council.list');
    }
})

.controller("CouncilAssignmentController", function($scope, $stateParams, $state, MembersModal, $firebaseArray, User, $ionicModal, MODALS, Notify) {
    $scope.council = $stateParams.council || 'Bishopric';

    $scope.update = function (val) {
      return $scope.assignments.$save(val.$id);
    };

    if ($scope.council) {

      $ionicModal.fromTemplateUrl(MODALS['createAssignment'], {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function() {
        $scope.modal.show();
      };
      console.log($scope.openModal);
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      //Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });

      $scope.datePickerCallback = angular.noop;

      $scope.openMembersModal = function(dataStore, max) {
        MembersModal.openModal(max, $scope.data[dataStore]).then(function(result) {
          $scope.data[dataStore] = max ===1 ? _.pick(result[0], ['fname', 'lname', 'profileImage', '$id', 'tokens']) : result.map(function (item) { return _.pick(item, ['fname', 'lname', 'profileImage', '$id', 'tokens']); });
        });
      };

      $scope.data = {
        dueDate: new Date(),
        assignmentParticipants: [],
        assignmentAssignee: null,
        content: ''
      };

      var promise = User.get()
        .then(function (me) {
          var ref = new Firebase('https://councilsapp.firebaseio.com/').child(me.homeUnitNbr).child('assignments').orderByChild('council').equalTo($scope.council);
          $scope.assignments = $firebaseArray(ref);
          return me;
        });

      $scope.createAssignment = function () {
        var creator, assignment, tokens = [];
        
        promise
          .then(function (me) {
            creator = me;

            assignment = {
              createdBy: creator.$id,
              assignedTo: $scope.data.assignmentAssignee,
              dueDate: $scope.data.dueDate.toISOString(),
              content: $scope.data.content,
              completed: false,
              participants: $scope.data.assignmentParticipants
            };

            return $scope.assignments.$add(assignment);
          })
          .then(function (ref) {
            var id = ref.key();
            var users = new Firebase('https://councilsapp.firebaseio.com/'+creator.homeUnitNbr+'/users/');
            users.child(creator.$id+'/assignments').push({
              council: $scope.council,
              key: id
            });
            users.child($scope.data.assignmentAssignee.$id+'/assignments').push({
              council: $scope.council,
              key: id
            });
            if ($scope.data.assignmentAssignee.tokens) {
              _.forEach($scope.data.assignmentAssignee.tokens, function (token) {
                tokens.push(token.token);
              });
            }
            _.forEach(assignment.participants, function (user) {
              if (user.tokens) {
                _.forEach(user.tokens, function (token) {
                  tokens.push(token.token);
                });
              }
              users.child(user.$id+'/assignments').push({
                council: $scope.council,
                key: id
              });
            });
          })
          .then(function () {
            $scope.modal.hide();
          })
          .then(function () {
            return Notify.send(creator.fname + ' ' + creator.lname + ' just added you to a task for '+$scope.council, tokens);
          });
      };

    } else {
      $state.go('menu.council.list');
    }

})

.controller("CouncilController", function(MemberService, COUNCILS, $scope, $stateParams, $state) {

  $scope.active = $state.current.name;
  $scope.council = $stateParams.council || 'Bishopric';
  
  MemberService.getMembers().then(function (members) {
    $scope.members = members;
  });

  $scope.councilList = COUNCILS;
  $scope.councilAccess = {
    "11" : {
      assignmentCount: 3,
      commentCount: 4
    },
    "12" : {
      assignmentCount: 0,
      commentCount: 2
    }
  };
})
