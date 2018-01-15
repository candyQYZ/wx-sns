var g_rem = 20;
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) {
        clientWidth = 375;
      }
      clientWidth = clientWidth > 640 ? 640 : clientWidth;
      g_rem = 20 * (clientWidth / 375);
      docEl.style.fontSize = g_rem + 'px';
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
