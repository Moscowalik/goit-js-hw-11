import './sass/main.scss';
import { fetchPictures } from './fetchPictures';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchInputRef = document.querySelector('[ name="searchQuery"]');
const picturesBoxRef = document.querySelector('.gallery');
let searchQuery = '';

searchInputRef.addEventListener('input', onSearch);

function onSearch(e) {
  const name = searchInputRef.value.trim();

  fetchPictures(query)
    .then(pictures => {
      picturesBoxRef.insertAdjacentHTML('beforeend', renderPicturesList(pictures));
    })
    .catch(alertWrongName);
}

function renderPicturesList(pictures) {
  const markup = pictures
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
            <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>
            `;
    })
    .join('');
  return markup;
}

function alertWrongName() {
  Notify.failure('Oops, there is no country with that name');
}

function alertTooManyMatches() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}
