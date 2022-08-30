const API_URL = 'https://randomuser.me/api/';
const API_SEED = 'foobar';

export const getUsers = async ({ nat = 'US', results = 200 }) => {
  const response = await fetch(`${API_URL}?nat=${nat}&results=${results}&seed=${API_SEED}`);
  return response.json();
};