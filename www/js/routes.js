// Routes for the App
angular.module('councilsApp')

.config( function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/simple/welcome')

  $stateProvider.state('menu.home', {
    url: "/home",
    views: {
      "menuContent" : {
        templateUrl: "home.html",
        controller: "HomeController"
      }
    }
  })

  $stateProvider.state('simple', {
    abstract: true,
    url: "/simple",
    views: {
      "mainContent" : {
        templateUrl: "/layouts/no_sidebar.html"
      }
    }
  })

  $stateProvider.state('menu', {
    abstract: true,
    url: "/menu",
    views: {
      'mainContent': {
        templateUrl: "/layouts/sidebar.html"
      }
    }
  })

  $stateProvider.state('simple.welcome', {
    url: "/welcome",
    templateUrl: "welcome.html"
  })

  $stateProvider.state('simple.onboarding', {
    url: "/onboarding",
    templateUrl: "onboarding.html"
  })

  $stateProvider.state('simple.setup', {
    url: "/setup",
    templateUrl: "setup.html"
  })

  $stateProvider.state('simple.login', {
    url: "/login",
    templateUrl: "login.html"
  })

  $stateProvider.state('navigations', {
    url: "/navigation",
    templateUrl: "navigation.html",
  })

  $stateProvider.state('menu.council', {
    abstract: true,
    url: "/council",
    views: {
      'menuContent': {
        templateUrl: "/council/wrapper.html",
        controller: "CouncilsController"
      }
    }
  })

  $stateProvider.state('menu.council.list', {
    url: "/list",
    views: {
      'councilContent' : {
        templateUrl: "/council/list.html"
      }
    }
  })

  $stateProvider.state('menu.council.tab', {
    abstract: true,
    url: "/tab",
    views: {
      'councilContent' : {
        templateUrl: "/council/tabbed_layout.html"
      }
    }
  })

  $stateProvider.state('menu.council.tab.discussion', {
    url: "/discussion",
    views: {
      'tab' : {
        templateUrl: "/council/discussion_list.html"
      }
    }
  })

  $stateProvider.state('menu.council.tab.assignment', {
    url: "/assignment",
    templateUrl: "/council/assignment_list.html",
    controller: function($scope, $stateParams){
      console.log($stateParams)
      console.log($scope)
      $scope.councilId = $stateParams.id;
    }
  })

  $stateProvider.state('menu.council.discussion_new', {
    url: "/discussion/new",
    views: {
      'councilContent' : {
        templateUrl: "/council/discussion_new.html"
      }
    }
  })

  $stateProvider.state('menu.council.assignment_new', {
    url: "/assignment/new",
    templateUrl: "/council/assignment_new.html"
  })

  $stateProvider.state('menu.council.edit', {
    url: 'edit',
    templateUrl: '/council/edit.html'
  })

  $stateProvider.state('menu.agenda_list', {
    url: "/agendas/list",
    templateUrl: "agendas.html",
    controller: "AgendasController"
  })

  $stateProvider.state('menu.agenda_detail', {
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
