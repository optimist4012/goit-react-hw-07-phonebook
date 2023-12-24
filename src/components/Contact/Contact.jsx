import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';

export const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <p>
        {name}: {number}
      </p>
      <button
        onClick={e => {
          dispatch(deleteContact(id));
        }}
      >
        Delete
      </button>
    </li>
  );
};
