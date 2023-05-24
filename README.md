# :toolbox: Tecnologias usadas:

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Sinon](https://img.shields.io/badge/sinon.js-323330?style=for-the-badge&logo=sinon)
![Chai](https://img.shields.io/badge/chai.js-323330?style=for-the-badge&logo=chai&logoColor=red)

# :open_book: Objetivo do projeto <nome do projeto>

<details>
  <summary>:speech_balloon: Objetivos</summary>

  ```
  1. Desenvolver uma API RESTful utilizando a arquitetura MSC
  2. A API construída é um sistema de gerenciamento de vendas no formato dropshipping em que será possível:
    2.1 criar, visualizar, deletar e atualizar produtos e vendas
  
  3. Usar banco de dados MySQL
  ```
</details>

<details>
  <summary>:speech_balloon: Exemplo de funcionamento</summary>
  

![Captura de tela de 2023-05-24 16-01-39](https://github.com/Lucas-Israel/project-store-manager/assets/104790267/c29c55c7-e9f8-4a0c-a5bb-41b888da057e)

</details>

# :heavy_exclamation_mark: Arquivos desenvolvidos nesse projeto:

<details>
  <summary>:speech_balloon: Arquivos</summary>

  ```
  src/
    app.js
  
    controllers/
      index.js
      products.controller.js
      sales.controller.js
  
    middlewares/
      validateProductBody.js
      validateProductId.js
      validateSalesUpdate.js
      
    models/
      index.js
      products.model.js
      sales.model.js
      sales_products.model.js
    
      database/
        connection.js
  
    routers/
      index.js
      product.router.js
      sales.router.js
      
    services/
      index.js
      products.service.js
      sales.service.js
      
      validations/
        schemas.js
        validations.js
       
    utils/
      errorMap.js

  tests/
    unit/
      controllers/
        productsController.test.js
        salesController.test.js
  
      models/
        productsModels.test.js
        salesModels.test.js
        sales_productsModels.test.js
  
      services/
        productsServices.test.js
        salesServices.test.js
  ```
</details

#### :warning: todos os outros arquivos foram desenvolvidos pela [Trybe](https://www.betrybe.com).

# :thinking: Como checar o projeto

```
git clone git@github.com:Lucas-Israel/project-store-manager.git
docker-compose up -d
    (caso tenha problemas com porta, mudar elas no arquivo docker-compose.yml)
docker exec -it store_manager bash
npm install && npm run migration && npm run seed && npm run test:mocha && npm run start
com thunder client ( ou similares ) acessar http://localhost:3003
  
  GET /products
  GET /products/search
  GET /products/:id
  POST /products
  PUT /products/:id
  DELETE /products/:id
  
  GET /sales
  GET /sales/:id
  POST /sales
  PUT /sales/:id
  DELETE /sales/:id
```

# :calendar: Datas para desenvolvimento

```
início: 11/11/22 às 15h11
término: 14/11/22 às 20h40
prazo: 7 dias
dias específicos para o desenvolvimento do projéto: 5
```

# :trophy: Percentual de conclusão do projeto

![Captura de tela de 2023-05-24 16-17-07](https://github.com/Lucas-Israel/project-store-manager/assets/104790267/2d1d9a22-3601-4320-9e3d-10d42a1877d7)

<details>
  <summary>:warning: Metodo de avaliação da Trybe</summary>
  
##### A escola de programação [Trybe](https://www.betrybe.com) utiliza um sistema de avaliação baseado na conclusão de requisitos em cada projeto, considerando a porcentagem de conclusão, com um mínimo de 80% dos requisitos obrigatórios, em um prazo regular de no máximo 7 dias, tendo dias específicos para o desenvolvimento do projeto que variam de acordo com a complexidade dele.

##### Não alcançando esse patamar mímino, o aluno entra em recuperação, tendo que entregar 90% dos requisitos obrigatórios mais os bonús, em outros 7 dias, caso o aluno falhe novamente ele é mudado de turma para refazer o conteúdo e projeto, caso falhe após mudar de turma, no mesmo conteúdo/projeto, o aluno é removido do curso.
  
</details>
