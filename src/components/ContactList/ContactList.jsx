import { Contact } from 'components/Contact/Contact';
import { Filter } from 'components/Filter/Filter';
import { useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/selectors';

export const ContactList = () => {
  const filteredContacts = useSelector(selectVisibleContacts);
  return (
    <>
      <h2>Contacts</h2>
      <Filter />
      <ul>
        {filteredContacts.map(item => (
          <Contact
            key={item.id}
            id={item.id}
            name={item.name}
            number={item.phone}
          />
        ))}
      </ul>
    </>
  );
};
