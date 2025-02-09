'use client'
import Header from "@/components/Header/Header";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { api } from "@/http";
import axios from "axios";
import Button from "@/components/Button/Button";
import WorkspaceCreateInput from "@/components/WorkspaceCreateInput/WorkspaceCreateInput";

export default function Home() {
  const [workspaces, setWorkspaces] = useState([]);
  // const [data, setData] = useState('');
  useEffect(() => {
    // const token = localStorage.getItem('token');
    // if (!token) window.location.href = '/auth'
    (async function getWorkspaces() {
      try {
        const response = await api.get('api/workspaces/all');
        console.log(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          let message = error.response?.data?.message;
          if (error.code == 'ERR_BAD_REQUEST') {
            // if (typeof message == "object") message = message.join(', ');
            // setErrorMessage(message)
            // setTimeout(() => setErrorMessage(''), 1500);
          }
          console.log(error, message);
          // else navigate('/error', { state: { error: { message: error.message } } })
        }
      }
    })();
  }, [])

  return (
    <>
      <Header />
      <main>
        <div className="sidebar">
          <div className="title">
            <span>Workspaces</span>
            <Button variant="first" text="+" />
          </div>
          <hr />
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
        <div className="content">
          <WorkspaceCreateInput>
            
          </WorkspaceCreateInput>
        </div>
      </main>
      <footer></footer>
    </>
  );
}