const API_URL = 'https://randomuser.me/api/';

export const getUsers = async (nat = 'US', results = 200) => {
  const response = await fetch(`${API_URL}?nat=${nat}&results=${results}`);
  return response.json();
};