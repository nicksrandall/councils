// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('councilsApp', ['firebase', 'ionic',  'ngCordova'])

.run(function($ionicPlatform, $rootScope, $state, $cordovaStatusbar, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
  
    $timeout(function () {
      if(window.StatusBar) {
          window.StatusBar.overlaysWebView();
          window.StatusBar.hide();
      }
    }, 3000);
  });

  $rootScope.$on("$stateChangeError", function(event, next, nextP, previous, previousP, error) {
    if (error === "AUTH_REQUIRED") {
      $state.go("simple.welcome");
    }
  });
});
