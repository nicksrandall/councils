// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('councilsApp', [
  'ngAnimate',
  'monospaced.elastic',
  'firebase',
  'ionic', 
  'ionic.service.core','ionic.service.deploy',
  'ionic.service.analytics',
  'angularMoment',
  'ionic.service.push',
  'ngCordova',
  'ionic-datepicker'
])

.config(function ($cordovaInAppBrowserProvider) {
  var defaultOptions = {
    location: 'no',
    clearcache: 'no',
    toolbar: 'yes'
  };
  $cordovaInAppBrowserProvider.setDefaultOptions(defaultOptions);
})

.run(function($ionicPlatform, $rootScope, $state, $cordovaStatusbar, $timeout, Auth, User, $ionicUser, $ionicPush, $ionicDeploy, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
    var deviceInformation = ionic.Platform.device();
    $ionicAnalytics.register();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    (function () {
      // Let's set a pretty high verbosity level, so that we see a lot of stuff
      // in the console (reassuring us that something is happening).
      store.verbosity = store.INFO;

      // We register a dummy product. It's ok, it shouldn't
      // prevent the store "ready" event from firing.
      store.register({
          id:    'subscription1', // id without package name!
          alias: 'subscription1',
          type:  store.PAID_SUBSCRIPTION
      });

      // When every goes as expected, it's time to celebrate!
      // The "ready" event should be welcomed with music and fireworks,
      // go ask your boss about it! (just in case)
      store.ready(function() {
          console.log("\\o/ STORE READY \\o/");
      });

      // After we've done our setup, we tell the store to do
      // it's first refresh. Nothing will happen if we do not call store.refresh()
      store.refresh();
    }())

    // $ionicDeploy.check().then(function(hasUpdate) {
    //   console.log('Ionic Deploy: Update available: ' + hasUpdate);
    //   if (hasUpdate) {
    //     $ionicDeploy.update();
    //   }
    // });

    // ionic.Platform.fullScreen(true, false);

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
                if (window.plugins && window.plugins.pushNotification) {
                  registerForNotifications();
                }
              });
          });
      } else {
        console.log("Logged out");
      }
    });
  });

  function registerForNotifications() {
    setTimeout(function () {
      $ionicPush.register({
        canShowAlert: true, //Can pushes show an alert on your screen?
        canSetBadge: true, //Can pushes update app icon badges?
        canPlaySound: true, //Can notifications play a sound?
        canRunActionsOnWake: true, //Can run actions outside the app,
        onNotification: function(notification) {
          // Handle new push notifications here
          console.log(notification);
          // if (notification.alert) {
          //   if(navigator.notification) {
          //     navigator.notification.alert(notification.alert);
          //   } else {
          //     alert(notification.alert);
          //   }
          // }

          // if (notification.sound) {
          //   var snd = new Media(event.sound);
          //   snd.play();
          // }

          // if (notification.badge) {
          //   $cordovaPush.setBadgeNumber(notification.badge).then(function(result) {
          //     // Success!
          //     console.log('badge success!');
          //   }, function(err) {
          //     // An error occurred. Show a message to the user
          //   });
          // }
          return true;
        }
      });
    }, 1000);
  }

  // Handles incoming device tokens
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    User.get()
      .then(function (me) {
        return me.$ref().child('tokens').child(ionic.Platform.device().uuid).set(data);
      });
  });

  $rootScope.$on("$stateChangeError", function(event, next, nextP, previous, previousP, error) {
    if (error === "AUTH_REQUIRED") {
      $state.go("simple.welcome");
    }
  });
});
