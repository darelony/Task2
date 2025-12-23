import { useEffect, useMemo, useState } from 'react';
import { getUsers, getPolicies, deleteUser } from '../api/api';
import UsersTable from '../components/UsersTable';
import AddUserModal from '../components/AddUserModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import styles from './UserPage.module.css';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('lastName'); 
  const [asc, setAsc] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [showDel, setShowDel] = useState(null); 

  useEffect(() => {
    Promise.all([getUsers(), getPolicies()])
      .then(([u, p]) => {
        setUsers(u);
        setPolicies(p);
      })
      .catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    let list = users.filter(u =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase())
    );
    list.sort((a, b) => {
      const valA = a[sortKey] || '';
      const valB = b[sortKey] || '';
      return asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
    return list;
  }, [users, search, sortKey, asc]);

  const handleAdd = (newUser) => setUsers([...users, newUser]);

  const handleDelete = async () => {
    await deleteUser(showDel.id);
    setUsers(prev => prev.filter(u => u.id !== showDel.id));
    setShowDel(null);
  };

  // callback za ažuriranje jednog korisnika (npr. kada uklonimo polisu)
  const handleUserUpdate = (updatedUser) => {
    setUsers(prev => Array.isArray(prev) 
      ? prev.map(u => u.id === updatedUser.id ? updatedUser : u)
      : []
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Osiguranje</h1>

        <div className={styles.toolbar}>
          <button onClick={() => setShowAdd(true)} className={styles.addBtn}>
            + Dodaj korisnika
          </button>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraži korisnike..."
            className={styles.search}
          />

          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className={styles.select}
          >
            <option value="lastName">Prezime</option>
            <option value="firstName">Ime</option>
            <option value="birthDate">Datum rođenja</option>
          </select>

          <button onClick={() => setAsc(a => !a)} className={styles.toggle}>
            {asc ? 'A-Z ↑' : 'Z-A ↓'}
          </button>
        </div>

        <UsersTable
          users={filtered}
          policies={policies}
          onUserUpdate={handleUserUpdate}
          onDeleteClick={(user) => setShowDel(user)}
        />

        {showAdd && <AddUserModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
        {showDel && (
          <ConfirmDeleteModal
            userName={`${showDel.firstName} ${showDel.lastName}`}
            onConfirm={handleDelete}
            onCancel={() => setShowDel(null)}
          />
        )}
      </div>
    </div>
  );
}
