import { useEffect, useState } from 'react';
import { getUsers } from '../../services/users';
import Filter from '../Filter'
import ResultsNumber from '../ResultsNumber';
import UserList from '../UserList/UserList';

const filterUsers = (users, search) => users.filter((user) =>
  `${user.name.first} ${user.name.last}`.toLowerCase().includes(search.toLowerCase()));

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [resultsNumber, setResultsNumber] = useState(10);

  const displayedUsers = filteredUsers ? filteredUsers : users;

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const resp = filterUsers(users, search);
    setFilteredUsers(resp);
  };

  // get list of users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { results } = await getUsers({ results: resultsNumber });
        setLoading(false);
        setUsers(results);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    fetchUsers();
  }, [resultsNumber]);

  if (error) return <div>{error}</div>

  return (
    <>
      <ResultsNumber selected={resultsNumber} onClick={setResultsNumber} />
      <Filter search={search} onChange={handleSearchChange} onSubmit={handleSubmit} />
      <UserList users={displayedUsers} loading={loading} />
    </>
  );
};

export default Users;
