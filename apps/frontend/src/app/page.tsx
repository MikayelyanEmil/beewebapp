'use client'
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { api } from "@/http";
import axios from "axios";
import WorkspaceCreateInput from "@/components/WorkspaceCreateInput/WorkspaceCreateInput";
import Sidebar from "@/components/Sidebar/Sidebar";
import loadingSVG from '@/assets/loading.svg';
import Image from "next/image";

export default function Home() {
  const [workspaces, setWorkspaces] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function getWorkspaces() {
      try {
        const response = await api.get('workspaces/all');
        setWorkspaces(response.data.workspaces);
        setLoading(prev => !prev);
        console.log(response.data.workspaces);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status == 401) window.location.href = '/auth';
          console.log(error);
        }
      }
    })();
  }, [])

  return (<>
    {loading ? <Image src={loadingSVG} alt="loading" width={100} height={100} style={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }} />
      : <>
        < Header />
        <main>
          {showForm && <WorkspaceCreateInput setShowForm={setShowForm} setWorkspaces={setWorkspaces} />}
          <Sidebar setShowForm={setShowForm} workspaces={workspaces} />
          <div className="content"></div>
        </main>
        <footer></footer>
      </>}</>)
}