// Controllers for the CouncilsApp
angular.module('councilsApp')

.controller("ApplicationController", function(MODALS, $rootScope, $ionicHistory, $scope, $ionicModal, $ionicSideMenuDelegate) {
  $scope.modal = {};

  $rootScope.viewConfig = {
    currentCouncilId: 0,
    currentCouncilTab: "discussion"
  };

  $rootScope.back = function() {
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
      console.log("Logged in as:", authData.uid);
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

.controller('CreateController', function ($scope, me, Auth, $firebaseObject, $state) {
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
        console.warn(error);
      });
  };
})

.controller('ProfileController', function ($scope, $ionicPush, $cordovaPush) {
  $scope.register = function () {
    console.log('registering!');
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
        console.log(notification);
        if (notification.alert) {
          if(navigator.notification) {
            navigator.notification.alert(notification.alert);
          } else {
            alert(notification.alert);
          }
        }

        if (notification.sound) {
          var snd = new Media(event.sound);
          snd.play();
        }

        if (notification.badge) {
          $cordovaPush.setBadgeNumber(notification.badge).then(function(result) {
            // Success!
            console.log('badge success!');
          }, function(err) {
            // An error occurred. Show a message to the user
          });
        }
        return true;
      }
    });
  };
})

.controller("HomeController", function($scope, User, currentAuth, $firebaseObject) {
  $scope.assignments = [];
  $scope.discussions = [];

  User.set(currentAuth.uid)
    .then(function (user) {
      return user.$bindTo($scope, 'user');
    })
    .then(function () {
      var assignments = new Firebase('https://councilsapp.firebaseio.com/'+$scope.user.homeUnitNbr+'/assignments');
      var discussions = new Firebase('https://councilsapp.firebaseio.com/'+$scope.user.homeUnitNbr+'/discussions');
      _.forEach($scope.user.assignments, function (key) {
        var child = assignments.child(key);
        $scope.assignments.push($firebaseObject(child));
      });
      _.forEach($scope.user.discussions, function (key) {
        var child = discussions.child(key);
        $scope.discussions.push($firebaseObject(child));
      });
    });
})

.controller("AgendaController",
  ['MemberService', '$scope', '$ionicHistory', 'HymnService', '$stateParams', 'AGENDAS', 'MembersModal',
  function(MemberService, $scope, $ionicHistory, HymnService, $stateParams, AGENDAS, MembersModal) {

  $scope.members = MemberService.getMembers();

  $scope.openMembersModal = function(dataStore, max) {
    MembersModal.openModal(max, $scope.data[dataStore]).then(function(result) {
      $scope.data[dataStore] = result;
    })
  };

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
    if(toState.name == 'menu.agenda.detail') {
      $scope.agendaId = toParams.agendaId;
      $scope.agendaGroup = toParams.agendaGroupId;
    }
  });

  $scope.data = {
    date: "",
    openingHymn: "",
    openingPrayer: "",
    spiritualThought: "",
    highCounselor: "",
    callings: "",
    spiritualWelfare: "",
    temporalWelfare: "",
    fellowship: "",
    missionary: "",
    events: "",
    closingPrayer: ""
  }

  $scope.hymns = HymnService.getList();

  $scope.agendas = AGENDAS;
  $scope.agendaAccess = { "2":true,"3":true };

}])

.controller("CouncilDetailController", ['$scope','$stateParams', function($scope, $stateParams) {
    $scope.tab = $stateParams.currentCouncilTab;
    $scope.$emit("councilDetailTabChanged",$scope.tab);
}])

.controller("CouncilController", function(MemberService, MembersModal, COUNCILS, $scope, $stateParams, $rootScope, User, $firebaseArray) {

  MemberService.getMembers().then(function (members) {
    $scope.members = members;
  });

  $scope.currentDate = new Date();
  $scope.title = "Custom Title";

  $scope.datePickerCallback = function (val) {
    if(typeof(val)==='undefined'){      
      console.log('Date not selected');
    }else{
      console.log('Selected date is : ', val);
    }
  };

  $scope.openMembersModal = function(dataStore, max) {
    MembersModal.openModal(max, $scope.data[dataStore]).then(function(result) {
      $scope.data[dataStore] = max ===1 ? result[0] : result;
      console.log('result', result, dataStore);
    })
  };

  $scope.createAssignment = function () {
    console.log('assignments');
    var creator, assignment;
    User.get()
      .then(function (me) {
        creator = me;
        var ref = new Firebase('https://councilsapp.firebaseio.com/'+me.homeUnitNbr+'/assignments');
        var assignments = $firebaseArray(ref);
        assignment = {
          createdBy: me.$id,
          assignedTo: $scope.data.assignmentAssignee,
          dueDate: $scope.currentDate.toISOString(),
          content: $scope.data.content,
          completed: false,
          participants: $scope.data.assignmentParticipants
        };
        return assignments.$add(assignment);
      })
      .then(function (ref) {
        var id = ref.key();
        var users = new Firebase('https://councilsapp.firebaseio.com/'+creator.homeUnitNbr+'/users/');
        users.child(creator.$id+'/assignments').push(id);
        assignment.participants.forEach(function (id) {
          users.child(id+'/assignments').push(id);
        });
      })
      .then(function () {
        $scope.back();
      })

  };

  $scope.data = {
    participants: [],
    discussionParticipants: [],
    assignmentParticipants: [],
    assignmentAssignee: null,
    content: ''
  };

  $scope.$on('councilDetailTabChanged', function(event, data) {
    console.log(data);
  })

  $scope.councilList = COUNCILS;
  $scope.councilAccess = {
    "1" : {
      assignmentCount: 3,
      commentCount: 4
    },
    "2" : {
      assignmentCount: 0,
      commentCount: 2
    }
  }

  $scope.discussions = [
    {
      id: 1,
      userAvatar: "headshot.png",
      userName: "David Ricardo",
      content: "Do we have any volunteers to provide refreshments for the Jack Welch fireside?",
      comments: [{},{},{},{}],
      createdDate: '2015-06-18T11:30:00'
    },
    {
      id: 2,
      userAvatar: "headshot.png",
      userName: "David Ricardo",
      content: "Do we have any volunteers to provide refreshments for the Jack Welch fireside?",
      comments: [],
      createdDate: '2015-06-17T11:30:00'
    },
    {
      id: 3,
      userAvatar: "headshot.png",
      userName: "David Ricardo",
      content: "Do we have any volunteers to provide refreshments for the Jack Welch fireside?",
      comments: [],
      createdDate: '2015-06-16T11:30:00'
    }
  ]

  $scope.assignments = [
    {
      id: 1,
      userName: "John Say",
      content: "Visit Juliet Schumpeter who just moved into the ward.",
      comments: [],
      dueDate: '2015-06-18T11:30:00',
      completed: false
    },
    {
      id: 2,
      userName: "Adelle Smith",
      content: "Fiona Hayek just had a baby. Assign sister to bring Dinner.",
      comments: [],
      dueDate: '2015-06-17T11:30:00',
      completed: false
    },
    {
      id: 3,
      userName: "David Ricardo",
      content: "Fill the Family History Consultant calling.",
      comments: [{},{}],
      dueDate: '2015-06-16T11:30:00',
      completed: false
    }
  ]
})
