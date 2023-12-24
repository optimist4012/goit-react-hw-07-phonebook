import { Formik } from 'formik';
import { Form, Field, Button, ErrorMessage } from './ContactForm.styled';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';

const contactsFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required field'),
  phone: Yup.string()
    .matches(
      /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
      'Please, enter only digits in format of "123-123-1234"'
    )
    .required('Required field'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
      }}
      validationSchema={contactsFormSchema}
      onSubmit={(values, actions) => {
        if (
          contacts.some(
            contact => contact.name.toLowerCase() === values.name.toLowerCase()
          )
        ) {
          return alert(`${values.name} is already in contacts!`);
        }

        dispatch(
          addContact({
            name: values.name,
            phone: values.phone,
          })
        );

        actions.resetForm();
      }}
    >
      <Form>
        <label htmlFor="name">Name</label>
        <Field id="name" name="name" />
        <ErrorMessage name="name" component={'span'}></ErrorMessage>

        <label htmlFor="phone">Number</label>
        <Field id="phone" name="phone" type="tel" />
        <ErrorMessage name="phone" component={'span'}></ErrorMessage>

        <Button type="submit">Add contact</Button>
      </Form>
    </Formik>
  );
};
