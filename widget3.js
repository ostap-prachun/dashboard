new Widget('widget 3', 'https://ukr.net', false,   
  function(){
    this._widgetHE.className += ' widget3';
    this._widgetHE.appendChild(document.createTextNode('view news in ukr.net'));
  }
);