'use client'
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  // const [data, setData] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) window.location.href = '/auth'
  }, [])

  return (
    <div className={styles.page}>
      {'sjh'}
    </div>
  );
}