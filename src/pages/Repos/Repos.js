import React from 'react';
import dotenv from 'dotenv';
import { useFetch } from '../../hooks/useFetch';
import { Octokit } from "@octokit/core";
import { Link, useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { FiGithub, FiArrowLeft } from 'react-icons/fi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import './style.css'

export default function Home() {
  const history = useHistory();

  const user = localStorage.getItem('username'); 

  if(!user) {
    localStorage.setItem('no_user');

    history.push('/');
  }

  const { data } = useFetch(`https://api.github.com/users/${user}/repos`);

  const token = dotenv.config(process.env.TOKEN);

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

  function clear(){
    localStorage.removeItem('username');
  };

  async function favoriteRepo(stars, repo, owner, type) {
    console.log(stars, repo, owner);

    const octokit = new Octokit({ auth: `${token}` });
    

    if(stars === 0) {
      try {
        await octokit.request("PUT /user/starred/:owner/:repo", {
          owner: owner,
          repo: repo,
          type: type,
        }).then(function(response) {
          if(response.status === 204) {
            toast.success("Repositório favoritado com sucesso !")
          }
        })
      } catch (error) {
        console.log(`${error}`);
      }
    } else {
      try {
        await octokit.request("DELETE /user/starred/:owner/:repo", {
          owner: owner,
          repo: repo,
          type: type,
        }).then(function(response) {
          if(response.status === 204) {
            toast.success("Repositório desfavoritado com sucesso !")
          }
        })
      } catch (error) {
        console.log(`${error}`);
      }
    }
  }

  return (
    <div className="full-container">
        <div className="wrap-container">
        <div className="title">
          <div>
           <h1>Repositórios de {user}</h1>
          </div>

          <div>
           <Link to="/" onClick={clear}><FiArrowLeft /> &nbsp;Voltar a Home</Link>
          </div>
        </div>
          {data.map(dados => ( 
            <div className="repos-container" key={dados.id}>
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

              <div className="info-container star">
                <p>
                  {
                  dados.stargazers_count === 0
                  ? <span onClick={() => favoriteRepo(dados.stargazers_count, dados.name, dados.owner.login, dados.private)} >
                      <AiOutlineStar size={23} color="#ffd700"/> &nbsp;Star
                    </span> 
                  : <span onClick={() => favoriteRepo(dados.stargazers_count, dados.name, dados.owner.login, dados.private)}>
                      <AiFillStar size={23} color="#ffd700"/> &nbsp;Unstar
                    </span>    
                  }
                  </p>
              </div>

              <div className="item conteudo info-container link-repository">
                <Link onClick={() => goToRepo(dados.html_url)}><FiGithub color="#000" size={20} /> &nbsp;Visite o repositório...</Link>
              </div>
            </div>
          ))}
        </div>
      <ToastContainer />
    </div>
  )
}

