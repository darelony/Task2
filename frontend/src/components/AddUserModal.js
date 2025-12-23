import { useState } from 'react';
import { createUser } from '../api/api';
import styles from './AddUserModal.module.css';

export default function AddUserModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
    phone: '',
    email: '',
    gender: 'male' // dodajemo gender, default male
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    // Obavezna polja: firstName, lastName i gender
    if (!form.firstName || !form.lastName || !form.gender) {
      return alert('Obavezna polja: Ime, Prezime i Pol');
    }

    // Dodela default avatara na osnovu gender-a
    const avatar =
      form.gender === 'female'
        ? '/uploads/avatars/default_female.png'
        : '/uploads/avatars/default_male.png';

    const newUser = await createUser({ ...form, avatar });
    onAdd(newUser);
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.box} onClick={e => e.stopPropagation()}>
        <h2>Dodaj korisnika</h2>
        {['firstName', 'lastName', 'birthDate', 'address', 'phone', 'email'].map(f => (
          <input
            key={f}
            name={f}
            value={form[f]}
            onChange={handleChange}
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            className={styles.input}
          />
        ))}

        {/* Polje za gender */}
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className={styles.input}
        >
          <option value="male">Muški</option>
          <option value="female">Ženski</option>
        </select>

        <div className={styles.actions}>
          <button onClick={handleSave} className={styles.save}>Sačuvaj</button>
          <button onClick={onClose} className={styles.cancel}>Otkaži</button>
        </div>
      </div>
    </div>
  );
}
