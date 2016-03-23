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
    var gap1 = document.getElementById('desiredGap1').value;
    var brakeBelt1 = document.getElementById('brakeSpeed1').value;
    var productDim1 = document.getElementById('prodSize1').value;
    var gap2 = document.getElementById('desiredGap2').value;
    var meterBelt1 = document.getElementById('meterSpeed1').value;
    var productDim2 = document.getElementById('prodSize2').value;
    var brakeBelt2 = document.getElementById('brakeSpeed2').value;
    var meterBelt2 = document.getElementById('meterSpeed2').value;
    var productDim3 = document.getElementById('prodSize3').value;

    if (!gap1 && !brakeBelt1 && !productDim1) {
      $('.calcButton').prop('disabled',true);
    } else {
      $('.calcButton').prop('disabled',false);
    }    
  });

  
  //Calculate button onclick listener
  var calcButton = document.getElementById('calculate');
  calcButton.addEventListener('click', function(){
    //Extracts form data
    var gap1 = document.getElementById('desiredGap1').value;
    var brakeBelt1 = document.getElementById('brakeSpeed1').value;
    var productDim1 = document.getElementById('prodSize1').value;
    var gap2 = document.getElementById('desiredGap2').value;
    var meterBelt1 = document.getElementById('meterSpeed1').value;
    var productDim2 = document.getElementById('prodSize2').value;
    var brakeBelt2 = document.getElementById('brakeSpeed2').value;
    var meterBelt2 = document.getElementById('meterSpeed2').value;
    var productDim3 = document.getElementById('prodSize3').value;

    //Searches column 1 for all 3 items not null
    if (!!gap1 && !!brakeBelt1 && !!productDim1) {
      
      //If gap input is less than 0, set to 0 (gap less than 0 impossible)
      if (gap1 < 0) {gap1 = 0;}

      //Calculations
      var expectedPitch = +gap1 + +productDim1;
      var BMBratio = 1/(expectedPitch/productDim1);
      var meterSpeedCalc = brakeBelt1/BMBratio;

      //Displays calculated values
      document.getElementById('column1').value = "Pitch (inches)";
      document.getElementById('column2').value = "Meter Speed (fpm)";
      document.getElementById('column3').value = "BMB Ratio";
      document.getElementById('output1').value = expectedPitch;
      document.getElementById('output2').value = meterSpeedCalc;
      document.getElementById('output3').value = BMBratio;
      
    //Searches column 2 for all 3 items not null
    } else if (!!gap2 && !!meterBelt1 && !!productDim2) {

      //If gap input is less than 0, set to 0 (gap less than 0 impossible)
      if (gap2 < 0){gap2 = 0;}

      //Calculations
      var expectedPitch = +gap2 + +productDim2;
      var BMBratio = 1/(expectedPitch/productDim2);
      var brakeSpeedCalc = meterBelt1*BMBratio;

      //Displays calculated values
      document.getElementById('column1').value = "Pitch (inches)";
      document.getElementById('column2').value = "Brake Speed (fpm)";
      document.getElementById('column3').value = "BMB Ratio";
      document.getElementById('output1').value = expectedPitch;
      document.getElementById('output2').value = brakeSpeedCalc;
      document.getElementById('output3').value = BMBratio;

    //Seaches column 3 for all 3 items not null
    } else if (!!brakeBelt2 && !!meterBelt2 && !!productDim3) {

      //Calculations
      var BMBratio = brakeBelt2/meterBelt2;
      var expectedPitch = 1/BMBratio*productDim3;
      var expectedGap = expectedPitch - productDim3;

      //If gap calculated less than 0, set to 0 (less than 0 gap impossible)
      if (expectedGap < 0){expectedGap = 0;}

      //Displays calculated values
      document.getElementById('column1').value = "Gap (inches)";
      document.getElementById('column2').value = "Pitch (inches)";
      document.getElementById('column3').value = "BMB Ratio";
      document.getElementById('output1').value = expectedGap;
      document.getElementById('output2').value = expectedPitch;
      document.getElementById('output3').value = BMBratio;
    }    
  });

  //Refresh button onclick listener
  //Refreshes the form
  var refrButton = document.getElementById('refresh');
  refrButton.addEventListener('click', function(){
    window.location.reload();
  });
});