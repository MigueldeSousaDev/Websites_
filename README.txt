Website institucional da FluXus, uma escola de artes plásticas situada no Porto.
Projeto desenvolvido no âmbito do Trabalho Prático da unidade de Front-End para o CESAE Digital em 2026.

## Tema escolhido
Website de empresa / escola artística (tema livre).

## Tecnologias utilizadas
- HTML5
- CSS3 (com variáveis personalizadas e media queries)
- Bootstrap 5.3.8 (grid, componentes e utilitários)
- JavaScript (ES6, manipulação do DOM, eventos, validação de formulários)
- Bootstrap Icons (CDN)
- Google Fonts (Cormorant Garamond)
- Google Maps Embeded

## Estrutura do site (5 páginas)
1. **Home** (`index.html`) – carousel de imagens, resumo da escola e destaques.
2. **Sobre** (`sobre.html`) – história, missão, visão e valores.
3. **Cursos** (`cursos.html`) – lista dinâmica com filtro por pesquisa.
4. **Detalhe do curso** (`curso-detalhe.html`) – página de detalhe com breadcrumb e accordion.
5. **Contacto** (`contacto.html`) – mapa, informações de contacto e formulário com validação.

## Funcionalidades JavaScript implementadas
1. **Filtro de cursos** – pesquisa por nome do curso ou categoria.
2. **Simulação de lista de interesses** – notificação Toast ao clicar em “Adicionar à lista de interesses”.
3. **Validação de formulário de contacto** – verificação de nome, email, assunto, mensagem e telefone opcional.
4. **Barra de pesquisa no cabeçalho** – filtra cursos em cursos.html ou redireciona para lá.

## Como executar o projeto
1. Clonar o repositório.
2. Abrir o ficheiro `index.html` num navegador (recomendado Live Server do VS Code).
   - O projeto utiliza caminhos relativos e funciona localmente.

## Limitações e ideias futuras
- O formulário não envia dados para o servidor (apenas validação no cliente).
- O filtro de cursos na página cursos.html depende de JavaScript no ficheiro `main.js`, que ainda precisa de ajustes finais (a função `fazerFiltro` não está a ser carregada corretamente).
- A página de detalhe do curso é estática (um ficheiro com todas as secções e JavaScript inline para mostrar a correta); idealmente seria dinâmica.
- Adicionar galeria de trabalhos dos alunos e mais componentes, é uma versão inicial ainda.
- Implementar sistema de dark/light mode.
- Melhorar acessibilidade (ARIA, navegação por teclado).

Miguel de Sousa
04-05-2026