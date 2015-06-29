// Controllers for the CouncilsApp
angular.module('councilsApp')

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

.controller("AgendasController", ['$scope', '$stateParams', function($scope, $stateParams) {
  $scope.agendaId = $stateParams.agendaId;

  $scope.ward = [
    {title:"Bishopric",id:1,access:true},
    {title:"PEC",id:2,access:true},
    {title:"Ward Council",id:3,access:false}
  ];

  $scope.stake = [
    {title:"Presidency",id:4,access:false},
    {title:"High Council",id:5,access:false},
    {title:"Bishops",id:6,access:false},
    {title:"Stake Council",id:7,access:false},
    {title:"Bishops Welfare",id:8,access:false}
  ];
}])

.controller("CouncilsController",
  ['CouncilService', '$scope', '$stateParams', '$rootScope',
  function(CouncilService, $scope, $stateParams, $rootScope) {
  console.log("Initializing CouncilsController")
  $scope.councilId = $stateParams.id;

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

  $scope.councilList = CouncilService.councils;
  $scope.councilAccess = {
    "1" : {
      assignment_count: 3,
      comments_count: 4
    },
    "2" : {
      assignments_count: 0,
      comments_count: 2
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
