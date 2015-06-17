// Utilities for CouncilsApp
Date.prototype.addDays = function(days) {
  //Get current date from date object
  var newDate = new Date(this.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}
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
}
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
}
