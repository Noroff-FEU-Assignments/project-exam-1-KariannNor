
 function stripPTags(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

// Not finished - needs work
async function fetchAndDisplayArticle() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('post_id'); 

  if (!postId) {

    console.error('No post_id provided');
    return;
  }

  const apiUrl = `http://roadtrippin-api/wp-json/wp/v2/posts/${postId}?_embed`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    document.getElementById('article-title').textContent = data.title.rendered;
    document.getElementById('article-image').src = data._embedded['wp:featuredmedia'][0].source_url;
    document.getElementById('article-image').alt = data.title.rendered;
    document.getElementById('article-excerpt').textContent = stripPTags(data.excerpt.rendered);
  } catch (error) {
    console.error('Error fetching article:', error);
  }
}

fetchAndDisplayArticle();