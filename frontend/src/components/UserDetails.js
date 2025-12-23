import { useEffect, useState } from 'react';
import { getUser, removeUserPolicy } from '../api/api';
import styles from './UserDetails.Module.css';

export default function UserDetails({ userId, onPolicyRemoved }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(userId)
      .then((u) => {
        const mappedUser = {
          ...u,
          policies: u.Policies || [],
        };
        setUser(mappedUser);
      })
      .catch(console.error);
  }, [userId]);

  const handleRemove = async (policyId) => {
    try {
      await removeUserPolicy(userId, policyId);

      const updatedUser = {
        ...user,
        policies: user.policies.filter((p) => p.id !== policyId),
      };

      setUser(updatedUser);

      // obaveštavamo roditelja (UserRow)
      onPolicyRemoved?.(policyId);
    } catch (err) {
      console.error('Greška pri uklanjanju polise', err);
    }
  };

  if (!user) return <p className={styles.loading}>Učitavanje...</p>;

  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>Kontakt karte</h3>

      <div className={styles.grid}>
        <div className={styles.cell}>
          <span className={styles.label}>Datum rođenja</span>
          <span className={styles.value}>{user.birthDate || '—'}</span>
        </div>

        <div className={styles.cell}>
          <span className={styles.label}>Adresa</span>
          <span className={styles.value}>{user.address || '—'}</span>
        </div>

        <div className={styles.cell}>
          <span className={styles.label}>Telefon</span>
          <span className={styles.value}>{user.phone || '—'}</span>
        </div>

        <div className={styles.cell}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{user.email || '—'}</span>
        </div>
      </div>

      <h4 className={styles.subHeading}>Polise</h4>

      {user.policies?.length ? (
        <ul className={styles.list}>
          {user.policies.map((p) => (
            <li key={p.id} className={styles.item}>
              <div className={styles.left}>
                <span className={styles.policyName}>{p.name}</span>
                <span className={styles.price}>
                  {Number(p.monthlyRate || 0).toFixed(2)} RSD/mes
                </span>
              </div>
              <button
                className={styles.remove}
                onClick={() => handleRemove(p.id)}
                title="Ukloni polisu"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>Korisnik nema dodeljenih polisa.</p>
      )}
    </div>
  );
}
