// Routes for the App
angular.module('councilsApp')

.config( function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home')

  $stateProvider.state('home', {
    url: "/home",
    templateUrl: "home.html",
    controller: "HomeController"
  })

  $stateProvider.state('landing', {
    url: "/",
    templateUrl: "landing.html",
    controller: "LandingController"
  })

  $stateProvider.state('council', {
    // abstract: true, // would love to keep this, but causes black flicker
    url: "/council",
    templateUrl: "/council/wrapper.html",
    controller: "CouncilsController"
  })

  $stateProvider.state('council.list', {
    url: "/list",
    templateUrl: "/council/list.html"
  })

  $stateProvider.state('council.tab', {
    // abstract: true, // would love to keep this, but causes black flicker
    url: "/tab",
    templateUrl: "/council/tabbed_layout.html"
  })

  $stateProvider.state('council.tab.discussion', {
    url: "/discussion",
    templateUrl: "/council/discussion_list.html"
  })

  $stateProvider.state('council.tab.assignment', {
    url: "/assignment",
    templateUrl: "/council/assignment_list.html",
    controller: function($scope, $stateParams){
      console.log($stateParams)
      console.log($scope)
      $scope.councilId = $stateParams.id;
    }
  })

  $stateProvider.state('council.discussion_new', {
    url: "/discussion/new",
    templateUrl: "/council/discussion_new.html"
  })

  $stateProvider.state('council.assignment_new', {
    url: "/assignment/new",
    templateUrl: "/council/assignment_new.html"
  })

  $stateProvider.state('council.edit', {
    url: 'edit',
    templateUrl: '/council/edit.html'
  })

  $stateProvider.state('agenda_list', {
    url: "/agendas/list",
    templateUrl: "agendas.html",
    controller: "AgendasController"
  })

  $stateProvider.state('agenda_detail', {
    url: "/agendas/detail",
    params: {
      agendaId: {
        value: 0
      }
    },
    templateUrl: "agendas_detail.html",
    controller: "AgendasController"
  })
})
