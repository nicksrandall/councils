// Routes for the App
angular.module('councils')

.config( function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider.state('home', {
    url: "/",
    templateUrl: "home.html",
    controller: "HomeController"
  })

  $stateProvider.state('councils', {
    url: "/councils",
    templateUrl: "councils.html",
    controller: "CouncilsController"
  })
})
