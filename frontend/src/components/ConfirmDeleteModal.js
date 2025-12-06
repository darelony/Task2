import styles from './ConfirmDeleteModal.module.css';

export default function ConfirmDeleteModal({ onConfirm, onCancel, userName }) {
  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div className={styles.box} onClick={e => e.stopPropagation()}>
        <h3>Obriši korisnika</h3>
        <p>Da li sigurno želiš da obrišeš <b>{userName}</b>?</p>
        <div className={styles.actions}>
          <button onClick={onConfirm} className={styles.del}>Obriši</button>
          <button onClick={onCancel} className={styles.cancel}>Otkaži</button>
        </div>
      </div>
    </div>
  );
}