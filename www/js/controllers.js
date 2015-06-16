// Routes for the App
angular.module('councils')

.controller("HomeController", ['$scope', function() {

}])

.controller("CouncilsController", ['$scope', function($scope) {
  $scope.ward = [
    {
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
