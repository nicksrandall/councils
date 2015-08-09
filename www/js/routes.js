// Routes for the App
angular.module('councilsApp')

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/menu/home');
  var viewRoot = "views/";

  $stateProvider.state('menu.home', {
    url: "/home",
    views: {
      "menuContent" : {
        templateUrl: viewRoot + "home.html",
        controller: "HomeController",
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
      }
    }
  })

  $stateProvider.state('simple', {
    abstract: true,
    url: "/simple",
    views: {
      "mainContent" : {
        templateUrl: viewRoot + "/layouts/no_sidebar.html"
      }
    }
  })

  $stateProvider.state('menu', {
    abstract: true,
    url: "/menu",
    views: {
      'mainContent': {
        templateUrl: viewRoot + "/layouts/sidebar.html"
      }
    }
  })

  $stateProvider.state('simple.welcome', {
    url: "/welcome",
    templateUrl: viewRoot + "welcome.html"
  })

  $stateProvider.state('simple.onboarding', {
    url: "/onboarding",
    templateUrl: viewRoot + "onboarding.html"
  })

  $stateProvider.state('simple.setup', {
    url: "/setup",
    templateUrl: viewRoot + "setup.html",
    controller: "SetupController",
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$waitForAuth();
      }]
    }
  })

  $stateProvider.state('simple.create', {
    url: "/create",
    templateUrl: viewRoot + "create.html",
    controller: "CreateController",
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$waitForAuth();
      }]
    }
  })

  $stateProvider.state('simple.login', {
    url: "/login",
    templateUrl: viewRoot + "login.html",
    controller: 'LoginController',
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$waitForAuth();
      }]
    }
  })

  $stateProvider.state('navigations', {
    url: "/navigation",
    templateUrl: viewRoot + "navigation.html"
  })

  $stateProvider.state('menu.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        controller: "ProfileController",
        templateUrl: viewRoot + "/profile.html"
      }
    }
  })

  $stateProvider.state('menu.council', {
    abstract: true,
    url: "/council",
    views: {
      'menuContent': {
        templateUrl: viewRoot + "/council/wrapper.html",
        controller: "CouncilController",
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
      }
    }
  })

  $stateProvider.state('menu.council.list', {
    url: "/list",
    views: {
      'councilContent' : {
        templateUrl: viewRoot + "/council/list.html"
      }
    }
  })

  $stateProvider.state('menu.council.tab', {
    abstract: true,
    url: "/tab",
    views: {
      'councilContent' : {
        templateUrl: viewRoot + "/council/tabbed_layout.html"
      }
    }
  })

  $stateProvider.state('menu.council.tab.discussion', {
    url: "/discussion",
    params: {
      currentCouncilTab: 'discussions'
    },
    views: {
      'tab' : {
        templateUrl: viewRoot + "/council/discussion_list.html"
      }
    }
  })

  $stateProvider.state('menu.council.tab.assignment', {
    url: "/assignment",
    params: {
      currentCouncilTab: 'assignments'
    },
    views: {
      'tab' : {
        templateUrl: viewRoot + "/council/assignment_list.html"
      }
    }
  })

  $stateProvider.state('menu.council.discussion_new', {
    url: "/discussion/new",
    views: {
      'councilContent' : {
        templateUrl: viewRoot + "/council/discussion_new.html"
      }
    }
  })

  $stateProvider.state('menu.council.assignment_new', {
    url: "/assignment/new",
    views: {
      'councilContent' : {
        templateUrl: viewRoot + "/council/assignment_new.html"
      }
    }
  })

  $stateProvider.state('menu.council.edit', {
    url: 'edit',
    views: {
      'councilContent' : {
        templateUrl: viewRoot + '/council/edit.html'
      }
    }
  })


  $stateProvider.state('menu.agenda', {
    abstract: true,
    url: "/agenda",
    views: {
      'menuContent': {
        templateUrl: viewRoot + "/agenda/wrapper.html",
        controller: "AgendaController"
      }
    }
  })

  $stateProvider.state('menu.agenda.list', {
    url: "/list",
    views: {
      'agendaContent' : {
        templateUrl: viewRoot + "/agenda/list.html"
      }
    }
  })

  $stateProvider.state('menu.agenda.detail', {
    url: "/detail",
    params: {
      agendaId: {
        value: -1
      },
      agendaGroupId: {
        value: 'ward'
      }
    },
    views: {
      'agendaContent' : {
        templateUrl: viewRoot + "/agenda/detail.html"
      }
    }
  })
})
