// Routes for the App
angular.module('councilsApp')

.config( function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/welcome')

  $stateProvider.state('home', {
    url: "/",
    templateUrl: "home.html",
    controller: "HomeController"
  })

  $stateProvider.state('welcome', {
    url: "/welcome",
    templateUrl: "welcome.html"
  })

  $stateProvider.state('onboarding', {
    url: "/onboarding",
    templateUrl: "onboarding.html"
  })

  $stateProvider.state('setup', {
    url: "/setup",
    templateUrl: "setup.html"
  })

  $stateProvider.state('login', {
    url: "/login",
    templateUrl: "login.html"
  })

  $stateProvider.state('navigation', {
    url: "/navigation",
    templateUrl: "navigation.html",
  })

  $stateProvider.state('council', {
    abstract: true,
    url: "/council",
    templateUrl: "/council/wrapper.html",
    controller: "CouncilsController"
  })

  $stateProvider.state('council.list', {
    url: "/list",
    templateUrl: "/council/list.html"
  })

  $stateProvider.state('council.tab', {
    abstract: true,
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
