const API_URL = 'https://dummyapi.io/data/v1';
const APP_ID = '62f253d4e4b4d5c1cabee6da';

export const getUsers = async (limit, page) => {
  const response = await fetch(`${API_URL}/user?page=${page}&limit=${limit}`, {
    headers: {
      'app-id': APP_ID,
    },
  });
  return response.json();
};