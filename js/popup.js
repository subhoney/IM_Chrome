// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see 
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

//Button Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    $('.calcButton').prop('disabled',true);

  document.addEventListener('keyup', function(){
    //Extracts form data
    var gap = document.getElementById('desiredGap').value;
    var brakeBelt = document.getElementById('brakeSpeed').value;
    var productDim = document.getElementById('prodSize').value;
    var meterBelt = document.getElementById('meterSpeed').value;
    var inputCount = 4;

    if (!!gap) {
      inputCount = inputCount - 1;
      var lastGap = 1;
    } else if (!gap && lastGap == 1){
      inputCount = inputCount + 1;
      var lastGap = 0;
    }

    if (!!brakeBelt){
      inputCount = inputCount - 1;
      var lastBrakeBelt = 1;
    } else if (!brakeBelt && lastBrakeBelt == 1){
      inputCount = inputCount + 1;
      var lastBrakeBelt = 0;
    }

    if (!!meterBelt){
      inputCount = inputCount - 1;
      var lastMeterBelt = 1;
    } else if(!meterBelt && lastMeterBelt == 1){
      inputCount = inputCount + 1;
      var lastMeterBelt = 0;
    }
    
    if (!!productDim){
      inputCount = inputCount - 1;
      var lastProduct = 1;
    } else if(!productDim && lastProduct == 1){
      inputCount = inputCount + 1;
      var lastProduct = 0;
    }

    if (inputCount == 0){
      alert("What do you need me for? You already know everything.")
      $('.calcButton').prop('disabled',true);
    } else if (inputCount > 1){
      $('.calcButton').prop('disabled',true);
    } else if (inputCount == 1){
      $('.calcButton').prop('disabled',false);
    }       
  });

  
  //Calculate button onclick listener
  var calcButton = document.getElementById('calculate');
  calcButton.addEventListener('click', function(){
    //Extracts form data
    var gap = document.getElementById('desiredGap').value;
    var brakeBelt = document.getElementById('brakeSpeed').value;
    var productDim = document.getElementById('prodSize').value;
    var meterBelt = document.getElementById('meterSpeed').value;

    //Searches column 1 for all 3 items not null
    if (!!gap && !!brakeBelt && !!productDim) {

        //If gap input is less than 0, set to 0 (gap less than 0 impossible)
        if (gap < 0) {gap = 0;}

        //Calculations
        var expectedPitch = +gap + +productDim;
        var BMBratio = 1/(expectedPitch/productDim);
        var meterSpeedCalc = brakeBelt/BMBratio;

        BMBrato = BMBratio.toString();
        expectedPitch - expectedPitch.toString();
        meterSpeedCalc = meterSpeedCalc.toString();
      
        var values = ["BMB Ratio = " + BMBratio, "Pitch (inches) = " + expectedPitch, "Meter Speed (fpm) = " + meterSpeedCalc];

        d3.select("body").selectAll("p")
          .data(values)
          .text(String)
          .enter()
            .append('p')
            .text(String);

    //Searches column 2 for all 3 items not null
    } else if (!!gap && !!meterBelt && !!productDim) {

        //If gap input is less than 0, set to 0 (gap less than 0 impossible)
        if (gap < 0){gap = 0;}

        //Calculations
        var expectedPitch = +gap + +productDim;
        var BMBratio = 1/(expectedPitch/productDim);
        var brakeSpeedCalc = meterBelt*BMBratio;

        BMBrato = BMBratio.toString();
        expectedPitch - expectedPitch.toString();
        brakeSpeedCalc = brakeSpeedCalc.toString();

        var values = ["BMB Ratio = " + BMBratio, "Pitch (inches) = " + expectedPitch, "Brake Speed (fpm) = " + brakeSpeedCalc];

        d3.select("body").selectAll("p")
          .data(values)
          .text(String)
          .enter()
            .append('p')
            .text(String);

    //Seaches column 3 for all 3 items not null
    } else if (!!brakeBelt && !!meterBelt && !!productDim) {

        //Calculations
        var BMBratio = brakeBelt/meterBelt;
        var expectedPitch = 1/BMBratio*productDim;
        var expectedGap = expectedPitch - productDim;

        //If gap calculated less than 0, set to 0 (gap less than 0 impossible)
        if (expectedGap < 0){expectedGap = "0";}

        BMBrato = BMBratio.toString();
        expectedPitch - expectedPitch.toString();
        expectedGap = expectedGap.toString();

        var values = ["BMB Ratio = " + BMBratio, "Pitch (inches) = " + expectedPitch, "Gap (inches) = " + expectedGap];

        d3.select("body").selectAll("p")
          .data(values)
          .text(String)
          .enter()
            .append('p')
            .text(String);

    //Searches the columns for a condition requiring no calculation
    } else if (!!brakeBelt && !!meterBelt && !!gap){

        alert("What do you need me for? You already know everything.")
      
    }
  });

  //Refresh button onclick listener
  //Refreshes the form
  var refrButton = document.getElementById('refresh');
  refrButton.addEventListener('click', function(){
    window.location.reload();
  });
});