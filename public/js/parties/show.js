$(document).ready(function(){


  $('form').submit(function(e){
    e.preventDefault();
    let whiteGuys = $('h4:contains("White Guy")').next().text().split('/');

    let full = false;
    if (whiteGuys[0]===whiteGuys[1]){
      full = true;
    }

    let rejection = [
      "Hmm, looks like we have enough [WHITE GUYS]. Try getting out of your comfort zone next time!",
      "Ooh, we’re good on [WHITE GUYS]. Try expanding your horizons, bro!",
      "Yeah, not gonna happen. But we hear there’s a quincenera nearby that needs more [WHITE GUYS]!"
    ]

    if (full) {
      $('#modal h2').text(rejection[Math.floor(Math.random()*rejection.length)])
      setTimeout(function(){
        window.location.href = "/parties";
      },5000)
    } else {
      $('#modal h2').text("Sweet bro, you’re in! Have fun getting funky!");
      setTimeout(function(){
        $.ajax({
          method:"post",
          url: $('form').attr('action'),
          data: {id: $('input').eq(0).val()}
        }).then(function(data){
          window.location.href = window.location.href;
        })
      },2000)
    }
    $('#center').css('margin-top',($(window).height()-$('#center').height())/2.5);
    $('#modal').fadeToggle();



  })

  $('#modal').click(function(){
    $('#modal').fadeToggle();
  })


})