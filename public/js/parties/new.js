'use strict';
(() => {
  const name      = document.querySelector('input[name="name"]');
  const location  = document.querySelector('input[name="location"]');
  const partyType = document.querySelector('select');
  const date      = document.querySelector('input[name="party_date"]');
  const time      = document.querySelector('input[name="party_time"]');
  const submit    = document.querySelector('input[type="submit"]');

  submit.addEventListener('click', () => {
    const values = {
                    name: name.value,
                    location: location.value,
                    partyType: partyType.value,
                    date: date.value,
                    time: time.value
                   };

    $.ajax({
      url: '/parties',
      method: 'post',
      data: values
    })
    .then(window.location.href = '/parties')
    .error(err => console.log('Error: ',err));
  });
  
})();