// Routes for the App
angular.module('councilsApp')

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
  $urlRouterProvider.otherwise('/menu/home');
  var viewRoot = "views/";

  $stateProvider.state('menu.home', {
    cache: false,
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
  });

  $stateProvider.state('simple', {
    abstract: true,
    url: "/simple",
    views: {
      'mainContent': {
        templateUrl: viewRoot + "/layouts/no_sidebar.html"
      }
    }
  });

  $stateProvider.state('menu', {
    abstract: true,
    url: "/menu",
    views: {
      'mainContent': {
        templateUrl: viewRoot + "/layouts/no_sidebar.html"
      }
    }
  });

  $stateProvider.state('simple.welcome', {
    url: "/welcome",
    views: {
      'menuContent': {
        templateUrl: viewRoot + "welcome.html"
      }
    }
  });

  $stateProvider.state('simple.onboarding', {
    url: "/onboarding",
    views: {
      'menuContent': {
        templateUrl: viewRoot + "onboarding.html"
      }
    }
  });

  $stateProvider.state('simple.setup', {
    url: "/setup",
    views: {
      'menuContent': {
        templateUrl: viewRoot + "setup.html",
        controller: "SetupController",
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$waitForAuth();
          }]
        }
      }
    }
  });

  $stateProvider.state('simple.create', {
    url: "/create",
    views: {
      'menuContent': {
        templateUrl: viewRoot + "create.html",
        controller: "CreateController",
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$waitForAuth();
          }]
        }
      }
    }
  });

  $stateProvider.state('simple.login', {
    url: "/login",
    views: {
      'menuContent': {
        templateUrl: viewRoot + "login.html",
        controller: 'LoginController',
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$waitForAuth();
          }]
        }
      }
    }
  });

  // $stateProvider.state('navigations', {
  //   url: "/navigation",
  //   templateUrl: viewRoot + "navigation.html"
  // });

  $stateProvider.state('menu.directory', {
    url: "/directory",
    views: {
      'menuContent': {
        templateUrl: viewRoot + "/directory.html",
        controller: "DirectoryController",
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$waitForAuth(Auth.$requireAuth);
          }]
        }
      }
    }
  });

  $stateProvider.state('menu.council', {
    abstract: true,
    url: "/council",
    params: {
      council: null
    },
    views: {
      'menuContent' : {
        templateUrl: viewRoot + "/council/tabbed_layout.html",
        controller: "CouncilController",
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            Auth.$waitForAuth(Auth.$requireAuth);
          }]
        }
      }
    }
  });

  // $stateProvider.state('menu.council.list', {
  //   url: "/list",
  //   views: {
  //     'councilContent' : {
  //       templateUrl: viewRoot + "/council/list.html"
  //     }
  //   }
  // });

  // $stateProvider.state('menu.council.tab', {
  //   abstract: true,
  //   url: "/tab",
  //   params: {
  //     council: null
  //   },
  //   views: {
  //     'councilContent' : {
  //       templateUrl: viewRoot + "/council/tabbed_layout.html",
  //       controller: "CouncilController"
  //     }
  //   }
  // });

  $stateProvider.state('menu.council.discussion', {
    url: "/discussion",
    params: {
      currentCouncilTab: 'discussions'
    },
    views: {
      'tab' : {
        templateUrl: viewRoot + "/council/discussion_list.html",
        controller: 'CouncilDiscussionController'
      }
    }
  });

  $stateProvider.state('menu.council.assignment', {
    url: "/assignment",
    params: {
      currentCouncilTab: 'assignments'
    },
    views: {
      'tab' : {
        templateUrl: viewRoot + "/council/assignment_list.html",
        controller: 'CouncilAssignmentController'
      }
    }
  });

  $stateProvider.state('menu.council.agenda', {
    url: "/agenda",
    params: {
      currentCouncilTab: 'agendas',
      week: {
        value: moment().isoWeek()
      }
    },
    views: {
      'tab' : {
        templateUrl: viewRoot + "/council/agenda.html",
        controller: "AgendaDetailController"
      }
    }
  });

  $stateProvider.state('menu.council.discussion.new', {
    url: "/new",
    views: {
      'modal' : {
        templateUrl: viewRoot + "/council/discussion_new.html",
      }
    }
  });

  $stateProvider.state('menu.council.assignment.new', {
    url: "/new",
    views: {
      'modal' : {
        templateUrl: viewRoot + "/council/assignment_new.html",
      }
    }
  });

  $stateProvider.state('menu.council.edit', {
    url: '/edit',
    views: {
      'councilContent' : {
        templateUrl: viewRoot + '/council/edit.html'
      }
    }
  });

  $stateProvider.state('menu.comments', {
    url: '/comments/:topic',
    params: {
      title: null
    },
    views: {
      "menuContent" : {
        templateUrl: viewRoot + "comments.html",
        controller: "CommentController",
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$requireAuth();
          }]
        }
      }
    }
  });



  // $stateProvider.state('menu.agenda', {
  //   abstract: true,
  //   url: "/agenda",
  //   views: {
  //     'menuContent': {
  //       templateUrl: viewRoot + "/agenda/wrapper.html",
  //       controller: "AgendaController"
  //     }
  //   }
  // });

  // $stateProvider.state('menu.agenda.list', {
  //   url: "/list",
  //   views: {
  //     'agendaContent' : {
  //       templateUrl: viewRoot + "/agenda/list.html",
  //     }
  //   }
  // });
});
