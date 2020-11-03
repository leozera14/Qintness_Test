import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { FiGithub } from 'react-icons/fi';
import './style.css';

export default function Home() {
  const [user, setUser] = useState();

  const no_user = localStorage.setItem('no_user');

  if(no_user) {
    toast.error("Necessário informar um usuário");
  } else {
    localStorage.removeItem('no_user');
  }

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
    <div className="container">
      <div className="content-container">
        <div className="title">
          <h1>Busque por um usuário</h1>
        </div>
        <form onSubmit={getUser}>
          <input 
          type="text" 
          placeholder="Digite o nome do usuário"
          required={true}
          value={user} 
          onChange={e => setUser(e.target.value)}/>

          <button type="submit">
            <FiGithub size={25} color="#fff"/>
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  )
}

