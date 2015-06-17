// Routes for the App
angular.module('councilsApp')

.config( function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

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

  $stateProvider.state('council_list', {
    url: "/councils/list",
    templateUrl: "councils.html",
    controller: "CouncilsController"
  })

  $stateProvider.state('council_detail', {
    url: "/councils/detail",
    templateUrl: "councils_detail.html",
    controller: "CouncilsController"
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
