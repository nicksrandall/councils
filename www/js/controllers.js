// Controllers for the CouncilsApp
angular.module('councilsApp')

.controller("ApplicationController", ['MODALS', '$rootScope', '$ionicHistory', '$scope', '$ionicModal', '$ionicSideMenuDelegate', function(MODALS, $rootScope, $ionicHistory, $scope, $ionicModal, $ionicSideMenuDelegate) {
  $scope.modal = {};

  $rootScope.viewConfig = {
    currentCouncilId: 0,
    currentCouncilTab: "discussion"
  }

  $rootScope.back = function() {
    $ionicHistory.goBack();
  }
}])


.controller("HomeController", ['$scope', function($scope) {
  $scope.assignments = [
    {
      id: 1,
      content: "Visit Juliet Schumpeter who just moved into the ward.",
      comments: [],
      dueDate: '2015-06-18T11:30:00',
      completed: false
    },
    {
      id: 2,
      content: "Fiona Hayek just had a baby. Assign sister to bring Dinner.",
      comments: [],
      dueDate: '2015-06-17T11:30:00',
      completed: false
    },
    {
      id: 3,
      content: "Fill the Family History Consultant calling.",
      comments: [{},{}],
      dueDate: '2015-06-16T11:30:00',
      completed: false
    }
  ]

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
}])

.controller("LandingController", [ function() {

}])

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

.controller("CouncilController",
  ['MemberService', 'MembersModal', 'COUNCILS', '$scope', '$stateParams', '$rootScope',
  function(MemberService, MembersModal, COUNCILS, $scope, $stateParams, $rootScope) {

  $scope.members = MemberService.getMembers();

  $scope.openMembersModal = function(dataStore, max) {
    MembersModal.openModal(max, $scope.data[dataStore]).then(function(result) {
      $scope.data[dataStore] = result;
    })
  };

  $scope.data = {
    participants: [],
    discussionParticipants: [],
    assignmentParticipants: []
  }

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
}])
