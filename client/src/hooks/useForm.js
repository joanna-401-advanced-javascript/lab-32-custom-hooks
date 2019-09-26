import { useState } from 'react';

export default function useForm(defaults = {}) {
  const [values, setValues] = useState(defaults);

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleSubmit(event, callback) {
    event && event.preventDefault();
    event.target.reset();
    if (callback) {
      callback(values);
    }
  }

  return [values, handleChange, handleSubmit];
}
