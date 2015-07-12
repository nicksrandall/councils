// Utilities for CouncilsApp
;
//
Array.prototype.contains = function(element) {
  return this.indexOf(element) != -1
}
Array.prototype.pushUnique = function(element) {
  if( ! this.contains(element) )
    this.push(element);
}
Array.prototype.remove = function(element) {
  if(this.contains(element)) {
    var spliceStart = this.indexOf(element);
    this.splice(spliceStart, 1);
  }
}

// Add or subtract (with - numbers) the specified number of days
// from the current date object
Date.prototype.addDays = function(days) {
  //Get current date from date object
  var newDate = new Date(this.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

// Get the Full english month string of the current date object
Date.prototype.getMonthString = function() {
  var englishMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return englishMonths[ this.getMonth() ]
};

// Get suffix for the date of the current date object
Date.prototype.getOrdinalSuffix = function() {
  switch( this.getDate() ) {
    case 1:
    case 21:
    case 31:
      suffix = "st";
      break;

    case 2:
    case 22:
      suffix = "nd";
      break;

    case 3:
    case 23:
      suffix = "rd";
      break;

    default:
      suffix = "th";
  }
  return suffix;
};

(function() {
  HTMLSelectElement.prototype.customPlaceholder = function(placeholderText) {
    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerText = placeholderText;
    defaultOption.setAttribute('disabled',true);
    defaultOption.setAttribute('selected',true);
    defaultOption.style.display = "none";

    var first = this.children[0]
    console.log(first)
    console.log(this.children)
    this.insertBefore(defaultOption, first);
  }
})();

// Set textareas to shrink/expand with amount of content
(function() {
  HTMLTextAreaElement.prototype.autoResize = function() {
    // Create an object that will be for size reference
    var clone = document.createElement("div");

    var clonable_attributes = [
      "padding",
      "padding-top",
      "padding-bottom",
      "padding-left",
      "padding-right",
      "font-family",
      "font-size",
      "line-height",
      "font",
      "width",
      "min-height",
      "word-wrap",
      "white-space"
    ]

    // Copy size/layout specific styles to clone
    var styles = window.getComputedStyle(this,null);
    for ( var attr in clonable_attributes) {
      var val = styles.getPropertyValue([clonable_attributes[attr]]);
      clone.style[clonable_attributes[attr]] = val;
    }

    // Place the clone div right behind the textarea
    clone.style.display = "block";
    clone.style.position = "absolute";
    clone.style.zIndex = "-10";
    clone.style.top = "0";
    clone.style.color = "transparent";

    // Add clone to same parent as the textarea
    this.parentNode.appendChild(clone);

    var adjustTextareaToFitContent = function() {
      clone.innerText = this.value;
      var cloneHeight = parseInt(window.getComputedStyle(clone,null).getPropertyValue('height'));
      cloneHeight += parseInt(clone.style.lineHeight);
      this.style.height = cloneHeight + "px";
    }

    // bind to keyup event for resizing
    this.addEventListener("keyup", adjustTextareaToFitContent);
    adjustTextareaToFitContent.apply(this);
  }
})();

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('councilsApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

// Routes for the App
angular.module('councilsApp')

.config( function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/simple/welcome')
  var viewRoot = "views/";

  $stateProvider.state('menu.home', {
    url: "/home",
    views: {
      "menuContent" : {
        templateUrl: viewRoot + "home.html",
        controller: "HomeController"
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
    templateUrl: viewRoot + "setup.html"
  })

  $stateProvider.state('simple.login', {
    url: "/login",
    templateUrl: viewRoot + "login.html"
  })

  $stateProvider.state('navigations', {
    url: "/navigation",
    templateUrl: viewRoot + "navigation.html",
  })

  $stateProvider.state('menu.profile', {
    url: "/profile",
    views: {
      'menuContent': {
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
        controller: "CouncilController"
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

// Controllers for the CouncilsApp
angular.module('councilsApp')

.controller("ApplicationController", ['MODALS', '$rootScope', '$ionicHistory', '$scope', '$ionicModal', '$ionicSideMenuDelegate', function(MODALS, $rootScope, $ionicHistory, $scope, $ionicModal, $ionicSideMenuDelegate) {
  $scope.modal = {};

  $rootScope.viewConfig = {
    currentCouncilId: 0,
    currentCouncilTab: "discussion"
  }

  $rootScope.back = function() {
    $ionicHistory.goBack();
  }
}])


.controller("HomeController", ['$scope', function($scope) {
  $scope.assignments = [
    {
      id: 1,
      content: "Visit Juliet Schumpeter who just moved into the ward.",
      comments: [],
      dueDate: '2015-06-18T11:30:00',
      completed: false
    },
    {
      id: 2,
      content: "Fiona Hayek just had a baby. Assign sister to bring Dinner.",
      comments: [],
      dueDate: '2015-06-17T11:30:00',
      completed: false
    },
    {
      id: 3,
      content: "Fill the Family History Consultant calling.",
      comments: [{},{}],
      dueDate: '2015-06-16T11:30:00',
      completed: false
    }
  ]

  $scope.discussions = [
    {
      id: 1,
      userAvatar: "headshot.png",
      userName: "David Ricardo",
      content: "Do we have any volunteers to provide refreshments for the Jack Welch fireside?",
      comments: [{},{},{},{}],
      createdDate: '2015-06-18T11:30:00'
    },
    {
      id: 2,
      userAvatar: "headshot.png",
      userName: "David Ricardo",
      content: "Do we have any volunteers to provide refreshments for the Jack Welch fireside?",
      comments: [],
      createdDate: '2015-06-17T11:30:00'
    },
    {
      id: 3,
      userAvatar: "headshot.png",
      userName: "David Ricardo",
      content: "Do we have any volunteers to provide refreshments for the Jack Welch fireside?",
      comments: [],
      createdDate: '2015-06-16T11:30:00'
    }
  ]
}])

.controller("LandingController", [ function() {

}])

.controller("AgendaController",
  ['MemberService', '$scope', '$ionicHistory', 'HymnService', '$stateParams', 'AGENDAS', 'MembersModal',
  function(MemberService, $scope, $ionicHistory, HymnService, $stateParams, AGENDAS, MembersModal) {

  $scope.members = MemberService.getMembers();

  $scope.openMembersModal = function(dataStore, max) {
    MembersModal.openModal(max, $scope.data[dataStore]).then(function(result) {
      $scope.data[dataStore] = result;
    })
  };

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
    if(toState.name == 'menu.agenda.detail') {
      $scope.agendaId = toParams.agendaId;
      $scope.agendaGroup = toParams.agendaGroupId;
    }
  });

  $scope.data = {
    date: "",
    openingHymn: "",
    openingPrayer: "",
    spiritualThought: "",
    highCounselor: "",
    callings: "",
    spiritualWelfare: "",
    temporalWelfare: "",
    fellowship: "",
    missionary: "",
    events: "",
    closingPrayer: ""
  }

  $scope.hymns = HymnService.getList();

  $scope.agendas = AGENDAS;
  $scope.agendaAccess = { "2":true,"3":true };

}])

.controller("CouncilDetailController", ['$scope','$stateParams', function($scope, $stateParams) {
    $scope.tab = $stateParams.currentCouncilTab;
    $scope.$emit("councilDetailTabChanged",$scope.tab);
}])

.controller("CouncilController",
  ['MemberService', 'MembersModal', 'COUNCILS', '$scope', '$stateParams', '$rootScope',
  function(MemberService, MembersModal, COUNCILS, $scope, $stateParams, $rootScope) {

  $scope.members = MemberService.getMembers();

  $scope.openMembersModal = function(dataStore, max) {
    MembersModal.openModal(max, $scope.data[dataStore]).then(function(result) {
      $scope.data[dataStore] = result;
    })
  };

  $scope.data = {
    participants: [],
    discussionParticipants: [],
    assignmentParticipants: []
  }

  $scope.$on('councilDetailTabChanged', function(event, data) {
    console.log(data);
  })

  $scope.councilList = COUNCILS;
  $scope.councilAccess = {
    "1" : {
      assignmentCount: 3,
      commentCount: 4
    },
    "2" : {
      assignmentCount: 0,
      commentCount: 2
    }
  }

  $scope.discussions = [
    {
      id: 1,
      userAvatar: "headshot.png",
      userName: "David Ricardo",
      content: "Do we have any volunteers to provide refreshments for the Jack Welch fireside?",
      comments: [{},{},{},{}],
      createdDate: '2015-06-18T11:30:00'
    },
    {
      id: 2,
      userAvatar: "headshot.png",
      userName: "David Ricardo",
      content: "Do we have any volunteers to provide refreshments for the Jack Welch fireside?",
      comments: [],
      createdDate: '2015-06-17T11:30:00'
    },
    {
      id: 3,
      userAvatar: "headshot.png",
      userName: "David Ricardo",
      content: "Do we have any volunteers to provide refreshments for the Jack Welch fireside?",
      comments: [],
      createdDate: '2015-06-16T11:30:00'
    }
  ]

  $scope.assignments = [
    {
      id: 1,
      userName: "John Say",
      content: "Visit Juliet Schumpeter who just moved into the ward.",
      comments: [],
      dueDate: '2015-06-18T11:30:00',
      completed: false
    },
    {
      id: 2,
      userName: "Adelle Smith",
      content: "Fiona Hayek just had a baby. Assign sister to bring Dinner.",
      comments: [],
      dueDate: '2015-06-17T11:30:00',
      completed: false
    },
    {
      id: 3,
      userName: "David Ricardo",
      content: "Fill the Family History Consultant calling.",
      comments: [{},{}],
      dueDate: '2015-06-16T11:30:00',
      completed: false
    }
  ]
}])

// Services for CouncilsApp
angular.module('councilsApp')

.factory("MemberService", [function() {

  var wardMembers = [
    {
      id: 0,
      name: "Amanda Tapping",
      avatar: "headshot.png"
    },
    {
      id: 1,
      name: "Samantha Carter",
      avatar: "headshot.png"
    },
    {
      id: 2,
      name: "Daniel Jackson",
      avatar: "headshot.png"
    },
    {
      id: 3,
      name: "Jack O'Neil",
      avatar: "headshot.png"
    },
    {
      id: 4,
      name: "Richard Anderson",
      avatar: "headshot.png"
    },
    {
      id: 5,
      name: "David Hewlett",
      avatar: "headshot.png"
    },
    {
      id: 6,
      name: "Rodney McKay",
      avatar: "headshot.png"
    },
    {
      id: 7,
      name: "Torri Higginson",
      avatar: "headshot.png"
    },
    {
      id: 8,
      name: "Elizabeth Weir",
      avatar: "headshot.png"
    },
    {
      id: 9,
      name: "Jason Mamoa",
      avatar: "headshot.png"
    },
    {
      id: 10,
      name: "Ronon Dex",
      avatar: "headshot.png"
    },
    {
      id: 11,
      name: "Rachel Luttrell",
      avatar: "headshot.png"
    },
    {
      id: 12,
      name: "Joe Flanigan",
      avatar: "headshot.png"
    }
  ];

  return {
    getMembers : function() { return wardMembers; }
  }
}])

.factory("MembersModal", ['MemberService', '$q', 'MODALS', '$ionicModal', '$rootScope', function(MemberService, $q, MODALS, $ionicModal, $rootScope) {

  $modalScope = $rootScope.$new();

  var type = "members";
  var userModal;
  var maxSelected = null;
  $modalScope.search = {};
  $modalScope.selection = {};
  $modalScope.search.Term = "";
  $modalScope.search.Results = {};
  $modalScope.selection.users = [];

  var openModal = function( max, selected ) {
    var deferred = $q.defer();

    if(selected)
      $modalScope.selection.users = selected;

    maxSelected = max || Number.MAX_VALUE;
    $ionicModal.fromTemplateUrl(MODALS[type], {
      animation: 'slide-in-up',
      scope: $modalScope
    }).then(function(modal) {
      $modalScope.search.Term = "";
      userModal = modal;

      $modalScope.closeModal = function() {
        deferred.resolve($modalScope.selection.users.slice());
        $modalScope.selection.users.splice(0,$modalScope.selection.users.length);
        userModal.remove();
      }

      userModal.show();
    })

    return deferred.promise;
  }

  $modalScope.selection.toggle = function(id) {

    if($modalScope.selection.users.contains(id)) {
      $modalScope.selection.users.remove(id);
    }

    else if ($modalScope.selection.users.length <= 1 && maxSelected == 1) {
      $modalScope.selection.users.splice(0,1);
      $modalScope.selection.users.pushUnique(id);
      $modalScope.closeModal()
    }

    else if ($modalScope.selection.users.length < maxSelected) {
      $modalScope.selection.users.pushUnique(id);
    }
    // Otherwise ignore click, as there'd be too many
  }

  $modalScope.$watch( 'search.Term', search );

  function search() {
    $modalScope.search.Results = wardMembers.filter(function(m) {return m.name.toLowerCase().indexOf($modalScope.search.Term.toLowerCase()) >= 0})
  }

  var wardMembers = MemberService.getMembers();

  return {
    openModal: openModal
  }
}])

.factory("CouncilsService", ['$scope', function() {
  return function() {}
}])

.factory("HymnService", function( ) {
  var hymns = [
    "The Morning Breaks",
    "The Spirit of God",
    "Now Let Us Rejoice",
    "Truth Eternal",
    "High on the Mountain Top",
    "Redeemer of Israel",
    "Israel, Israel, God Is Calling",
    "Awake and Arise",
    "Come, Rejoice",
    "Come, Sing to the Lord",
    "What Was Witnessed in the Heavens?",
    "'Twas Witnessed in the Morning Sky",
    "An Angel from on High",
    "Sweet Is the Peace the Gospel Brings",
    "I Saw a Mighty Angel Fly",
    "What Glorious Scenes Mine Eyes Behold",
    "Awake, Ye Saints of God, Awake!",
    "The Voice of God Again Is Heard",
    "We Thank Thee, O God, for a Prophet",
    "God of Power, God of Right",
    "Come, Listen to a Prophet's Voice",
    "We Listen to a Prophet's Voice",
    "We Ever Pray for Thee",
    "God Bless Our Prophet Dear",
    "Now We'll Sing with One Accord",
    "Joseph Smith's First Prayer",
    "Praise to the Man",
    "Saints, Behold How Great Jehovah",
    "A Poor Wayfaring Man of Grief",
    "Come, Come, Ye Saints",
    "O God, Our Help in Ages Past",
    "The Happy Day at Last Has Come",
    "Our Mountain Home So Dear",
    "O Ye Mountains High",
    "For the Strength of the Hills",
    "They, the Builders of the Nation",
    "The Wintry Day, Descending to Its Close",
    "Come, All Ye Saints of Zion",
    "O Saints of Zion",
    "Arise, O Glorious Zion",
    "Let Zion in Her Beauty Rise",
    "Hail to the Brightness of Zion's Glad Morning!",
    "Zion Stands with Hills Surrounded",
    "Beautiful Zion, Built Above",
    "Lead Me into Life Eternal",
    "Glorious Things of Thee Are Spoken",
    "We Will Sing of Zion",
    "Glorious Things Are Sung of Zion",
    "Adam-ondi-Ahman",
    "Come, Thou Glorious Day of Promise",
    "Sons of Michael, He Approaches",
    "The Day Dawn Is Breaking",
    "Let Earth's Inhabitants Rejoice",
    "Behold, the Mountain of the Lord",
    "Lo, the Mighty God Appearing!",
    "Softly Beams the Sacred Dawning",
    "We're Not Ashamed to Own Our Lord",
    "Come, Ye Children of the Lord",
    "Come, O Thou King of Kings",
    "Battle Hymn of the Republic",
    "Raise Your Voices to the Lord",
    "All Creatures of Our God and King",
    "Great King of Heaven",
    "On This Day of Joy and Gladness",
    "Come, All Ye Saints Who Dwell on Earth",
    "Rejoice, the Lord Is King!",
    "Glory to God on High",
    "A Mighty Fortress Is Our God",
    "All Glory, Laud, and Honor",
    "Sing Praise to Him",
    "With Songs of Praise",
    "Praise to the Lord, the Almighty",
    "Praise the Lord with Heart and Voice",
    "Praise Ye the Lord",
    "In Hymns of Praise",
    "God of Our Fathers, We Come unto Thee",
    "Great Is the Lord",
    "God of Our Fathers, Whose Almighty Hand",
    "With All the Power of Heart and Tongue",
    "God of Our Fathers, Known of Old",
    "Press Forward, Saints",
    "For All the Saints",
    "Guide Us, O Thou Great Jehovah",
    "Faith of Our Fathers",
    "How Firm a Foundation",
    "How Great Thou Art",
    "God Is Love",
    "Great God, Attend While Zion Sings",
    "The Lord Is My Light",
    "From All That Dwell below the Skies",
    "Father, Thy Children to Thee Now Raise",
    "For the Beauty of the Earth",
    "Prayer of Thanksgiving",
    "Come, Ye Thankful People",
    "Now Thank We All Our God",
    "Dearest Children, God Is Near You",
    "Lead, Kindly Light",
    "I Need Thee Every Hour",
    "Nearer, Dear Savior, to Thee",
    "Nearer, My God, to Thee",
    "Guide Me to Thee",
    "Jesus, Lover of My Soul",
    "Precious Savior, Dear Redeemer",
    "Jesus, Savior, Pilot Me",
    "Master, the Tempest Is Raging",
    "God Speed the Right",
    "Lord, Accept Our True Devotion",
    "The Lord Is My Shepherd",
    "The Lord My Pasture Will Prepare",
    "Cast Thy Burden upon the Lord",
    "Rock of Ages",
    "Savior, Redeemer of My Soul",
    "Our Savior's Love",
    "Come unto Him",
    "Come, Ye Disconsolate",
    "Come, Follow Me",
    "Come unto Jesus",
    "Ye Simple Souls Who Stray",
    "Come, We That Love the Lord",
    "Lean on My Ample Arm",
    "I'm a Pilgrim, I'm a Stranger",
    "Though Deepening Trials",
    "Oh, May My Soul Commune with Thee",
    "Be Still, My Soul",
    "How Gentle God's Commands",
    "How Long, O Lord Most Holy and True",
    "Does the Journey Seem Long?",
    "When Faith Endures",
    "Where Can I Turn for Peace?",
    "Be Thou Humble",
    "More Holiness Give Me",
    "God Is in His Holy Temple",
    "Father in Heaven",
    "I Believe in Christ",
    "My Redeemer Lives",
    "I Know That My Redeemer Lives",
    "Testimony",
    "Bless Our Fast, We Pray",
    "In Fasting We Approach Thee",
    "Did You Think to Pray?",
    "Jesus, the Very Thought of Thee",
    "Sweet Hour of Prayer",
    "Let the Holy Spirit Guide",
    "Secret Prayer",
    "Prayer Is the Soul's Sincere Desire",
    "Gently Raise the Sacred Strain",
    "Sweet Is the Work",
    "Sabbath Day",
    "As the Dew from Heaven Distilling",
    "O Thou Kind and Gracious Father",
    "We Meet, Dear Lord",
    "God Be with You Till We Meet Again",
    "Lord, We Ask Thee Ere We Part",
    "Father, This Hour Has Been One of Joy",
    "We Have Partaken of Thy Love",
    "Sing We Now at Parting",
    "Thy Spirit, Lord, Has Stirred Our Souls",
    "Before Thee, Lord, I Bow My Head",
    "Now the Day Is Over",
    "Softly Now the Light of Day",
    "The Lord Be with Us",
    "Lord, We Come before Thee Now",
    "Lord, Dismiss Us with Thy Blessing",
    "Great God, to Thee My Evening Song",
    "Abide with Me; 'Tis Eventide",
    "Abide with Me!",
    "Come, Let Us Sing an Evening Hymn",
    "As the Shadows Fall",
    "As Now We Take the Sacrament",
    "God, Our Father, Hear Us Pray",
    "With Humble Heart",
    "In Humility, Our Savior",
    "While of These Emblems We Partake",
    "While of These Emblems We Partake",
    "O God, the Eternal Father",
    "'Tis Sweet to Sing the Matchless Love",
    "'Tis Sweet To Sing the Matchless Love",
    "O Lord of Hosts",
    "Again, Our Dear Redeeming Lord",
    "Father in Heaven, We Do Believe",
    "Jesus of Nazareth, Savior and King",
    "We'll Sing All Hail to Jesus' Name",
    "In Remembrance of Thy Suffering",
    "Upon the Cross of Calvary",
    "Reverently and Meekly Now",
    "Again We Meet around the Board",
    "God Loved Us, So He Sent His Son",
    "Thy Will, O Lord, Be Done",
    "O Thou, Before the World Began",
    "In Memory of the Crucified",
    "Behold the Great Redeemer Die",
    "He Died! The Great Redeemer Died",
    "I Stand All Amazed",
    "There Is a Green Hill Far Away",
    "How Great the Wisdom and the Love",
    "Jesus, Once of Humble Birth",
    "O Savior, Thou Who Wearest a Crown",
    "That Easter Morn",
    "He Is Risen!",
    "Christ the Lord Is Risen Today",
    "Joy to the World",
    "Oh, Come, All Ye Faithful",
    "Angels We Have Heard on High",
    "Silent Night",
    "Once in Royal David's City",
    "Away in a Manger",
    "It Came upon the Midnight Clear",
    "O Little Town of Bethlehem",
    "Hark! The Herald Angels Sing",
    "With Wondering Awe",
    "While Shepherds Watched Their Flocks",
    "Far, Far Away on Judea's Plains",
    "The First Noel",
    "I Heard the Bells on Christmas Day",
    "Ring Out, Wild Bells",
    "We Are Sowing",
    "Come, Let Us Anew",
    "We Give Thee But Thine Own",
    "Because I Have Been Given Much",
    "Lord, I Would Follow Thee",
    "Dear to the Heart of the Shepherd",
    "Hear Thou Our Hymn, O Lord",
    "Have I Done Any Good?",
    "I Have Work Enough to Do",
    "We Are Marching On to Glory",
    "Improve the Shining Moments",
    "There Is Sunshine in My Soul Today",
    "You Can Make the Pathway Bright",
    "Today, While the Sun Shines",
    "Scatter Sunshine",
    "Father, Cheer Our Souls Tonight",
    "Let Us Oft Speak Kind Words",
    "Nay, Speak No Ill",
    "Jesus, Mighty King in Zion",
    "Should You Feel Inclined to Censure",
    "Lord, Accept into Thy Kingdom",
    "Do What Is Right",
    "Behold Thy Sons and Daughters, Lord",
    "Choose the Right",
    "Know This, That Every Soul Is Free",
    "Count Your Blessings",
    "Praise God, from Whom All Blessings Flow",
    "Let Us All Press On",
    "Come Along, Come Along",
    "This House We Dedicate to Thee",
    "Onward, Christian Soldiers",
    "We Love Thy House, O God",
    "Up, Awake, Ye Defenders of Zion",
    "Called to Serve",
    "We Are All Enlisted",
    "Behold! A Royal Army",
    "Put Your Shoulder to the Wheel",
    "Like Ten Thousand Legions Marching",
    "True to the Faith",
    "Carry On",
    "As Zion's Youth in Latter Days",
    "Rejoice! A Glorious Sound Is Heard",
    "O Thou Rock of Our Salvation",
    "Hope of Israel",
    "Who's on the Lord's Side?",
    "Thy Servants Are Prepared",
    "Go, Ye Messengers of Glory",
    "Go Forth with Faith",
    "Hark, All Ye Nations!",
    "Arise, O God, and Shine",
    "The Time Is Far Spent",
    "How Wondrous and Great",
    "Come, All Whose Souls Are Lighted",
    "Jehovah, Lord of Heaven and Earth",
    "I'll Go Where You Want Me to Go",
    "Oh, Holy Words of Truth and Love",
    "Oh Say, What Is Truth?",
    "Truth Reflects upon Our Senses",
    "The Iron Rod",
    "Men Are That They Might Have Joy",
    "Come Away to the Sunday School",
    "As I Search the Holy Scriptures",
    "Thanks for the Sabbath School",
    "Thy Holy Word",
    "Welcome, Welcome, Sabbath Morning",
    "Help Me Teach with Inspiration",
    "We Meet Again in Sabbath School",
    "The Glorious Gospel Light Has Shone",
    "If You Could Hie to Kolob",
    "God Moves in a Mysterious Way",
    "Oh, What Songs of the Heart",
    "Rise, Ye Saints, and Temples Enter",
    "How Beautiful Thy Temples, Lord",
    "Holy Temples on Mount Zion",
    "Rejoice, Ye Saints of Latter Days",
    "Turn Your Hearts",
    "O My Father",
    "Each Life That Touches Ours for Good",
    "Love at Home",
    "O Love That Glorifies the Son",
    "Our Father, by Whose Name",
    "From Homes of Saints Glad Songs Arise",
    "Home Can Be a Heaven on Earth",
    "Children of Our Heavenly Father",
    "Families Can Be Together Forever",
    "I Am a Child of God",
    "I Know My Father Lives",
    "Keep the Commandments",
    "Teach Me to Walk in the Light",
    "The Light Divine",
    "God's Daily Care",
    "In Our Lovely Deseret",
    "Love One Another",
    "As Sisters in Zion (Women)",
    "A Key Was Turned in Latter Days (Women)",
    "We Meet Again as Sisters (Women)",
    "We Ever Pray for Thee (Women)",
    "God Is Love (Women)",
    "How Gentle God's Commands (Women)",
    "Jesus, the Very Thought of Thee (Women)",
    "The Lord Is My Shepherd (Women)",
    "Sweet Is the Work (Women)",
    "Love at Home (Women)",
    "Ye Elders of Israel (Men)",
    "The Priesthood of Our Lord (Men)",
    "Ye Who Are Called to Labor (Men)",
    "Come, All Ye Sons of God (Men)",
    "Rise Up, O Men of God (Men's Choir)",
    "Rise Up, O Men of God (Men)",
    "See the Mighty Priesthood Gathered (Men's Choir)",
    "Come, Come, Ye Saints (Men's Choir)",
    "Go, Ye Messengers of Heaven (Men's Choir)",
    "An Angel from on High",
    "Thy Servants Are Prepared (Men's Choir)",
    "See, the Mighty Angel Flying (Men's Choir)",
    "Oh Say, What Is Truth? (Men's Choir)",
    "Come, O Thou King of Kings (Men's Choir)",
    "High on the Mountain Top (Men's Choir)",
    "I Need Thee Every Hour (Men's Choir)",
    "Brightly Beams Our Father's Mercy (Men's Choir)",
    "School Thy Feelings (Men's Choir)",
    "O Home Beloved (Men's Choir)",
    "America the Beautiful",
    "My Country, 'Tis of Thee",
    "The Star-Spangled Banner",
    "God Save the King"
  ];

  return {
    getList: function() {
      return hymns;
    },
    getHymn: function(id) {
      if(id > 341 || id < 1)
        return "Invalid Hymn Number (" + id + ")";
      return hymns[id-1];
    }
  }
})

// Filters for CouncilsApp
angular.module('councilsApp')

.filter("wordOrDate", function() {
  return function( input ) {
    var date = new Date(input);
    var now = new Date();
    var prefix = null;
    
    // Check if yesterday
    var step = now.addDays(-1);
    if(step.getYear() == date.getYear() && step.getMonth() == date.getMonth() && step.getDate() == date.getDate())
      prefix = "Yesterday";

    // Check if today
    step = now;
    if(step.getYear() == date.getYear() && step.getMonth() == date.getMonth() && step.getDate() == date.getDate())
      prefix = "Today";

    // Check if Tomorrow
    step = now.addDays(1);
    if(step.getYear() == date.getYear() && step.getMonth() == date.getMonth() && step.getDate() == date.getDate())
      prefix = "Tomorrow";

    if(prefix) {
      output = prefix + " at " + date.getHours()%12 + ":" + date.getMinutes() + ((date.getHours() > 12) ? "PM" : "AM");
    } else {
      output = date.getMonthString() + " " + date.getDate() + date.getOrdinalSuffix() + " at " + date.getHours()%12 + ":" + date.getMinutes() + ((date.getHours() > 12) ? "PM" : "AM");
    }
    return output;
  }
})

// Directives for CouncilsApp
angular.module('councilsApp')

.directive("autoResize", function() {
  return function(scope, element) {
    element[0].autoResize();
  }
})

.directive("customPlaceholder", function() {
  return function(scope, element) {
    var defaultValue = element[0].getAttribute('custom-placeholder')
    element[0].customPlaceholder( defaultValue );
  }
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

// Constants for CouncilsApp
angular.module('councilsApp')

.constant('MODALS', {
  connectionError: "views/modals/no_internet.html",
  permissionError: "views/modals/no_permission.html",
  feedback: "views/modals/feedback.html",
  members: "views/modals/members.html"
})

.constant('AGENDAS', {
  "stake" : {
    "0" : "Presidency",
    "1" : "High Council",
    "2" : "Bishops",
    "3" : "Stake Council",
    "4" : "Bishops Welfare"
  },
  "ward" : {
    "5" : "Bishopric",
    "6" : "PEC",
    "7" : "Ward Council"
  }
})

.constant('COUNCILS', {
  "stake" : {
    "0" : "Stake Presidency",
    "1" : "High Council",
    "2" : "Patriarch",
    "3" : "Bishops",
    "4" : "Relief Society",
    "5" : "Young Men",
    "6" : "Young Women",
    "7" : "Sunday School",
    "8" : "Primary",
    "9" : "Missionary",
    "10" : "Auditing"
  },
  "ward" : {
    "11" : "Bishopric",
    "12" : "Ward Council",
    "13" : "Sacrament",
    "14" : "Interviews",
    "15" : "PEC",
    "16" : "High Priest",
    "17" : "Elders",
    "18" : "Relief Society",
    "19" : "Young Men",
    "20" : "Young Women",
    "21" : "Sunday School",
    "22" : "Primary"
  }
})
