import { fetchBlogPosts, stripPTags } from './rest-api.js';

async function displayBlogPosts(startIndex = 0, numPosts = 10) {
  const blogPostsData = await fetchBlogPosts(startIndex, numPosts);

  const blogPostsContainer = document.querySelector('.display-all');

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

    blogPostsContainer.appendChild(postContainer);
  });
}



let startIndex = 0;
const numPostsPerPage = 10;

async function loadMorePosts() {
  startIndex += numPostsPerPage;
  const blogPostsData = await fetchBlogPosts(startIndex, 4);

  const blogPostsContainer = document.querySelector('.display-all');

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

    blogPostsContainer.appendChild(postContainer);
  });

  const loadMoreButton = document.getElementById('load-more-btn');
  if (blogPostsData.length < 1) {
    loadMoreButton.style.display = 'none';
  }
}

displayBlogPosts(startIndex, numPostsPerPage);

const loadMoreButton = document.getElementById('load-more-btn');

loadMoreButton.addEventListener('click', loadMorePosts);


