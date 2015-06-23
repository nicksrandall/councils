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

  $stateProvider.state('councils', {
    url: "/councils/list",
    templateUrl: "councils.html",
    controller: "CouncilsController"
  })

  $stateProvider.state('council_detail', {
    url: "/councils/detail",
    templateUrl: "councils_layout.html"
  })

  $stateProvider.state('council_detail.discussions', {
    url: '/councils/detail/discussions',
    views: {
      infoPane: {
        templateUrl: 'councils_discussions.html'
      }
    }
  })

  $stateProvider.state('council_detail.assignments', {
    url: '/councils/detail/assignments',
    views: {
      infoPane: {
        templateUrl: 'councils_assignments.html'
      }
    }
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
