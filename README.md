# Apresentação da Aplicação

Aplicação feita para o teste solicitada pela Qintness, onde o usuário pesquisa um usuário do Github na tela inicial
e na tela seguinte são apresentados seus respectivos repositórios. A aplicação ainda contém a função de **Star / Unstar**
que é presente no próprio Github.

## Instalação

Após clonar o projeto em sua máquina basta rodar o comando `npm install` para baixar os `node_modules`. 

### Uso

Após o passo anterior, basta rodar o comando `npm start` para rodar e abrir a aplicação, onde a mesma tem como padrão 
o endereço [http://localhost:3000](http://localhost:3000).

A aplicação roda baseada na autenticação de um **Personal Token** que é fornecido pelo próprio Github. Para esta configuração
basta criar um arquivo `.env` dentro da pasta `.src` do projeto, fazendo isso só basta setar a seguinte variavel ambiente:
**`REACT_APP_TOKEN = "(seu token aqui)"`**.

Para saber como pegar seu token de autenticação [acesse este link](https://docs.github.com/pt/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). OBS: Marque todas opções de permissão para evitar problemas.

Feito isso, basta procurar por qualquer usuário cadastrado no Github que será renderizado seus repositórios. A função de
`Stars` está configurada por padrão para meu usuário, sendo assim, todos os repositórios que tenho marcados como **Star**
serão renderizados com o icone da estrela preenchida. Você pode mudar para seu usuário para testar a função, basta apenas 
mudar o valor do `username` na função `getStarRepo` para o nome de seu usuário ou de qualquer um a sua escolha.  

#### Rotas

As rotas da aplicação são definidas de maneira simples, porém, não é possivel acessar a rota `/repos` sem informar um usuário,
ao tentar dar submit no `form` sem este parâmetro, será requerido pelo `input` a informação do mesmo. Caso tente acessar a
rota diretamente, será retornado automaticamente para a `Home` pois a aplicação verifica se há algum `username` presente no
`localStorage` do navegador, onde este só é setado após o submit do `form`.  

##### Fontes

A aplicação foi desenvolvida seguindo a [Documentação da API do Github](https://docs.github.com/en/free-pro-team@latest/rest),
com o uso da `lib` [SWR](https://github.com/vercel/swr) e várias outras ferramentas pertencentes do **React**.
