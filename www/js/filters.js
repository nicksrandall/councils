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
