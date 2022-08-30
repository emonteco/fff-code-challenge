import { useEffect, useState } from 'react';
import { getUsers } from '../../services/users';
import User from '../User';
import styles from './styles.module.css';

const LIMIT = 10;
const filterUsers = (users, search) => users.filter((user) =>
  user.firstName.includes(search) || user.lastName.includes(search));

const Products = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const displayedUsers = filteredUsers.length ? filteredUsers : users;
  
  const onClickLoadMore = () => {
    setPage((prevState) => (prevState + 1));
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const resp = filterUsers(users, search);
    setFilteredUsers(resp);
  };

  useEffect(() => {
    const fetchUsers = async (page) => {
      setLoading(true);
      try {
        const { data } = await getUsers(LIMIT, page);
        setLoading(false);
        setUsers((prevState) => ([
          ...prevState,
          ...data,
        ]));
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    fetchUsers(page);
  }, [page]);

  if (error) return <div>{error}</div>

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className={styles.search}
          value={search}
          onChange={onSearchChange}
          placeholder="Search"
        />
      </form>
      <ol className={styles.list}>
      {displayedUsers.map((user) => (
        <User
          key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
        />
      ))}
      </ol>
      {loading && (<div className={styles.loading}>Loading...</div>)}
      {users.length ? (
        <button type="button" className={styles.button} onClick={onClickLoadMore}>Load More</button>
      ) : null}
    </div>
  );
};

export default Products;
