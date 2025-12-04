# ⌚Ponto Fácil – Frontend

## Visão geral do projeto

Interface web do sistema Ponto Fácil, responsável pelo registro e acompanhamento de ponto dos funcionários.  
O frontend consome a API .NET (TimeRecord) para autenticação, cadastro de colaboradores e gerenciamento das marcações de ponto.

## Tecnologias

- Next.js (React, App Router)
- TypeScript
- NextAuth (autenticação)
- Axios
- Tailwind CSS
- Docker
- Git

## Funcionalidades principais

- Autenticação de usuários com NextAuth (fluxo de login protegido).
- Painel do colaborador com dados pessoais (nome, cargo, etc.).
- Tela de registro de ponto (bater ponto) integrada ao backend.
- Página de histórico de marcações de ponto por dia.
- Rotas privadas sob `/home` (dashboard, registro, histórico).

## Links importantes

- Repositório Back-end : https://github.com/DeveloperNatan/TimeRecord
- Deploy (Vercel): https://ponto-facil-gilt.vercel.app
