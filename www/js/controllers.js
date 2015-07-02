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

  $scope.openModal = function( type ) {
    $scope.$emit('showModal', type);
  }

  $scope.$on("showModal", function(event, type) {
    $ionicModal.fromTemplateUrl(MODALS[type], {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  })

  $scope.closeModal = function() {
    console.log('destroy')
    $scope.modal.remove();
  }

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  //
  // $scope.toggleLeft = function() {
  //   $ionicSideMenuDelegate.toggleLeft();
  // };


  $scope.searchTerm = "";
    $scope.searchResults = {};

  $scope.$watch( function() {return $scope.searchTerm}, setSearchResults );

  function setSearchResults() {
    console.log("searching " + $scope.searchTerm)
    $scope.searchResults = $scope.wardMembers.filter(function(m) {return m.name.indexOf($scope.searchTerm) >= 0})
  }


  $scope.wardMembers = [
    {
      id: 0,
      name: "Amanda Tapping",
      avatar: "headshot.png"
    },
    {
      id: 1,
      name: "Samantha Carter",
      avatar: "headshot.png"
    },
    {
      id: 2,
      name: "Daniel Jackson",
      avatar: "headshot.png"
    },
    {
      id: 2,
      name: "Daniel Jackson",
      avatar: "headshot.png"
    },
    {
      id: 2,
      name: "Daniel Jackson",
      avatar: "headshot.png"
    },
    {
      id: 2,
      name: "Daniel Jackson",
      avatar: "headshot.png"
    },
    {
      id: 2,
      name: "Daniel Jackson",
      avatar: "headshot.png"
    },
    {
      id: 2,
      name: "Daniel Jackson",
      avatar: "headshot.png"
    },
    {
      id: 2,
      name: "Daniel Jackson",
      avatar: "headshot.png"
    },
    {
      id: 2,
      name: "Daniel Jackson",
      avatar: "headshot.png"
    },
    {
      id: 2,
      name: "Daniel Jackson",
      avatar: "headshot.png"
    },
    {
      id: 2,
      name: "Daniel Jackson",
      avatar: "headshot.png"
    },
    {
      id: 2,
      name: "Daniel Jackson",
      avatar: "headshot.png"
    }
  ];

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
  ['$scope', '$ionicHistory', 'HymnService', '$stateParams', 'AGENDAS',
  function($scope, $ionicHistory, HymnService, $stateParams, AGENDAS) {

  $scope.openModal = function( type ) {
    $scope.$emit('showModal', type);
  }

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
  $scope.agendaAccess = {"2":true,"3":true};

}])

.controller("CouncilDetailController", ['$scope','$stateParams', function($scope, $stateParams) {
    $scope.tab = $stateParams.currentCouncilTab;
    $scope.$emit("councilDetailTabChanged",$scope.tab);
}])

.controller("CouncilController",
  ['COUNCILS', '$scope', '$stateParams', '$rootScope',
  function(COUNCILS, $scope, $stateParams, $rootScope) {

  $scope.$on('councilDetailTabChanged', function(event, data) {
    console.log(data);
  })

  $scope.openModal = function( type ) {
    $scope.$emit('showModal', type);
  }

  $scope.wardMembers = [
    {
      id: 0,
      name: "Franklin Hughes",
      avatar: "headshot.png"
    },
    {
      id: 1,
      name: "Franklin Hughes",
      avatar: "headshot.png"
    },
    {
      id: 2,
      name: "Franklin Hughes",
      avatar: "headshot.png"
    }
  ];

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
