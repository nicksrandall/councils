// Directives for CouncilsApp
angular.module('councilsApp')

.directive("autoResize", function() {
  return function(scope, element) {
    element[0].autoResize();
  }
});
