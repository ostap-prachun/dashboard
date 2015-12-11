function CalcBuild() {
  function valueCalc() {
    switch(operation) {
      case '+':
        value1 = +value1 + +value2;
        break;
      case '-':
        value1 = +value1 - +value2;
        break;
      case '*':
        value1 = +value1 * +value2;
        break;
      case '/':
        value1 = +value1 / +value2;
        break;
    }
    value2 = '';
    operation = '';
    valueCalculated = true;
  }

  function symbolProcess(event) {
    var symbol = event.target.innerText || event.target.textContent || event.target.innerHTML;
    switch(symbol) {
      case 'C':
        value1 = '';
        value2 = '';
        operation = '';
        valueCalculated = false;
        break;
      case '=':
        valueCalc();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        if(value1 !== '') {
          if(value2 === '')
            valueCalculated = false;
          else
            valueCalc();
          operation = symbol;
        }
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
        if(operation)
          value2 += symbol;
        else
        if(valueCalculated)
          value1 = symbol;
        else
          value1 += symbol;
        valueCalculated = false;
        break;
    } 
    input.value = value1 + operation + value2;
  }
  var input = this._widgetHE.appendChild(document.createElement('input'));
  var value1 = '';
  var value2 = '';
  var operation = '';
  var valueCalculated = false;
  this._widgetHE.className += ' calculator';
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
new Widget('Calculator', 'https://www.facebook.com/', false, CalcBuild);