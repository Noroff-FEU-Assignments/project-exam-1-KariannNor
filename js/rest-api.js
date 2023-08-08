
export function stripPTags(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}


export async function fetchBlogPosts(startIndex = 0, numPosts = -1) {
  let apiUrl = 'https://knorheim.no/roadtrippin-api/wp-json/wp/v2/posts?_embed';

  if (numPosts > 0) {
    apiUrl += `&per_page=${numPosts}&offset=${startIndex}`;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return []; 
    
  }
}

//* loader
// window.addEventListener('load', function() {
//   document.querySelector('.loader').style.display = 'flex';
// });

// fetch(apiUrl)
//   .then(response => {
    
//     document.querySelector('.loader').style.display = 'none';

//     return response.json();
//   });


  window.addEventListener('load', function() {
    console.log('Page has finished loading');
    document.querySelector('.loader').style.display = 'flex';
  });
  
  fetch(apiUrl)
    .then(response => {
      console.log('API response received');
      document.querySelector('.loader').style.display = 'none';
      return response.json();
    })
    .then(data => {
      console.log('API data:', data);
      
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });