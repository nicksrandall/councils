// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('councilsApp', [
  'firebase',
  'ionic', 
  'ionic.service.core',
  'ionic.service.analytics',
  'ionic.service.push',
  'ngCordova',
  'ionic-datepicker'
])

.run(function($ionicPlatform, $rootScope, $state, $cordovaStatusbar, $timeout, Auth, User, $ionicUser, $ionicPush, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
    $ionicAnalytics.register();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    ionic.Platform.fullScreen(true, false);

    Auth.$onAuth(function(authData) {
      if (authData) {
        console.log("Logged in as:", authData.uid);
        User.set(authData.uid)
          .then(function (me) {

            var user = $ionicUser.get();
            if(!user.user_id) {
              user.user_id = me.$id
            };

            // Add some metadata to your user object.
            angular.extend(user, {
              fname: me.fname,
              lname: me.lname,
              homeUnitNbr: me.homeUnitNbr,
              individualId: me.individualId,
              email: me.email
            });

            // Identify your user with the Ionic User Service
            $ionicUser
              .identify(user)
              .then(function(){
                console.log('Identified user ' + user.fname + '\n ID ' + user.user_id);
              });
          });
      } else {
        console.log("Logged out");
      }
    });
  });

  // Handles incoming device tokens
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    alert("Successfully registered token " + data.token);
    console.log('Ionic Push: Got token ', data.token, data.platform);
    User.get()
      .then(function (me) {
        return me.$ref().child('tokens').push(data);
      });
  });


  $rootScope.$on("$stateChangeError", function(event, next, nextP, previous, previousP, error) {
    if (error === "AUTH_REQUIRED") {
      $state.go("simple.welcome");
    }
  });
});
