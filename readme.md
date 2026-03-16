# Whatchu Thinkin? - Sistema de Gestão de Usuários e Feed

Esta é uma aplicação Full Stack de um Fórum Simples inspirado no Twitter. O sistema apresenta autenticação segura, áreas protegidas, gestão de perfil e um painel exclusivo para administradores moderarem o conteúdo.

# Tecnologias utilizadas:
Frontend: React
Backend: Node.js, Express
Banco de Dados: SQLite
Segurança: JWT e bcryptjs

# Manual de configuração do projeto

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Configurando o servidor Backend
1. Abra o seu terminal e navegue até a pasta /backend. 
2. Insstale as dependências executando o seguinte comando em seu terminal:
\`npm install express cors bcryptjs jsonwebtoken sqlite3\`
3. Para iniciar o servidorr, agora basta executar:
\`node src/server.js\`


*(O servidor rodará na porta 5000 e o arquivo `banco.db` será criado automaticamente pelo SQLite na primeira execução).*

### Configurando o Frontend(React)
1. Abra um novo terminal e navegue até a pasta /frontend.
2. Instale as dependencias do react com os seguintes comandos:


\`npm install\`


\`npm install react-router-dom\`
3. Inicie a aplicação:
\`npm start\`

### Credenciais de Administrador
Para fins de teste com os poderes de administrador, basta criar uma conta com o seguinte email:
* admin@admin.com


O própio sistema reconhece e concede o acesso de administrador.
