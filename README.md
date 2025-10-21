🔐 Auth API - Sistema de Autenticação
API RESTful de autenticação construída com Express.js, TypeScript, MongoDB e JWT.

📋 Índice
Sobre o Projeto
Funcionalidades
Tecnologias
Pré-requisitos
Instalação
Configuração
Uso
Endpoints da API
Estrutura do Projeto
Validações
Segurança
Scripts Disponíveis
Variáveis de Ambiente
Testes
Contribuição
Licença
🎯 Sobre o Projeto
API de autenticação robusta e escalável que fornece endpoints para registro, login e gerenciamento de perfis de usuários. Implementa as melhores práticas de segurança com criptografia de senhas, tokens JWT e validação de dados.

Características Principais:
✅ Autenticação baseada em JWT
✅ Criptografia de senhas com Bcrypt
✅ Validação completa de dados
✅ Timestamps automáticos (createdAt, updatedAt)
✅ Middleware de proteção de rotas
✅ Tratamento de erros robusto
✅ CORS habilitado
✅ TypeScript para type safety
🚀 Funcionalidades
Registro de Usuários: Criação de novas contas com validação completa
Login Seguro: Autenticação com email e senha
Perfil Protegido: Acesso a informações do usuário autenticado
Validação de Dados: Validação em tempo real de todos os campos
Gerenciamento de Tokens: JWT com expiração configurável
Proteção de Rotas: Middleware para endpoints protegidos
🛠️ Tecnologias
Este projeto foi desenvolvido com as seguintes tecnologias:

Node.js - Runtime JavaScript
Express.js - Framework web minimalista
TypeScript - Superset tipado de JavaScript
MongoDB - Banco de dados NoSQL
Mongoose - ODM para MongoDB
JWT - JSON Web Tokens para autenticação
Bcrypt - Hashing de senhas
Dotenv - Gerenciamento de variáveis de ambiente
CORS - Middleware para CORS
📦 Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:

Node.js (versão 14 ou superior)
MongoDB (local ou Atlas)
MongoDB Compass (opcional, para visualização)
Git (para clonar o repositório)
Ferramentas recomendadas:

Postman ou Insomnia (para testar a API)
VSCode (editor de código)
⚙️ Instalação
1. Clone o repositório
bash
git clone (https://github.com/Adilson2k/User-Autentication-API.git)
cd User-Autentication-API
2. Instale as dependências
bash
npm install
3. Configure as variáveis de ambiente
Crie um arquivo .env na raiz do projeto:

bash
cp .env.example .env
Edite o arquivo .env com suas configurações:

env
PORT=3000
MONGO_URI=mongodb://localhost:27017/auth_db
JWT_SECRET=sua_chave_secreta_super_segura_aqui_123456
JWT_EXPIRE=7d
NODE_ENV=development
4. Inicie o MongoDB
Local:

bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
MongoDB Atlas:

Crie uma conta em MongoDB Atlas
Crie um cluster gratuito
Obtenha a connection string
Substitua MONGO_URI no .env
🚀 Uso
Modo Desenvolvimento
bash
npm run dev
O servidor iniciará em http://localhost:3000

# Iniciar servidor
npm start
Verificar se está funcionando
Acesse no navegador ou Postman:

GET http://localhost:5000
Resposta esperada:

json
{
  "message": "🚀 API de Autenticação funcionando!",
  "version": "1.0.0"
}
📡 Endpoints da API
Base URL
http://localhost:5000/api
1️⃣ Registrar Usuário
Endpoint: POST /auth/register

📁 Estrutura do Projeto
auth-api/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuração do MongoDB
│   ├── controllers/
│   │   └── authController.ts    # Lógica dos endpoints
│   ├── middleware/
│   │   └── authMiddleware.ts    # Proteção de rotas
│   ├── models/
│   │   └── User.ts              # Schema do usuário
│   ├── routes/
│   │   └── authRoutes.ts        # Definição das rotas
│   ├── types/
│   │   └── express.d.ts         # Extensão de tipos
│   ├── app.ts                   # Configuração do Express
│   └── server.ts                # Inicialização do servidor
├── .env                         # Variáveis de ambiente
├── .gitignore                   # Arquivos ignorados pelo Git
├── package.json                 # Dependências e scripts
├── tsconfig.json                # Configuração TypeScript
└── README.md                    # Documentação

📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.


GitHub: @Adilson2k
Email: adilsonsoares2k@gmail.com
📞 Suporte
Se você tiver alguma dúvida, entre em contato:

🙏 Agradecimentos
Express.js
MongoDB
Mongoose
JWT
Comunidade Open Source
📊 Status do Projeto
Mostrar Imagem
Mostrar Imagem
Mostrar Imagem
Mostrar Imagem

Versão Atual: 1.0.0

<div align="center"> <strong>⭐ Se este projeto te ajudou, considere dar uma estrela!</strong> </div>
