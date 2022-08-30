import Number from "./Number"
import styles from './styles.module.css';

const RESULTS = [10, 20, 50, 100, 200];

const ResultsNumber = ({ selected, onClick }) => (
  <div className={styles.container}>
    {RESULTS.map((value) => (
      <Number key={value} value={value} disabled={selected === value} onClick={() => onClick(value)} />
    ))}
  </div>
);

export default ResultsNumber;
