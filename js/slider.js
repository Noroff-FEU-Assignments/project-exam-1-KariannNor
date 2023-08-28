const slideWidth = 205;
let currentPage = 1;

function slideLeft() {
  const slider = document.getElementById('slider');
  slider.scrollLeft -= slideWidth;

  currentPage--;
  if (currentPage < 1) {
    currentPage = 1;
  }

  fetchAndDisplayBlogPosts(currentPage);
}

function slideRight() {
  const slider = document.getElementById('slider');
  slider.scrollLeft += slideWidth;

  currentPage++;
  fetchAndDisplayBlogPosts(currentPage);
}

function goToSlide(thumbnail) {
  const slider = document.getElementById('slider');
  const clickedSlidePos = thumbnail.offsetLeft - slider.offsetLeft;
  slider.scrollLeft = clickedSlidePos;
}

document.getElementById('slide-left').addEventListener('click', slideLeft);
document.getElementById('slide-right').addEventListener('click', slideRight);

document.addEventListener('DOMContentLoaded', function () {
  fetchAndDisplayBlogPosts(currentPage);
});

async function fetchAndDisplayBlogPosts(page) {
  const perPage = 3;
  const apiUrl = `https://knorheim.no/roadtrippin-api/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error fetching blog posts');
    }
    const data = await response.json();

    if (Array.isArray(data)) {
      const slider = document.getElementById('slider');
      slider.innerHTML = '';

      data.forEach(post => {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');

        const thumbnailImg = document.createElement('img');
        thumbnailImg.classList.add('img-thumb');
        thumbnailImg.src = post._embedded['wp:featuredmedia'][0].source_url;
        thumbnailImg.alt = post.title.rendered;

        thumbnail.appendChild(thumbnailImg);

        const thumbnailLink = document.createElement('a');
        thumbnailLink.href = `article.html?post_id=${post.id}`;

        const thumbnailCaption = document.createElement('p');
        thumbnailCaption.classList.add('title-thumb');
        thumbnailCaption.textContent = post.title.rendered;

        thumbnailLink.appendChild(thumbnailCaption);
        thumbnail.appendChild(thumbnailLink);

        thumbnail.addEventListener('click', () => goToSlide(thumbnail));

        thumbnailCaption.addEventListener('click', () => {
          const titleThumbnail = thumbnail;
          goToSlide(titleThumbnail);
        });

        slider.appendChild(thumbnail);
      });
    } else {
      console.error('Invalid data format:', data);
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
}
