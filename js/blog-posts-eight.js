import { fetchBlogPosts, stripPTags } from './rest-api.js';

async function displayNextEightBlogPosts() {
  const startIndex = 3; 
  const numPosts = 9; 

  const blogPostsData = await fetchBlogPosts(startIndex, numPosts);

  const blogPostsEights = document.getElementsByClassName('blog-posts-eight');

  for (const blogPostsEight of blogPostsEights) {
    blogPostsData.forEach(post => {
      const postContainer = document.createElement('div');
      postContainer.classList.add('post');

      const postTitleLink = document.createElement('a');
      postTitleLink.href = `article.html?post_id=${post.id}`;
      postTitleLink.target = '_self';
      postTitleLink.classList.add('post-link');
      postTitleLink.textContent = post.title.rendered;

      const postPicture = document.createElement('img');
      postPicture.src = post._embedded['wp:featuredmedia'][0].source_url;

      const postExcerpt = document.createElement('div');
      postExcerpt.classList.add('excerpt');
      postExcerpt.textContent = stripPTags(post.excerpt.rendered);

      postContainer.appendChild(postPicture);
      postContainer.appendChild(postTitleLink);
      postContainer.appendChild(postExcerpt);

      blogPostsEight.appendChild(postContainer); 
    });
  }
}

displayNextEightBlogPosts();

