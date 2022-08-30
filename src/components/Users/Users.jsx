import { useEffect, useState } from 'react';
import { getUsers } from '../../services/users';
import User from '../User';
import styles from './styles.module.css';

const filterUsers = (users, search) => users.filter((user) =>
  `${user.name.first} ${user.name.last}`.includes(search));

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(null);

  const displayedUsers = filteredUsers ? filteredUsers : users;

  const onSearchChange = (e) => setSearch(e.target.value);

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
        const { results } = await getUsers();
        setLoading(false);
        setUsers(results);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>

  if (error) return <div>{error}</div>

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.search}
        value={search}
        onChange={onSearchChange}
        placeholder="Search"
      />
      <ol className={styles.list}>
      {displayedUsers.map((user) => (
        <User
          key={user.id.value}
          firstName={user.name.first}
          lastName={user.name.last}
          email={user.email}
        />
      ))}
      </ol>
    </form>
  );
};

export default Users;
