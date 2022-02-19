import './css/style.css';
import ApiSettings from './APISettings.js';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import articleTmpl from './article.hbs';

const searchFormRef = document.querySelector('.search-form');
const loadMoreBntRef = document.querySelector('.load-more');
const galleryRef = document.querySelector('.gallery');
const pixabayApi = new ApiSettings();

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionType: 'alt',
  captionDelay: 200,
  captionPosition: 'bottom',
});

searchFormRef.addEventListener('submit', onSearchHandler);
loadMoreBntRef.addEventListener('click', onLoadMoreHandler);

function onSearchHandler(e) {
  e.preventDefault();

  const {
    elements: { searchQuery },
  } = e.target;

  searchQuery.value.trim();

  if (searchQuery.value === '') {
    return Notify.failure('There is nothing to search!');
  }

  pixabayApi.query = searchQuery.value;
  pixabayApi.resetPage();

  pixabayApi
    .fetchData()
    .then(data => {
      if (data.hits.length == 0) {
        return Notify.failure(
          `Sorry, there are no images matching your search query. Please try again`,
        );
      } else {
        Notify.success(`Hooray! We found ${pixabayApi.hits} images.`);
        return data.hits;
      }
    })
    .then(hits => {
      clearHits();
      appendHitsMarkup(hits);
      loadMoreIsVisible();
      lightbox.refresh();
      endOfSearchResultNotify();
    });
}

function onLoadMoreHandler() {
  pixabayApi.fetchData().then(data => {
    appendHitsMarkup(data.hits);
    loadMoreIsVisible();
    onPageScrolling();
    lightbox.refresh();
    endOfSearchResultNotify();
  });
}

function appendHitsMarkup(hits) {
  galleryRef.insertAdjacentHTML('beforeend', articleTmpl(hits));
}

function clearHits() {
  galleryRef.innerHTML = '';
}

function loadMoreIsVisible() {
  if (getPagesCount() > pixabayApi.page - 1) {
    loadMoreBntRef.classList.add('is-visible');
  } else {
    loadMoreBntRef.classList.remove('is-visible');
  }
}
function onPageScrolling() {
  const { height: cardHeight } = galleryRef.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function getPagesCount() {
  return Math.ceil(pixabayApi.totalHits / pixabayApi.options.params.per_page);
}

function endOfSearchResultNotify() {
  if (getPagesCount() === pixabayApi.page - 1) {
    return Notify.failure("We're sorry, but you've reached the end of search results.");
  }
}
