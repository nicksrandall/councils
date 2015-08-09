// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('councilsApp', ['firebase', 'ionic', 'ionic.service.core','ionic.service.analytics','ionic.service.push','ngCordova',   'ionic-datepicker'])

.run(function($ionicPlatform, $rootScope, $state, $cordovaStatusbar, $timeout, Auth, User, $ionicUser, $ionicPush, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
    $ionicAnalytics.register();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
  
    $timeout(function () {
      if(window.StatusBar) {
          window.StatusBar.overlaysWebView(true);
          window.StatusBar.hide();
      }
    }, 3000);

    Auth.$onAuth(function(authData) {
      if (authData) {
        console.log("Logged in as:", authData.uid);
        User.set(authData.uid)
          .then(function (me) {
            alert('Ionic User: Identifying with Ionic User service');

            var user = $ionicUser.get();
            if(!user.user_id) {
              // Set your user_id here, or generate a random one.
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
                alert('Identified user ' + user.name + '\n ID ' + user.user_id);
                if (window.plugins) {
                  $ionicPush.register({
                    canShowAlert: true, //Can pushes show an alert on your screen?
                    canSetBadge: true, //Can pushes update app icon badges?
                    canPlaySound: true, //Can notifications play a sound?
                    canRunActionsOnWake: true, //Can run actions outside the app,
                    onNotification: function(notification) {
                      // Handle new push notifications here
                      alert(notification);
                      return true;
                    }
                  });
                }
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
