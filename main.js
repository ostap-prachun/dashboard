function resizeWidgets() {
  var colWidth = 208;
  var colCount = Math.min(2, Math.floor((window.innerWidth - 16) / colWidth));
  if(resizeWidgets.colCount === colCount)
    return;
  resizeWidgets.colCount = colCount;
  document.getElementById('widgets').style.maxWidth = colCount === 1 ? colWidth + 'px' : '';
}

function onResizeWidgets() {
  if(resizeWidgets.tmr)
    clearTimeout(onResizeWidgets.tmr);
  onResizeWidgets.tmr = setTimeout(resizeWidgets, 500);
}

window.addEventListener('resize', onResizeWidgets);
resizeWidgets();

function Widget(title, url, isMultiCol, uiBuildEx) {
  this.title      = title;
  this.url        = url;
  this.isMultiCol = isMultiCol;
  this.parentHE   = document.getElementById('widgets');
  this.uiBuildEx  = uiBuildEx;

  this.uiBuild();
}

Widget.prototype.uiBuild = function() {
  this._frag = document.createDocumentFragment();

  this._widgetHE = this._frag.appendChild(document.createElement('div'));
  this._widgetHE.className = 'widget widget-' + (this.isMultiCol ? 2 : 1) + 'cell';

  this._titleHE = this._widgetHE.appendChild(document.createElement('div'));
  this._titleHE.className = 'widget-title';

  this._linkHE = this._titleHE.appendChild(document.createElement('a'));
  this._linkHE.setAttribute('href', this.url);
  this._linkHE.appendChild(document.createTextNode(this.title));

  if(this.uiBuildEx)
    this.uiBuildEx();

  this.parentHE.appendChild(this._frag);
};