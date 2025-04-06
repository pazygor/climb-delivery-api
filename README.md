<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<h1 align="center">Monitoring SVS API</h1>

<p align="center">
  API desenvolvida em <strong>NestJS</strong> para o sistema <strong>SVS Monitoring</strong>, responsável por prover endpoints e lógica de backend para funcionalidades de monitoramento e automações.
</p>

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- TypeScript
- Node.js
- npm
- (adicione aqui outras tecnologias como PostgreSQL, MongoDB, Redis, etc, se necessário)

---

## 📁 Estrutura do Projeto

monitoring-svs-api/ ├── src/ │ ├── modules/ │ ├── common/ │ ├── main.ts ├── test/ ├── package.json ├── tsconfig.json └── README.md

yaml
Copiar
Editar

---

## 🛠️ Como rodar o projeto

```bash
# Clonar o repositório
git clone https://github.com/pazygor/monitoring-svs-api.git

# Acessar a pasta do projeto
cd monitoring-svs-api

# Instalar as dependências
npm install

# Rodar em modo desenvolvimento
npm run start:dev

# Rodar em modo produção
npm run start:prod
🧪 Rodar testes
bash
Copiar
Editar
# Testes unitários
npm run test

# Testes end-to-end
npm run test:e2e

# Cobertura de testes
npm run test:cov
🔒 Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto com as seguintes variáveis (exemplo):

ini
Copiar
Editar
PORT=3000
DATABASE_URL=sua_string_de_conexao
# outras variáveis necessárias para funcionamento
🧭 Objetivo do Projeto
A monitoring-svs-api é uma API backend que fornece recursos essenciais para o SVS Monitoring, um sistema focado em automação de tarefas, integração com fontes externas e monitoramento inteligente de dados operacionais.

📌 Status do Projeto
🚧 Em desenvolvimento 🚧

🧑‍💻 Autor
Ygor Paz – GitHub | pazygor080@gmail.com

📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais informações.