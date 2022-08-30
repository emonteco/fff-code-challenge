const Number = ({ value, disabled, onClick }) => (
  <button type="button" disabled={disabled} onClick={onClick}>
    {value}
  </button>
);

export default Number;
