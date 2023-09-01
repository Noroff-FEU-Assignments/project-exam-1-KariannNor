function stripPTags(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

// function pullContent(htmlString) {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlString, 'text/html');
//   const h2 = doc.querySelector('h2') ? doc.querySelector('h2').textContent : null;
//   const h3 = doc.querySelector('h3') ? doc.querySelector('h3').textContent : null;
//   const paragraphs = Array.from(doc.querySelectorAll('p')).map(p => p.textContent);

//   return { h2, h3, paragraphs };
// }


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

    const articleTitle = document.getElementById('article-title');
    articleTitle.textContent = data.title.rendered;
    articleTitle.setAttribute('aria-label', `Article Title: ${data.title.rendered}`);
    document.title = `Roadtrippin | ${data.title.rendered}`;

    if (data._embedded && data._embedded['wp:featuredmedia']) {
      const articleImage = document.getElementById('article-image');
      articleImage.src = data._embedded['wp:featuredmedia'][0].source_url;
      articleImage.alt = data._embedded['wp:featuredmedia'][0].alt_text;
      articleImage.setAttribute('aria-label', 'Article Image');
    }

    if (data.content) {
      const articleContent = document.getElementById('article-content');
      articleContent.innerHTML = data.content.rendered;
      articleContent.setAttribute('aria-label', 'Article Content');
    }

  } catch (error) {
    console.error('Error fetching article:', error);
  }
}

fetchAndDisplayArticle();