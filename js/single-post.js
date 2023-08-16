function stripPTags(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}


async function fetchAndDisplayArticle() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('post_id');

  if (!postId) {
    console.error('No post_id provided');
    return;
  }

  const apiUrl = `https://knorheim.no/roadtrippin-api/wp-json/wp/v2/posts/${postId}?_embed`;

 

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error fetching article');
    }
    const data = await response.json();

    document.getElementById('article-title').textContent = data.title.rendered;
    document.title = `Roadtrippin | ${data.title.rendered}`;


    if (data._embedded && data._embedded['wp:featuredmedia']) {
      document.getElementById('article-image').src = data._embedded['wp:featuredmedia'][0].source_url;
      document.getElementById('article-image').alt = data.title.rendered;
    }

    if (data.excerpt) {
      document.getElementById('article-excerpt').innerHTML = stripPTags(data.excerpt.rendered);
    }
    if (data.content) {
      document.getElementById('article-content').innerHTML = stripPTags(data.content.rendered);
    }

  } catch (error) {
    console.error('Error fetching article:', error);
  }
}

fetchAndDisplayArticle();
