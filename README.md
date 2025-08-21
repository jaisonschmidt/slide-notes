
# Slide Note

Slide Note é um aplicativo web para criar, organizar e apresentar notas de apoio para apresentações de slides. Ele foi desenvolvido para ajudar palestrantes, professores e estudantes a manterem suas anotações organizadas e acessíveis durante apresentações, sem perder o foco no conteúdo.

## Objetivo
O objetivo do Slide Note é proporcionar uma experiência simples, bonita e eficiente para gerenciar notas de apresentação, permitindo que o usuário:
- Crie múltiplas apresentações, cada uma com seus próprios slides/notes.
- Edite, exclua e organize suas apresentações de forma intuitiva.
- Utilize um modo de apresentação limpo, sem distrações, para acompanhar as notas enquanto apresenta.
- Tenha uma interface responsiva, com suporte a temas claro e escuro.
- Tenha seus dados salvos localmente (localStorage), sem necessidade de cadastro ou backend.

## Funcionalidades
- **Gerenciamento de apresentações**: crie, edite, exclua e navegue entre diferentes apresentações.
- **Editor de slides**: adicione, edite e remova notas para cada slide de uma apresentação.
- **Modo apresentação**: visualize suas notas em tela cheia, com navegação fácil entre slides.
- **Confirmação de exclusão**: modal de confirmação para evitar exclusão acidental de apresentações.
- **Tema claro/escuro**: alterne entre temas com um clique, com preferência salva.
- **Interface moderna**: design responsivo, bonito e acessível, feito com React + Vite + Tailwind CSS.
- **Persistência local**: todas as informações ficam salvas no navegador do usuário.

## Tecnologias Utilizadas
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Como rodar o projeto
1. **Clone o repositório:**
	```bash
	git clone https://github.com/jaisonschmidt/slide-notes.git
	cd slide-notes/project
	```
2. **Instale as dependências:**
	```bash
	npm install
	```
3. **Inicie o servidor de desenvolvimento:**
	```bash
	npm run dev
	```
4. **Acesse no navegador:**
	Abra `http://localhost:5173` (ou a porta indicada no terminal).

## Estrutura do Projeto
- `src/App.jsx` — Componente principal, navegação e lógica de estado.
- `src/Editor.jsx` — Editor de slides/notas.
- `src/Presentation.jsx` — Modo de apresentação das notas.
- `src/ThemeToggle.jsx` — Alternância de tema claro/escuro.
- `public/slide-note-logo.svg` — Logomarca do projeto.

## Boas práticas adotadas
- Código limpo, modular e comentado.
- Componentes funcionais e hooks do React.
- Responsividade e acessibilidade.
- Separação clara entre lógica, apresentação e estilos.
- Uso de localStorage para persistência sem backend.

## Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

Sinta-se à vontade para contribuir, sugerir melhorias ou relatar problemas!
