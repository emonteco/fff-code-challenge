import styles from './styles.module.css';

const Filter = ({ search, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      className={styles.search}
      value={search}
      onChange={onChange}
      placeholder="Search"
    />
  </form>
);

export default Filter;
