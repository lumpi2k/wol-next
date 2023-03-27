import { useEffect, useState } from 'react';
import styles from 'styles/index.module.css';

export default function Home() {
  const [wakingUp, setWakingUp] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const wakeUpNAS = async () => {
    setWakingUp(true);
    setAlert(null);
    try {
      const response = await fetch('/api/wol', { method: 'POST' });
      const data = await response.json();
  
      if (response.ok) {
        setAlert({ type: 'success', message: data.message });
      } else {
        setAlert({ type: 'error', message: data.message || 'Error sending magic packet' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Error sending magic packet: ' + (error as Error).message });
    }
    setWakingUp(false);
  };
  
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert]);


  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <button
          className={styles.wakeUpButton}
          onClick={wakeUpNAS}
          disabled={wakingUp}
        >
          Wake NAS
        </button>
      </div>
      {alert && (
        <div
          className={`${styles.alert} ${
            alert.type === 'success' ? styles.successAlert : styles.errorAlert
          }`}
        >
          {alert.message}
        </div>
      )}
    </main>
  );
}