import axios from "axios";

const requiredFields = "id,title,image_id,thumbnail";
export interface Artwork {
  id: number;
  title: string;
  image_id: string;
  thumbnail?: {
    alt_text: string;
    height: number;
    lqip?: string;
    width: number;
  };
}
export interface Pagination {
  current_page: number;
  limit: number;
  total_pages: number;
}

export interface ListResponse {
  data: Artwork[];
  pagination: Pagination;
}
export const fetchArtworks = async (pagination: Pagination) => {
  const query = new URLSearchParams({
    page: String(pagination.current_page),
    limit: String(pagination.limit),
    fields: requiredFields,
  });
  const response = await axios.get<ListResponse>("https://api.artic.edu/api/v1/artworks?" + query.toString());
  return response.data;
};

export interface SingleResponse {
  data: Artwork;
  pagination: Pagination;
}
export const fetchArtwork = async (id: number) => {
  const response = await axios.get<SingleResponse>(`https://api.artic.edu/api/v1/artworks/${id}`);
  return response.data;
};

export const searchArtwork = async (q: string, pagination: Pagination) => {
  const query = new URLSearchParams({
    q,
    page: String(pagination.current_page),
    limit: String(pagination.limit),
    fields: requiredFields,
  });
  const response = await axios.get<ListResponse>(`https://api.artic.edu/api/v1/artworks/search?` + query.toString());
  return response.data;
};
