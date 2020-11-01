import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { FiSearch } from 'react-icons/fi';

export default function Home() {
  const [user, setUser] = useState();

  const history = useHistory(); 

  async function getUser(e) {
    e.preventDefault();

    try {
      localStorage.setItem('username', user);
      toast.success("Redirecionando aos repositórios...");
      setTimeout(() => {
        history.push('/repos')
      }, 1500)
    } catch (error) {
      console.log(`${error}`);
    }
  }

  return (
    <div>
      <form onSubmit={getUser}>
        <input 
        type="text" 
        placeholder="Digite o nome do usuário"
        value={user} 
        onChange={e => setUser(e.target.value)}/>

        <button type="submit">
          <FiSearch scale="18" color="#000"/>
        </button>
      </form>

      <ToastContainer />
    </div>
  )
}

