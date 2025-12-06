// frontend/src/components/UserRow.js
import { useState } from 'react';
import { assignPolicy } from '../api/api';
import UserDetails from './UserDetails';
import styles from './UserRow.module.css';

export default function UserRow({ user, policies, setUsers, onDeleteClick }) {
  const [expanded, setExpanded] = useState(false);
  const [msg, setMsg] = useState('');

  // dodela polise
  const handleIcon = async (policyId) => {
    try {
      await assignPolicy(user.id, policyId);
      setMsg('✅ Dodeljeno');
      setTimeout(() => setMsg(''), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Greška');
      setTimeout(() => setMsg(''), 2000);
    }
  };

  return (
    <>
      <div className={styles.card} onClick={() => setExpanded(!expanded)}>
  {/*  LEVI deo – ime + poruka  */}
  <div className={styles.left}>
    <div className={styles.name}>{user.firstName} {user.lastName}</div>
    <div className={styles.msg}>{msg}</div>
  </div>

  {/*  DESNI deo – ikonice + dugme  */}
  <div className={styles.right}>
    <div className={styles.icons}>
      {policies.map((p) => (
        <img
          key={p.id}
          src={`/ikonice/${p.name.replace(/\s+/g, '').toLowerCase()}.png`}
          alt={p.name}
          title={p.name}
          onClick={(e) => {
            e.stopPropagation();
            handleIcon(p.id);
          }}
          className={styles.icon}
        />
      ))}
    </div>

    <button
      className={styles.delBtn}
      onClick={(e) => {
        e.stopPropagation();
        onDeleteClick(user);
      }}
      title="Obriši korisnika"
    >
      Obriši
    </button>
  </div>
</div>

{expanded && <UserDetails userId={user.id} onPolicyRemoved={setUsers} />}
    </>
  );
}