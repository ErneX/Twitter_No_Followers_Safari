/* 
Copyright:
  Copyright (c) 2013 Ernesto González Aroca

License:
  The MIT License

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
  
Version:
  1.0
*/

Namespace('com.ernex.nofollowers');

(function (extension, undefined) {

  var settings = {
    attributeName: 'data-element-term',
    attributeValue: 'follower_stats',
    profileStatsClass: 'js-mini-profile-stats',
    twitterIDContainerClass: 'account-group js-mini-current-user',
    twitterIDAttributeName: 'data-user-id',
    twitterUserID: '' //retrieved by the script from the DOM
  }

  extension.hasClass = function(el, name) {
    if ('null' != el && typeof el != "undefined" && el) {
      return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
    }
    return false;
  }

  extension.isMyProfileStats = function(elem) {
    while (elem) {
      if (elem.nodeName == 'UL' && extension.hasClass(elem, settings.profileStatsClass) && typeof elem.hasAttribute == 'function' && elem.hasAttribute(settings.twitterIDAttributeName)) {
        if (elem.getAttribute(settings.twitterIDAttributeName) == settings.twitterUserID) {
          return true;
        } else {
          return false;
        }
      }
      elem = elem.parentNode;
    }
    return false;
  }

  extension.removeFollowersAmount = function() {
    if (settings.twitterUserID == "") extension.getTwitterID();
    var elems = document.getElementsByTagName('*');
    for (var i = 0; i < elems.length; i++) {
      if (elems[i].getAttribute(settings.attributeName)) {
        for (var x=0; x<elems[i].attributes.length; x++) {
          if (elems[i].attributes[x].value == settings.attributeValue) {
            if (extension.isMyProfileStats(elems[i])) elems[i].parentNode.removeChild(elems[i]);
          }
        }
      }
    }
  }

  extension.getTwitterID = function() {
    var twitterIDContainer = document.getElementsByClassName(settings.twitterIDContainerClass);
    if (twitterIDContainer.length > 0) {
      var twitterID = twitterIDContainer[0].getAttribute(settings.twitterIDAttributeName);
      if (settings.twitterUserID == "" && twitterID != "") settings.twitterUserID = twitterID;
    }
  }

  extension.init = function() {
    document.addEventListener('DOMContentLoaded',extension.removeFollowersAmount);
    document.addEventListener('DOMNodeInserted',extension.removeFollowersAmount);
  }

}(com.ernex.nofollowers = com.ernex.nofollowers || {}));

with(com.ernex.nofollowers) {
  init();
}

