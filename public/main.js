//debugging starting over
var remove = document.getElementsByClassName("fa-times");
var update = document.getElementsByClassName("fa-check");


Array.from(update).forEach(function(element) {
  element.addEventListener('click', function(){
    const answerone = this.parentNode.parentNode.childNodes[1].innerText//note to self: I had to do some research on childnodes and parent nodes did not realize the spaces where being counted, need to do more research but it worked after playing around with numbers.  https://stackoverflow.com/questions/65694145/how-to-determine-whether-the-childnodes-has-ul-present-or-not
    const answertwo = this.parentNode.parentNode.childNodes[5].innerText
    const answerthree = this.parentNode.parentNode.childNodes[9].innerText
     
    fetch('exam', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'answerone': 'brain', 
        'answertwo': 'brain',
        'answerthree': 'kidney'

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
   const answerone = this.parentNode.parentNode.childNodes[1].innerText//note to self: I had to do some research on childnodes and parent nodes did not realize the spaces where being counted, need to do more research but it worked after playing around with numbers.  https://stackoverflow.com/questions/65694145/how-to-determine-whether-the-childnodes-has-ul-present-or-not
   const answertwo = this.parentNode.parentNode.childNodes[5].innerText
   const answerthree = this.parentNode.parentNode.childNodes[9].innerText
    
    fetch('exam', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'answerone': answerone, 
        'answertwo': answertwo,
        'answerthree': answerthree

      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

//Note to self: I am having a hard time figuring out how I would update especially if i do not know, can i do conditionals? 


//var correct = document.getElementById('update')
//var remove = document.getElementById('delete')
//var remove = document.getElementsByClassName("fa-times");



//Array.from(correct).forEach(function(element) {
  /*correct.addEventListener('click', function(){
    //const answerone = this.parentNode.parentNode.childNodes[1].innerText
    //const answertwo = this.parentNode.parentNode.childNodes[3].innerText
    //const answerthree = this.parentNode.parentNode.childNodes[5].innerText
    fetch('entries', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        entry : 'brain'
        //answertwo: 'brain'
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
  });*/





//Array.from(remove).forEach(function(element) {
      /*remove.addEventListener('click', function(){
    //const answerone = this.parentNode.parentNode.childNodes[1].innerText
    //const answertwo = this.parentNode.parentNode.childNodes[3].innerText
   //const answerthree = this.parentNode.parentNode.childNodes[5].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'entry': 'heart'
            //'answertwo': 'heart' //note to self; so only delete the wrong answer, so only the correct answer shows
            //'answerthree': 'Mexico and Canada'// note to self: the issue I am finding of something does not match exact, it wont delete. 
          })
        }).then(function (response) {
          window.location.reload()
        })
      });*/

     /* Array.from(remove).forEach(function(element) {
        element.addEventListener('click', function(){
         const date = this.parentNode.parentNode.childNodes[1].innerText
          const entry = this.parentNode.parentNode.childNodes[3].innerText
          fetch('entries', {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'entry': entry
            })
          }).then(function (response) {
            window.location.reload()
          })
        });
  });*/
