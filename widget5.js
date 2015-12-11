new Widget('widget 5', 'https://www.wikipedia.org', true,   
  function(){
    this._widgetHE.className += ' widget5';
    this._widgetHE.appendChild(document.createTextNode('read new article'));
  }
);