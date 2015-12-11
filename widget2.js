new Widget('widget 2', 'https://ya.ru', true,
  function(){
    this._widgetHE.className += ' widget2';
    this._widgetHE.appendChild(document.createTextNode('search in ya.ru'));
  }
);