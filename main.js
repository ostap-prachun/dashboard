(function() {
  function resizeWidgets() {
    var colWidth = 200;
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

  function Widget(title, url, isMultiCol, parentHE, uiBuild) {
    this.title      = title;
    this.url        = url;
    this.isMultiCol = isMultiCol;
    this.parentHE   = parentHE;
    this.uiBuildEx  = uiBuild;

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
  
  function CalcBuild() {
    function symbolProcess(event) {
      var symbol = event.target.innerText || event.target.textContent || event.target.innerHTML;
      switch(symbol) {
        case 'C':
          input.value = '';
          input.value1 = '';
          input.value2 = '';
          input.operation = '';
          input.result = false;
          break;
        case '=':
          var value = '';
          switch(input.operation) {
            case '+':
              value = +input.value1 + +input.value2;
              break;
            case '-':
              value = +input.value1 - +input.value2;
              break;
            case '*':
              value = +input.value1 * +input.value2;
              break;
            case '/':
              value = +input.value1 / +input.value2;
              break;
          }
          if(value !== '') {
            input.value = value;
            input.value1 = value;
            input.value2 = '';
            input.operation = '';
            input.result = true;
          }
          break;
        case '+':
        case '-':
        case '*':
        case '/':
          if(!input.operation) {
            input.value += symbol;
            input.operation = symbol;
          }
          input.result = false;
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          if(input.operation)
            input.value2 += symbol;
          else
            if(input.result) {
              input.value1 = symbol;
              input.value = '';
            }
            else
              input.value1 += symbol;
          input.value += symbol;
          input.result = false;
          break;
      } 
    }
    var input = this._widgetHE.appendChild(document.createElement('input'));
    input.value1 = '';
    input.value2 = '';
    input.operation = '';
    input.style.width = '194px';
    input.disabled = true;
    var symbols = '123+-456*/789C=0';
    for(var i = 0, symbol; symbol = symbols[i]; i++) {
      var symbolHE = this._widgetHE.appendChild(document.createElement('span'));
      symbolHE.className = 'calculator-symbol';
      symbolHE.addEventListener('click', symbolProcess);
      symbolHE.appendChild(document.createTextNode(symbol));
      if(4 === (i % 5))
        this._widgetHE.appendChild(document.createElement('br'));
    }
  }

  var widgetsHE = document.getElementById('widgets');
  new Widget('widget 1', 'https://google.com', false, widgetsHE);
  new Widget('widget 2', 'https://ya.ru', true,  widgetsHE,
    function(){
      this._widgetHE.style.color = 'red';
    }
  );
  new Widget('widget 3', 'https://ukr.net', false, widgetsHE);
  new Widget('widget 4', 'https://vk.com', false, widgetsHE);
  new Widget('widget 5', 'https://www.wikipedia.org', true,  widgetsHE);
  new Widget('widget 6', 'https://www.youtube.com/', false, widgetsHE);
  new Widget('Calculator', 'https://www.facebook.com/', false, widgetsHE, CalcBuild);
})();