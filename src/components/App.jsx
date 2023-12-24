import { useDispatch, useSelector } from 'react-redux';
import { AppLayout } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { getContacts, getError, getIsLoading } from 'redux/selectors';

export const App = () => {
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <AppLayout>
      <h1>Phonebook</h1>
      <ContactForm />
      {!error && contacts.length > 0 && <ContactList />}
      {isLoading && !error && <b>Loading contacts...</b>}
      {error && <b>{error}</b>}
    </AppLayout>
  );
};
