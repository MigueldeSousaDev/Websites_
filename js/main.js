/**
 * Funcionalidades:
 * 1. Toast "Adicionar à lista de interesses"
 * 2. Filtro de cursos (campo local + barra do cabeçalho)
 * 3. NavBar > Pesquisa
 * 4. Validação do formulário de contacto
 */

document.addEventListener('DOMContentLoaded', function() {

    // =====================================================================
    // 1. TOAST (NOTIFICAÇÃO)
    // =====================================================================
    let toastTrigger = document.getElementById('liveToastBtn');
    let toastLiveExample = document.getElementById('liveToastFeedback');

    if (toastTrigger && toastLiveExample) {
        let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

        toastTrigger.addEventListener('click', function(evento) {
            evento.preventDefault();

            let nomeCurso = toastTrigger.getAttribute('data-curso') || 'Curso';
            let toastBody = toastLiveExample.querySelector('.toast-body');
            if (toastBody) {
                toastBody.textContent = '"' + nomeCurso + '" foi adicionado à sua lista de interesses!';
            }

            toastBootstrap.show();
        });
    }

    // =====================================================================
    // 2. FILTRO DE CURSOS (PÁGINA cursos.html)
    //    - Campo #filtroCursos
    //    - Função partilhada com a barra do cabeçalho
    // =====================================================================

    // Elementos que podem não existir em todas as páginas
    let inputFiltro = document.getElementById('filtroCursos');
    let todosCards = document.querySelectorAll('.card-curso');

    // Função que executa a filtragem
    function fazerFiltro() {
        if (!inputFiltro) return;

        let termo = inputFiltro.value.toLowerCase().trim();

        for (let i = 0; i < todosCards.length; i++) {
            let cardAtual = todosCards[i];
            let categoria = cardAtual.getAttribute('data-categoria') || '';
            let tituloEl = cardAtual.querySelector('.card-title');
            let titulo = tituloEl ? tituloEl.textContent.toLowerCase() : '';
            let textoCompleto = categoria + ' ' + titulo;
            let coluna = cardAtual.closest('.col-12');

            if (coluna) {
                if (textoCompleto.includes(termo)) {
                    coluna.style.display = '';
                } else {
                    coluna.style.display = 'none';
                }
            }
        }
    }

    // Só configura os eventos se o campo de filtro existir (página cursos.html)
    if (inputFiltro && todosCards.length > 0) {

        // Filtra enquanto o utilizador escreve
        inputFiltro.addEventListener('input', fazerFiltro);

        // Botão "Mostrar resultados"
        let btnMostrar = document.getElementById('mostrarTodos');
        if (btnMostrar) {
            btnMostrar.addEventListener('click', function() {
                inputFiltro.value = '';
                for (let i = 0; i < todosCards.length; i++) {
                    let coluna = todosCards[i].closest('.col-12');
                    if (coluna) coluna.style.display = '';
                }
            });
        }

        // Verifica se a URL já traz um filtro (?filtro=pintura)
        let enderecoAtual = window.location.search;
        if (enderecoAtual.includes('filtro=')) {
            let partesUrl = enderecoAtual.split('filtro=')[1];
            if (partesUrl) {
                let termoUrl = decodeURIComponent(partesUrl.split('&')[0]);
                inputFiltro.value = termoUrl;
                fazerFiltro();
            }
        }
    }

    // =====================================================================
    // 3. BARRA DE PESQUISA DO CABEÇALHO (presente em todas as páginas)
    // =====================================================================
    let formPesquisa = document.getElementById('formPesquisa');

    if (formPesquisa) {
        formPesquisa.addEventListener('submit', function(evento) {
            evento.preventDefault();

            let input = formPesquisa.querySelector('input[type="search"]');
            if (!input) return;

            let termo = input.value.trim();
            if (!termo) return;

            let estaNaPaginaCursos = window.location.pathname.includes('cursos.html');

            if (estaNaPaginaCursos) {
                // Já está em cursos.html: aplica o filtro
                if (inputFiltro) {                  // inputFiltro está definido no topo
                    inputFiltro.value = termo;
                    fazerFiltro();                  // função existe e é a mesma do filtro
                }
            } else {
                // Redireciona para cursos.html com o filtro na URL
                window.location.href = 'cursos.html?filtro=' + encodeURIComponent(termo);
            }
        });
    }

    // =====================================================================
    // 4. VALIDAÇÃO DO FORMULÁRIO DE CONTACTO
    // =====================================================================
    let formContacto = document.getElementById('formContacto');

    if (formContacto) {
        formContacto.addEventListener('submit', function(evento) {
            evento.preventDefault();

            let valido = true;
            let mensagemErro = '';

            let nome = document.getElementById('nome')?.value.trim() || '';
            let email = document.getElementById('email')?.value.trim() || '';
            let assunto = document.getElementById('assunto')?.value || '';
            let mensagem = document.getElementById('mensagem')?.value.trim() || '';
            let telefone = document.getElementById('telefone')?.value.trim() || '';

            // Nome
            let nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;
            if (!nomeRegex.test(nome)) {
                valido = false;
                mensagemErro += '• O nome deve ter pelo menos 3 caracteres e conter apenas letras.\n';
            }

            // Email
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                valido = false;
                mensagemErro += '• Insira um endereço de email válido.\n';
            }

            // Assunto
            if (!assunto) {
                valido = false;
                mensagemErro += '• Selecione um assunto.\n';
            }

            // Mensagem
            if (mensagem.length < 10) {
                valido = false;
                mensagemErro += '• A mensagem deve ter pelo menos 10 caracteres.\n';
            }

            // Telefone (opcional)
            if (telefone !== '') {
                if (telefone.length !== 9 || (telefone[0] !== '2' && telefone[0] !== '9')) {
                    valido = false;
                    mensagemErro += '• O telefone deve começar por 2 ou 9 e ter 9 dígitos.\n';
                } else {
                    let digitos = '0123456789';
                    for (let i = 0; i < telefone.length; i++) {
                        if (!digitos.includes(telefone[i])) {
                            valido = false;
                            mensagemErro += '• O telefone deve conter apenas números.\n';
                            break;
                        }
                    }
                }
            }

            let erroDiv = document.getElementById('erroFormulario');
            let sucessoDiv = document.getElementById('sucessoFormulario');
            if (erroDiv) erroDiv.style.display = 'none';
            if (sucessoDiv) sucessoDiv.style.display = 'none';

            if (!valido) {
                if (erroDiv) {
                    erroDiv.textContent = mensagemErro;
                    erroDiv.style.display = 'block';
                }
            } else {
                if (sucessoDiv) {
                    sucessoDiv.textContent = '✓ Mensagem enviada com sucesso!';
                    sucessoDiv.style.display = 'block';
                }
                formContacto.reset();
            }
        });
    }

    // =====================================================================
    // Inicializar todos os toasts visíveis (caso existam)
    // =====================================================================
    let todosToasts = document.querySelectorAll('.toast');
    for (let i = 0; i < todosToasts.length; i++) {
        new bootstrap.Toast(todosToasts[i]);
    }
});