var update = document.getElementsByClassName("fa-check");
var remove = document.getElementsByClassName("fa-times");



Array.from(update).forEach(function(element) {
  element.addEventListener('click', function(){
    const answerone = this.parentNode.parentNode.childNodes[1].innerText
    const answertwo = this.parentNode.parentNode.childNodes[3].innerText
    //const answerthree = this.parentNode.parentNode.childNodes[5].innerText
    fetch('entries', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'answerone': 'brain',
        'answertwo': 'brain'
        //'answerthree': 'Mexico and Canada'
        

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
            'answerone': 'brain',
            'answertwo': 'brain'
            //'answerthree': 'Mexico and Canada'// note to self: the issue I am finding of something does not match exact, it wont delete. 
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
