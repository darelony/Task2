import UserRow from './UserRow';
import styles from './UsersTable.module.css';

export default function UsersTable({ users, policies, setUsers, onDeleteClick }) {
  if (!users.length) return <p className={styles.empty}>Nema rezultata</p>;

  return (
    <div className={styles.grid}>
      {users.map(u => (
        <UserRow key={u.id} 
        user={u} 
        policies={policies} 
        setUsers={setUsers} 
        onDeleteClick={onDeleteClick}/>
      ))}
    </div>
  );
}