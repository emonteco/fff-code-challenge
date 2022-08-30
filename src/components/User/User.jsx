import styles from './styles.module.css';

const User = ({ firstName, lastName, picture }) => (
  <div className={styles.container}>
    <h3>{`${firstName} ${lastName}`}</h3>
    <img src={picture} alt="user" />
  </div>
);

export default User;
