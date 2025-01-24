# FastFeet - Delivery App

## Descrição

Uma aplicação voltada para gestão de entregas e encomendas de uma transportadora fictícia, a FastFeet, permitindo o gerenciamento de usuários, entregadores, destinatários e o acompanhamento de encomendas em diferentes endereços. O sistema foca em funcionalidades como autenticação, controle de acesso, e operações relacionadas à logística de entregas.

## Funcionalidades

### Autenticação:

- Login com CPF e senha para os usuários (entregadores, destinatários e admins).

### Gestão de Usuários:

- CRUD de entregadores (com exceção do GET, somente admins podem realizar as outras ações);
- CRUD de destinatários (com exceção do GET, somente admins podem realizar as outras ações);

### Gestão de Encomendas:

- CRUD de encomendas (com exceção do GET, somente admins podem realizar as outras ações).

### Marcar encomendas como:

- Disponíveis para retirada;

- Entregues (necessário envio de foto);

- Devolvidas.

### Listar encomendas com a mesma localidade do entregador.

### Entrega e Retirada:

- Somente o entregador que retirou a encomenda pode marcá-la como entregue;

- Possibilidade de listar as entregas realizadas pelo entregador.

### Notificações:

- Notificação automática ao destinatário a cada alteração no status da encomenda.

### Gerenciamento de Senhas:

- Admins podem alterar senhas de qualquer usuário.

## Regras de Negócio

### Apenas admins podem realizar:

- CRUD de encomendas;

- CRUD de entregadores;

- CRUD de destinatários;

- Alterar a senha de um usuário;

- Para marcar uma encomenda como entregue, é obrigatório o envio de uma foto;

- Somente o entregador que retirou a encomenda pode marcá-la como entregue;

- Entregadores não podem listar encomendas de outros entregadores;

## Tecnologias Utilizadas

- Node.js

- TypeScript

- NestJS

- MongoDB

- bcryptjs (para criptografia de senhas)

## Endpoints Principais

### Autenticação

- POST /user/login - Realiza login com CPF e senha;
- POST /user/signout - Desloga o usuário atual.

### CRUD de Usuários

- GET /user/:id - Busca um usuário pelo id;
- GET /user/users?user_type=admin - Busca usuários pelo tipo (admin, recipient, courier);
- POST /user - Cria um novo usuário (somente admins podem realizar);
- PUT /user/update/:id - Atualiza dados de um usuário (somente admins podem realizar);
- PATCH /user/change-password - Altera a senha de um usuário a partir do envio do cpf e senha atual (somente admins podem realizar);
- DELETE /user/:id - Remove um usuário (somente admins podem realizar).

### CRUD de Encomendas

- GET /order/nearby-orders?address=rua Neves - Lista encomendas na mesma localidade do entregador;
- GET /order - Lista encomendas atreladas a um entregador;
- POST /order - Cria uma nova encomenda (somente admins podem realizar);
- PUT /order/update/:id - Atualiza dados de uma encomenda (somente admins podem realizar);
- DELETE /order/:id - Remove uma encomenda (somente admins podem realizar);
