import { fetchBlogPosts, stripPTags } from './rest-api.js';

async function displayBlogPosts() {
  const blogPostsData = await fetchBlogPosts();

  const firstFourPosts = blogPostsData.slice(0, 3);

  const blogPostsContainers = document.getElementsByClassName('blog-posts-container');


  for (const blogPostsContainer of blogPostsContainers) {
    firstFourPosts.forEach(post => {
    const postContainer = document.createElement('div');
    postContainer.classList.add('post');

    const postTitleLink = document.createElement('a');
    postTitleLink.href = `article.html?post_id=${post.id}`;
    postTitleLink.target = '_self'; 
    postTitleLink.classList.add('post-link'); 
    postTitleLink.textContent = post.title.rendered; 

    const pictureMedium = document.createElement('img');
    pictureMedium.src = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
    pictureMedium.classList.add('picture-medium');


    const postExcerpt = document.createElement('div');
    postExcerpt.classList.add('excerpt');
    postExcerpt.textContent = stripPTags(post.excerpt.rendered);

    postContainer.appendChild(pictureMedium);
    postContainer.appendChild(postTitleLink); 
    postContainer.appendChild(postExcerpt);

    blogPostsContainer.appendChild(postContainer);
  });
}
}

displayBlogPosts();

