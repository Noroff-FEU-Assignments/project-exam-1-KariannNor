
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