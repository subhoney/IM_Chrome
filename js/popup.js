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

var DEBUG = false;

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

// event listeners 
// neither of these work!
var calcButton = document.getElementById("calculate");
$(calcButton).on('click', function() { // syntax?
	alert('foo');
}

$('calculate').on('click', function() { // syntax?
	alert('bar');
}

function calculateGap () { 
	var brakeSpeed = document.getElementById('brakeSpeed').value;
	var meterSPeed = document.getElementById('meterSpeed').value;
	var prodSize = document.getElementById('prodSize').value;

	// return zero gap if meterSpeed is zero 
	if (meterSpeed === 0) {
		alert("Meter belt not running."); 
		return;
	} 
	var gap = ((brakeSpeed / meterSpeed ) - 1 ) * prodSize;
	var pitch = gap + prodSize; 
	
	//TODO: preach
	/*
	alert("Expected Gap: " + gap + ". \n + 
		"Expected Pitch: " + pitch + "."
	);
	*/
}


// source: http://jsfiddle.net/9n8c5bun/ (sorta)
/* function changeButtonState() {
    if(DEBUG) {
        alert("changeButtonState() called."); // never executes, regardless of DEBUG staus
    }    
    var empty = false;
    
    var $form_elements = $("#bmb").find(":input");  
    
    $form_elements.each(function() {                
       if ($(this).val() == '') {
           empty = true;
       } 
    });
    
    if (empty) {
        $('#calculate').attr('disabled', 'disabled');
    }     
    else {
        $('#calculate').removeAttr('disabled');
    }
}
 */