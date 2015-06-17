// Controllers for the CouncilsApp
angular.module('councilsApp')

.controller("HomeController", ['$scope', function($scope) {
  $scope.assignments = [
    {
      id: 1,
      content: "Visit Juliet Schumpeter who just moved into the ward.",
      comments: [],
      dueDate: '2015-06-18 11:30:00',
      completed: false
    },
    {
      id: 2,
      content: "Fiona Hayek just had a baby. Assign sister to bring Dinner.",
      comments: [],
      dueDate: '2015-06-17 11:30:00',
      completed: false
    },
    {
      id: 3,
      content: "Fill the Family History Consultant calling.",
      comments: [{},{}],
      dueDate: '2015-06-16 11:30:00',
      completed: false
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

.controller("CouncilsController", ['$scope', function($scope) {
  $scope.ward = [
    {
      id: 23,
      title: "Bishopric",
      access: true,
      assignments: [
        {},{},{}
      ],
      comments: [
        {},{},{},{}
      ]
    },
    {
      id: 24,
      title: "Ward Council",
      access: true,
      assignments: [

      ],
      comments: [
        {},{}
      ]
    },
    { title: "Sacrament", access: false },
    { title: "Interviews", access: false },
    { title: "PEC", access: false },
    { title: "High Priest", access: false },
    { title: "Elders", access: false },
    { title: "Relief Society", access: false },
    { title: "Young Men", access: false },
    { title: "Young Women", access: false },
    { title: "Sunday School", access: false },
    { title: "Primary", access: false }
  ]

  $scope.stake = [
    { title: "Presidency", access: false },
    { title: "High Council", access: false },
    { title: "Patriarch", access: false },
    { title: "Bishops", access: false },
    { title: "Relief Society", access: false },
    { title: "Young Men", access: false },
    { title: "Young Women", access: false },
    { title: "Sunday School", access: false },
    { title: "Primary", access: false },
    { title: "Missionary", access: false },
    { title: "Auditing", access: false }
  ]
}])
