'use client'
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState('');
  useEffect(() => {
    fetch('api').then(res => res.text()).then(text => setData(text)).catch(e => setData('Error'))
  }, [])

  return (
    <div className={styles.page}>
      {data}
    </div>
  );
}