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

  $stateProvider.state('councils', {
    url: "/councils/list",
    templateUrl: "councils.html",
    controller: "CouncilsController"
  })

  $stateProvider.state('council_detail', {
    url: "/councils/detail",
    templateUrl: "councils_layout.html"
  })

  $stateProvider.state('council_edit', {
    url: '/edit',
    templateUrl: 'councils_edit.html'
  })

  $stateProvider.state('council_detail.discussions', {
    url: '/discussions',
    params: {
      id: {
        value: 0
      }
    },
    views: {
      infoPane: {
        controller: function($rootScope) {
          $rootScope.currentTab = "discussions";
        },
        templateUrl: 'councils_discussions.html'
      }
    }
  })

  $stateProvider.state('new_discussion', {
    url: "/discussion/new",
    templateUrl: "councils_discussions_new.html"
  })

  $stateProvider.state('new_assignment', {
    url: "/assignment/new",
    templateUrl: "councils_assignments_new.html"
  })

  $stateProvider.state('council_detail.assignments', {
    url: '/assignments',
    params: {
      id: {
        value: 0
      }
    },
    views: {
      infoPane: {
        controller: function($rootScope) {
          $rootScope.currentTab = "assignments";
        },
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
