import { useState } from 'react';

export function useForm(initialValues) {
  const [form, setForm] = useState(initialValues);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return { form, setForm, handleChange };
}
