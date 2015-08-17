// Directives for CouncilsApp
angular.module('councilsApp')

.directive("customPlaceholder", function() {
  return function(scope, element) {
    var defaultValue = element[0].getAttribute('custom-placeholder')
    element[0].customPlaceholder( defaultValue );
  }
})

.directive('commentCount', function ($firebaseObject, User) {
  var promise = User.get();
  return {
    restrict: 'A',
    template: '{{count.$value || 0}}',
    scope: {
      commentCount: '='
    },
    link: function (scope, element, attrs) {
      promise.then(function (me) {
        var _ref = new Firebase('https://councilsapp.firebaseio.com').child(me.homeUnitNbr + '/commentCount').child(scope.commentCount);
        scope.count = $firebaseObject(_ref);
      });
    }
  };
})


// This allows you to disable a ui-sref conditionally by adding an attribute
// on the element e.g. ui-sref-disable='!user.loggedIn()'
.directive('uiSrefDisable', ['$parse', '$rootScope',
  function($parse, $rootScope) {
    return {
      // this ensure uiSrefDisable be compiled before ngClick
      priority: 100,
      restrict: 'A',
      compile: function($element, attr) {
        var fn = $parse(attr.uiSrefDisable);
        return {
          pre: function link(scope, element) {
            var eventName = 'click';
            element.on(eventName, function(event) {
              var callback = function() {
                if (fn(scope, {$event: event})) {
                  // prevents ng-click to be executed
                  event.stopImmediatePropagation();
                  // prevents href
                  event.preventDefault();
                  return false;
                }
              };
              if ($rootScope.$$phase) {
                scope.$evalAsync(callback);
              } else {
                scope.$apply(callback);
              }
            });
          },
          post: function() {}
        }
      }
    }
  }
]);
