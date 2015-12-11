new Widget('widget 1', 'https://google.com', false,   
  function(){
    this._widgetHE.className += ' widget1';
    this._widgetHE.appendChild(document.createTextNode('go to google'));
  }
);