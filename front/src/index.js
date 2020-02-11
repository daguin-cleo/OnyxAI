var menu = new Vue({
  el: '#menu',
  data: {
    message: 'Onyx Board Game',
	mes1: 'Nouvelle partie',
	mes2: 'Rejoindre une partie existante',
	mes3: 'id partie'
  }
})
  
var selection = new Vue({
  el: '#selection',
  data: {
	mes1: 'Nouvelle partie',
	mes2: 'Rejoindre une partie existante',
	mes3: 'id partie'
  }
})
 
var waitingId = new Vue({ 
  el: '#waitingId',
  data: {
	mes3: 'id partie',
	idPartieRandom: '1234'
  }
})
