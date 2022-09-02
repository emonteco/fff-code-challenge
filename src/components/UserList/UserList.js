import User from '../User';
import styles from './styles.module.css';

const UserList = ({ users, loading }) => (
  <>
    {loading
      ? <div className={styles.loading}>Loading...</div>
      : (
          <ol className={styles.list}>
            {users.map((user) => (
              <User
                key={user.id.value}
                firstName={user.name.first}
                lastName={user.name.last}
                email={user.email}
              />
            ))}
          </ol>
        )
    }
  </>
);

export default UserList;
