// ==UserScript==
// @name        google photos custom autorefresh slideshow
// @namespace   gphotos-slideshow
// @include     https://photos.google.com/share/*/photo/*
// @version     1
// @grant       none
// ==/UserScript==
var direction = direction || 'forward';
var key = key || 39;

function pressKey() {
  var body = document.getElementsByTagName('body')[0];
  if(document.createEventObject) {
    var eventObj = document.createEventObject();
    eventObj.keyCode = key;
    body.fireEvent("onkeydown", eventObj);
  } else if (document.createEvent) {
    var eventObj = document.createEvent("Events");
    eventObj.initEvent("keydown", true, true);
    eventObj.which = key;
    body.dispatchEvent(eventObj);
  }
}

function next_or_prev() {
  var current_url = window.location.href;
  pressKey();
  if (current_url == window.location.href) {
    // page didnt change, must be at last or first photo
    window.location.reload();
  }
}

function finish_loading() {
  window.setInterval(function(){next_or_prev()}, 5000);
  var current_url = window.location.href;
  pressKey();
  if (current_url == window.location.href) {
    // page didnt change, must be at last photo
    direction = 'backward';
    key = 37;
    pressKey();
  }
}

window.onload = function () { finish_loading()  }
