import axios from 'axios';
const API_KEY = '28129129-feff09d42f949c4b372c861bc';

export const getImages = async (query, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.status !== 200) {
    throw new Error(`Bad response, ${response.status}`);
  }
  return response.data.hits.map(formatImage);
};

const formatImage = image => ({
  tags: image.tags,
  webformatURL: image.webformatURL,
  largeImageURL: image.largeImageURL,
  id: image.id,
});
