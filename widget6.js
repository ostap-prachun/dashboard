new Widget('widget 6', 'https://www.youtube.com/', false,   
  function(){
    this._widgetHE.className += ' widget6';
    this._widgetHE.appendChild(document.createTextNode('look for new videos'));
  }
);