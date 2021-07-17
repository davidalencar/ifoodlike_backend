#  IFood Like Backend em NODEJS

AVISO: Projeto criado apenas para responder ao IFoodLIke frontend com fim de estudo. Você vai notar que existem vários pontos a melhorar a começar pela conertura de testes.

Criado junto com meu projeto em [Angula](https://github.com/davidalencar/ifoodlike_angular_frontend) esse garotão está rodando em um heroku.



## Construído com:
- [express](https://github.com/expressjs/express)
- [mongoose](https://github.com/Automattic/mongoose)
- [mongodb](https://github.com/mongodb/node-mongodb-native)


## Primeiros passos

#### #Pré-requisitos
O que você precisa instalar para executar o projeto em sua máquina.

- [Node.js](https://nodejs.org/en/download/current/) (Plataforma)
- [npm](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm) (Gerenciador de pacotes do Node.js)
- [mongoDB](https://www.mongodb.com/) (Banco de dados de documentos)
- [nodemon](https://www.npmjs.com/package/nodemon) (Pacote para auxiliar no desenvolvimento)


#### #Instalando
Como proceder para baixar e instalar o projeto.

- Clone o repositório para o sua maquina local:
```
git clone git@github.com:elly-group/loja_api.git
```
Um novo diretório chamado "loja" será criado e será a raiz do projeto. **_(/VRCA$)_**

- Acesse **_(/loja$)_** e execute o seguinte comando:
```
npm install
```

## Configurando

#### #Configurar variáveis de ambiente:

Utilizamos o pacote (config)[https://www.npmjs.com/package/config] para gerenciar as variáveis de ambiente. 
Os arquivos de **.json** de configuração estão em **_(/config)_**

## Executando testes
Testes automatizados foram criados para garantir que todas as funcionalidades cumpram seu papel corretamente e o continuem cumprindo no decorrer das alterações e evolução do projeto.

Idealmente a execução desses testes fará parte de uma rotina de integração contínua.

Para executar os testes basta utilizar o comando:

```
make test
```
## Rodando a aplicação
Uma vez que todas as configurações foram feitas, basta executar o comando abaixo em **_(/VRCA$)_**

```
make dev
```

## Rodando a aplicação com nodemon
O nodemon executará a aplicação e fará monitoriamento de todos os arquivos **.js** para reinicia-la quando qualquer um deles forem alterados.

```
make nodemon
```

## Mantendo

Muito ainda pode ser feito para a evolução desse projeto, é importante termos alguns padrões e ferramentas para caminharmos com segurança.

#### #Padronização do código

Para nos ajudar a manter a organização e legibilidade dos códigos utilizamos a ferramenta [eslint](https://eslint.org/).


Para executar a verificação do código utilize o comando:

```
make lint
```

Alguns erros podem ser corrigidos automaticamente.
