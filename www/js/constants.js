// Constants for CouncilsApp
angular.module('councilsApp')

.constant('MODALS', {
  connectionError: "views/modals/no_internet.html",
  permissionError: "views/modals/no_permission.html",
  feedback: "views/modals/feedback.html"
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
