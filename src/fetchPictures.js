import axios from 'axios';
import apiSettings from './APIsettings';

const { key, apiUrl, apiquery } = apiSettings;

// get users
export const getPicturesByName = name => {
  return axios.get(
    `https://pixabay.com/api/?key=25707657-f823508cd497e26effdead719&q=${name}&image_type=photo`,
  );
};
