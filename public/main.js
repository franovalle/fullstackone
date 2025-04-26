var update = document.getElementsByClassName("fa-check");
var remove = document.getElementsByClassName("fa-times");



Array.from(update).forEach(function(element) {
  element.addEventListener('click', function(){
    const answerone = this.parentNode.parentNode.childNodes[1].innerText
    const answertwo = this.parentNode.parentNode.childNodes[3].innerText
    const answerthree = this.parentNode.parentNode.childNodes[5].innerText
    fetch('entries', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'answerone': 'Washington D.C.',
        'answertwo': 'legislative, executive, and judicial,',
        'answerthree': 'Mexico and Canada'
        

      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});




Array.from(remove).forEach(function(element) {
      element.addEventListener('click', function(){
    const answerone = this.parentNode.parentNode.childNodes[1].innerText
    const answertwo = this.parentNode.parentNode.childNodes[3].innerText
    const answerthree = this.parentNode.parentNode.childNodes[5].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'answerone': 'Washington D.C.',
            'answertwo': 'legislative, executive, and judicial,',
            'answerthree': 'Mexico and Canada'
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
