function placesCards (data) {
  $('section.places').empty();
  $('section.places').append(data.map(place => {
    return `<article>
    <div class="title_box">
    <h2>${place.name}</h2>
    <div class="price_by_night">$${place.price_by_night}</div>
    </div>
    <div class="information">
    <div class="max_guest">${place.max_guest} Guest${
          place.max_guest !== 1 ? 's' : ''
        }</div>
    <div class="number_rooms">${place.number_rooms} Bedroom${
          place.number_rooms !== 1 ? 's' : ''
        }</div>
    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
          place.number_bathrooms !== 1 ? 's' : ''
        }</div>
    </div> 
    <div class="description">
    ${place.description}
    </div>
      </article>`;
  }));
}

$(document).ready(() => {
  const amentiesID = {};
  const HOST = 'http://127.0.0.1:5001';
  $('li input[type=checkbox]').change(function () {
    if (this.checked) {
      amentiesID[this.dataset.name] = this.dataset.id;
    } else {
      delete amentiesID[this.dataset.name];
    }
    $('.amenities h4').text(Object.keys(amentiesID).sort().join(', '));
  });

  $.getJSON(`${HOST}/api/v1/status/`, (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.post({
    url: `${HOST}/api/v1/places_search`,
    data: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
    success: placesCards,
    dataType: 'json'
  });

  $('button').click(() => {
    $.post({
      url: `${HOST}/api/v1/places_search`,
      data: JSON.stringify({ amenities: Object.values(amentiesID) }),
      headers: { 'Content-Type': 'application/json' },
      success: placesCards,
      dataType: 'json'
    });
  });
});
