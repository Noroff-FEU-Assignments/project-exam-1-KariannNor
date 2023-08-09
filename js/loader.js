//* loader
window.addEventListener('load', function() {
  document.querySelector('.loader').style.display = 'flex';
});

fetch('https://knorheim.no/roadtrippin-api/wp-json/wp/v2/posts?_embed')
  .then(response => {
    
    document.querySelector('.loader').style.display = 'none';

    return response.json();
  });