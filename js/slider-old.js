

const slideWidth = 205;

function slideLeft() {
  const slider = document.getElementById('slider');
  slider.scrollLeft -= slideWidth;
}

function slideRight() {
  const slider = document.getElementById('slider');
  slider.scrollLeft += slideWidth;
}

function goToSlide(thumbnail) {
  const slider = document.getElementById('slider');
  const clickedSlidePos = thumbnail.offsetLeft - slider.offsetLeft;
  slider.scrollLeft = clickedSlidePos;
}

document.getElementById('slide-left').addEventListener('click', slideLeft);
document.getElementById('slide-right').addEventListener('click', slideRight);

document.addEventListener('DOMContentLoaded', function () {
  fetchAndDisplayBlogPosts();
});

async function fetchAndDisplayBlogPosts() {
  const apiUrl = 'https://knorheim.no/roadtrippin-api/wp-json/wp/v2/posts?_embed&per_page=3';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const slider = document.getElementById('slider');

    data.forEach(post => {
      const thumbnail = document.createElement('div');
      thumbnail.classList.add('thumbnail');

      const thumbnailImg = document.createElement('img');
      thumbnailImg.classList.add('img-thumb');
      thumbnailImg.src = post._embedded['wp:featuredmedia'][0].source_url;
      thumbnailImg.alt = post.title.rendered;

      thumbnail.appendChild(thumbnailImg);

      const thumbnailLink = document.createElement('a');
      thumbnailLink.href = '#';

      const thumbnailCaption = document.createElement('p');
      thumbnailCaption.classList.add('title-thumb');
      thumbnailCaption.textContent = post.title.rendered;

      thumbnailLink.appendChild(thumbnailCaption);
      thumbnail.appendChild(thumbnailLink);

      thumbnail.addEventListener('click', () => goToSlide(thumbnail));

      slider.appendChild(thumbnail);
    });

  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
}
