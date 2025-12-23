import { useState, useRef } from 'react';
import { assignPolicy, uploadAvatar, removeUserPolicy } from '../api/api';
import UserDetails from './UserDetails';
import styles from './UserRow.module.css';

export default function UserRow({ user, policies, onUserUpdate, onDeleteClick }) {
  const [expanded, setExpanded] = useState(false);
  const [msg, setMsg] = useState('');
  const fileInputRef = useRef();

  // Dodela polise
  const handleIcon = async (policyId) => {
    try {
      await assignPolicy(user.id, policyId);

      const policyToAdd = policies.find(p => p.id === policyId);
      const updatedUser = {
        ...user,
        policies: [...(user.policies || []), policyToAdd],
      };

      onUserUpdate(updatedUser);

      setMsg('✅ Dodeljeno');
      setTimeout(() => setMsg(''), 1500);
    } catch (err) {
      if (err.status === 400 && err.message === 'Korisnik već ima ovu polisu.') {
        setMsg('⚠ Korisnik već ima ovu polisu');
        setTimeout(() => setMsg(''), 2000);
      } else {
        console.error('Axios error:', err);
        setMsg('Greška');
        setTimeout(() => setMsg(''), 2000);
      }
    }
  };

  // Uklanjanje polise
  const handleRemovePolicy = async (policyId) => {
    try {
      await removeUserPolicy(user.id, policyId);
      const updatedUser = {
        ...user,
        policies: (user.policies || []).filter(p => p.id !== policyId)
      };
      onUserUpdate(updatedUser);
    } catch (err) {
      console.error('Greška pri uklanjanju polise', err);
    }
  };

  // Upload avatara
  const handleAvatarClick = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await uploadAvatar(user.id, file);
      onUserUpdate({ ...user, avatar: res.avatar });
    } catch (err) {
      console.error('Avatar upload failed', err);
    }
  };

  const avatarSrc = user.avatar
    ? `http://localhost:5000${user.avatar}`
    : user.gender === 'female'
      ? 'http://localhost:5000/uploads/avatars/default_female.png'
      : 'http://localhost:5000/uploads/avatars/default_male.png';

  return (
    <>
      <div className={styles.card} onClick={() => setExpanded(!expanded)}>
        <div className={styles.left}>
          <div className={styles.avatarWrapper} onClick={handleAvatarClick}>
            <img src={avatarSrc} alt="avatar" className={styles.avatar} />
            <div className={styles.overlay}>📷</div>
          </div>
          <div className={styles.name}>{user.firstName} {user.lastName}</div>
          <div className={styles.msg}>{msg}</div>
        </div>

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

      {expanded && (
        <UserDetails
          userId={user.id}
          onPolicyRemoved={handleRemovePolicy}
        />
      )}

      <input
        type="file"
        hidden
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
      />
    </>
  );
}
