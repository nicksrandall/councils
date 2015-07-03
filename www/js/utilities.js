// Utilities for CouncilsApp

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
