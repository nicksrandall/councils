// Filters for CouncilsApp
angular.module('councilsApp')

.filter('weekDate', function () {
  return function (input) {
    return moment().isoWeek(+input).day(0).format('MMM D');
  };
})

.filter('fullName', function () {
  return function (input, other) {
    if (input && input.fname && input.lname) {
      return input.fname + ' ' + input.lname;
    }
    return other;
  } 
})
