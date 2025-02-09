'use client'
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { api } from "@/http";
import axios from "axios";
import WorkspaceCreateInput from "@/components/WorkspaceCreateInput/WorkspaceCreateInput";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
  const [workspaces, setWorkspaces] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    (async function getWorkspaces() {
      try {
        const response = await api.get('workspaces/all');
        setWorkspaces(response.data.workspaces);
        console.log(response.data.workspaces);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status == 401) window.location.href = '/auth';
          console.log(error);
        }
      }
    })();
  }, [])

  return (
    <>
      <Header />
      <main>
        {showForm && <WorkspaceCreateInput setShowForm={setShowForm} setWorkspaces={setWorkspaces} />}
        <Sidebar setShowForm={setShowForm} workspaces={workspaces} />
        <div className="content"></div>
      </main>
      <footer></footer>
    </>
  );
}