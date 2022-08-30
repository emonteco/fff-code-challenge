const User = ({ firstName, lastName, email }) => (
  <li>
    <h3>{`${firstName} ${lastName}`}</h3>
    <p>{email}</p>
  </li>
);

export default User;
