new Widget('widget 4', 'https://vk.com', false,   
  function(){
    this._widgetHE.className += ' widget4';
    this._widgetHE.appendChild(document.createTextNode('go fun with friends in VK'));
  }
);