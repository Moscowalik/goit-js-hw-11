import './sass/main.scss';
import { getPicturesByName } from './fetchPictures';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchInputRef = document.querySelector('[ name="searchQuery"]');
const buttonRef = document.querySelector('[type="submit"]');
const picturesBoxRef = document.querySelector('.gallery');

let searchQuery = '';

buttonRef.addEventListener('click', onSearch);

function onSearch(e) {
  const { name } = e;

  getPicturesByName(name)
    .then(pictures => pictures.json())
    .then(console.log);
}

// function renderPicturesList(pictures) {
//   const markup = pictures
//     .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//       return `
//             <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>
//             `;
//     })
//     .join('');
//   return markup;
// }

function alertWrongName() {
  Notify.failure('Oops, there is no country with that name');
}

// function alertTooManyMatches() {
//   Notify.info('Too many matches found. Please enter a more specific name.');
// }
