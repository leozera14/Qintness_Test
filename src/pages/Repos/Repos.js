import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import './style.css'

export default function Home() {
  const user = localStorage.getItem('username'); 

  const { data } = useFetch(`https://api.github.com/users/${user}/repos`);

  let date = null;
  let year = null;
  let month = null;
  let dt = null;
  let hours = null;
  let minutes = null;
  let seconds = null;

  if(!data) {
    return <p>Carregando...</p>
  } 

  function goToRepo(url) {
    setTimeout(() => {
      toast.success('Redirecionando ao repositorio...');
      window.open(url)
    })
    
  }

  return (
    <div className="full-container">
        <div className="wrap-container">
        <div className="title">
          <h1>Repositórios de {user}</h1>
        </div>
          {data.map(dados => ( 
            <div className="repos-container" key={dados.id} onClick={() => goToRepo(dados.html_url)}>
              <div className="item image info-container">
                <img src={dados.owner.avatar_url} alt={dados.id}/>
              </div>

              <div className="item conteudo info-container">
                <b>Nome: </b> <p>{dados.name}</p>
              </div>

              <div className="item conteudo info-container textarea-container">
                <b>Descrição: </b>
                <p>
                  {dados.description === null
                  ? <span className="no-description"> Repositório não contém descrição</span>
                  : <textarea className="textarea-resize" readOnly={true} defaultValue={dados.description  }></textarea>
                  }
                </p>
              </div>

              <div className="item conteudo info-container">
                <b>Status: </b>
                <p>
                  {dados.private === false
                  ? <span className="public"> Público</span>
                  : <span className="private"> Privado</span>
                  }
                </p>
              </div>

              <div className="item conteudo info-container">
                <b>Principal linguagem: </b> 
                <p>{dados.language}</p>
              </div>

              <div className="item conteudo info-container">
                <b>Data de criação: </b>
                <p> 
                  {
                  date = new Date(dados.created_at),
                  year = date.getFullYear(),
                  month = date.getMonth()+1,
                  dt = date.getDate(),
                  hours = date.getHours(),
                  minutes = date.getMinutes(),
                  seconds = date.getSeconds(),

                  dt < 10 ? dt = '0' + dt : null,
                  month < 10 ? month = '0' + month : null,
                  
                  <span> {dt}/{month}/{year} {hours}:{minutes}:{seconds}</span>
                  }
                </p>
              </div>

              <div className="item conteudo info-container">
                <b>Último update: </b>
                <p>
                  {
                    date = new Date(dados.updated_at),
                    year = date.getFullYear(),
                    month = date.getMonth()+1,
                    dt = date.getDate(),
                    hours = date.getHours(),
                    minutes = date.getMinutes(),
                    seconds = date.getSeconds(),
  
                    dt < 10 ? dt = '0' + dt : null,
                    month < 10 ? month = '0' + month : null,
                  
                    <span> {dt}/{month}/{year} {hours}:{minutes}:{seconds}</span>
                  }
                </p>
              </div>
            </div>
          ))}
        </div>
      <ToastContainer />
    </div>
  )
}

