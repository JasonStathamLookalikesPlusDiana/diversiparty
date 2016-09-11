$(document).ready(function(){
  console.log('loaded');

  $('.hide').click(function(){
    $('.form').toggle();
  })

  $('input:last-child').click(function(){
    let user = $('input').eq(0).val();
    let pass = $('input').eq(1).val();
    let image = $('input').eq(2).val();
    let gender = $('select').eq(0).val();
    let race = $('select').eq(1).val();
    let vegan = $('select').eq(2).val();
    let hat = $('select').eq(3).val();

    let data = {
      user: user,
      pass: pass,
      image: image,
      description: `${gender} ${race} ${vegan} ${hat}`,
    }

    $.ajax({
      method: 'POST',
      url: '/users',
      data: data
    })

  })
})