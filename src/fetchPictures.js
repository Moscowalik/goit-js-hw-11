export function fetchPictures(query) {
  const url = `https://pixabay.com/api/?key=25707657-f823508cd497e26effdead719&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
  return fetch(url).then(res => {
    if (!res.ok) {
      return res.json().then(error => Promise.reject(error));
    }
    return res.json();
  });
}
