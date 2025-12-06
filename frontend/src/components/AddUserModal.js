import { useState } from 'react';
import { createUser } from '../api/api';
import styles from './AddUserModal.module.css';

export default function AddUserModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
   firstName: '', lastName: '', birthDate: '',
    address: '', phone: '', email: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.username || !form.firstName || !form.lastName) return alert('Obavezna polja: username, ime, prezime');
    const newUser = await createUser(form);
    onAdd(newUser);
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.box} onClick={e => e.stopPropagation()}>
        <h2>Dodaj korisnika</h2>
        {Object.keys(form).map(f => (
          <input
            key={f}
            name={f}
            value={form[f]}
            onChange={handleChange}
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            className={styles.input}
          />
        ))}
        <div className={styles.actions}>
          <button onClick={handleSave} className={styles.save}>Sačuvaj</button>
          <button onClick={onClose} className={styles.cancel}>Otkaži</button>
        </div>
      </div>
    </div>
  );
}