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

      const pictureMedium = document.createElement('img');
      pictureMedium.src = post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
      pictureMedium.classList.add('picture-medium');


      const postExcerpt = document.createElement('div');
      postExcerpt.classList.add('excerpt');
      postExcerpt.textContent = stripPTags(post.excerpt.rendered);


      postContainer.appendChild(pictureMedium);

      postContainer.appendChild(postTitleLink);
      postContainer.appendChild(postExcerpt);

      blogPostsEight.appendChild(postContainer); 
    });
  }
}

displayNextEightBlogPosts();

