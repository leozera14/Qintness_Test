import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Octokit } from "@octokit/core";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { FiArrowLeft } from 'react-icons/fi';
import { AiFillStar, AiOutlineStar, AiOutlineMail } from 'react-icons/ai';
import { BiBuildings } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr';
import './style.css'

export default function Repos() {
  const [repo, setRepo] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [star, setStar] = useState([]);

  const user = localStorage.getItem('username');
  const octokit = new Octokit({ auth: process.env.REACT_APP_TOKEN });

  useEffect(() => {
      octokit.request('GET /users/{username}', {
        username: user
      }).then(function (response) {
        setUserInfo([response.data])
      });

      getStarRepo();
  }, [user])

  async function getStarRepo() {
   await octokit.request('/users/{username}/starred', {
      username: 'leozera14'
    }).then(function (response) {
      let checked = response.data.map(res => {
        return res.id;
      })

      setStar(checked);
    })
  }

  let date = null;
  let year = null;
  let month = null;
  let dt = null;
  let hours = null;
  let minutes = null;
  let seconds = null;

  const { data, error } = useFetch(repo ? `https://api.github.com/users/${user}/repos` : null); 

  if(!data) {
    return <p>Carregando...</p>
  } 

  if(error) {
    return <p>Erro ao carregar repositórios {error}</p>
  }

  function clear(){
    localStorage.clear();
  };

  async function favoriteRepo(repo, owner, type) {
    try {
      const request = await octokit.request("GET /user/starred/:owner/:repo", {
        owner: owner,
        repo: repo,
        type: type,
      })

      if (request.status === 204) {
        try {
          await octokit.request("DELETE /user/starred/:owner/:repo", {
            owner: owner,
            repo: repo,
            type: type,
          }).then(function(response) {
            if(response.status === 204) {
              toast.success("Repositório desfavoritado com sucesso !")
              getStarRepo()
            }
          })
        } catch (error) {
          console.log(`${error}`);
        }
      } 
    } catch (error) {
        if (error.status === 404) {
          try {
            await octokit.request("PUT /user/starred/:owner/:repo", {
              owner: owner,
              repo: repo,
              type: type,
            }).then(function(response) {
              if(response.status === 204) {
                toast.success("Repositório favoritado com sucesso !")
                getStarRepo()
              }
            })
          } catch (error) {
            console.log(`${error}`);
        }
      }
    }
  }

  return (
    <div className="full-container">
      <div className="wrap-container">
        <div className="wrap-content">

          <div className="title">
            <Link to="/" onClick={clear}><FiArrowLeft /> &nbsp;Voltar para a Home</Link>
          </div>
          
          <div className="content-one">
            {userInfo.length > 0
              ? userInfo.map(user => (
                <>
                  <div className="user-container">
                    <div className="profile-info user-image">
                      <a href={user.html_url} target="_blank" rel="noreferrer">
                        <img src={user.avatar_url} alt={user.login}/>
                      </a>
                    </div>

                    <div className="profile-info user-name">
                      <h1> {user.name} </h1>
                    </div>

                    <div className="profile-info user-login">
                      <p>{user.login}</p>
                    </div>

                    <div className="profile-info user-bio">
                      <p>{user.bio}</p>
                    </div>

                    <div className="profile-info">
                      <p><BiBuildings /> &nbsp;{user.company}</p>
                    </div>

                    <div className="profile-info">
                      <p><GrLocation /> &nbsp;{user.location}</p>
                    </div>

                    <div className="profile-info">
                      <p><AiOutlineMail /> &nbsp;{user.email}</p>
                    </div>
                  </div>
                </>
              ))
              :<div></div>
            }
          </div>
          
          <div className="content-two">
            {data.length > 0
              ? data.map(dados => ( 
                <div className="repos-container" key={dados.id}>
                  <div className="info-container star">
                    <p>
                    {   
                        star.includes(dados.id)
                        ? <span onClick={() => favoriteRepo(dados.name, dados.owner.login, dados.private)}>
                              <AiFillStar size={23} color="#ffd700"/> &nbsp;Unstar
                            </span>
                        : <span onClick={() => favoriteRepo(dados.name, dados.owner.login, dados.private)}>
                              <AiOutlineStar size={23} color="#ffd700"/> &nbsp;Star
                           </span>

                      }
                    </p>
                  </div>

                  <div className="item conteudo info-container info-container-anchor">
                    <a href={dados.name} target="_blank" rel="noreferrer">
                      {dados.name}
                    </a>
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
              ))
              : <div></div>
            }
         </div>
        
        </div>   
               
      </div>
      <ToastContainer />
    </div>
  )
}

