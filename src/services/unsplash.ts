import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/search/photos/";
const API_KEY = "pKIAwE9KyTsEnrob5fln_hxBalBluAFHdAGnBFGOt-k";

interface UnsplashPhoto {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

interface UnsplashResponse {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}

const fetchImages = async (topic: string, page: number): Promise<UnsplashResponse> => {
    const { data } = await axios.get<UnsplashResponse>
    (
        `?client_id=${API_KEY}&query=${topic}&page=${page}&per_page=12`
    );

  return data;
};

export default fetchImages;