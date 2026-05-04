/**
 * Funcionalidades implementadas:
 * 1. Filtro de cursos por categoria (presente na página cursos.html)
 * 2. Simulação de carrinho com Toast (presente na index.html e cursos.html)
 * 3. Validação avançada do formulário de contacto (presente na contacto.html)
 */


/* Carrega todo o código */
document.addEventListener('DOMContentLoaded', function() {

/* ---- 1. SIMULAÇÃO DE CARRINHO COM TOAST --- */
// Inicializa o comportamento do Toast do Bootstrap


    
    // --- Toast: Configuração inicial ---

    /*Declarar variáveis e ir buscar o conteúdo do html - id = " conteúdo" para as variáveis no Javascript */
    
    let toastTrigger = document.getElementById('liveToastBtn');
    let toastLiveExample = document.getElementById('liveToast');
    
    if (toastTrigger && toastLiveExample) {
        let toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        
        /* Ao "listen" > clicar no evento, o botão invoca função que impede de recarregar a página*/
        toastTrigger.addEventListener('click', function(evento) {
            evento.preventDefault();
            
            // Obtém o nome do curso a partir do atributo HTML "data-curso="Desenho" " senão salta para "Curso"
            let nomeCurso = toastTrigger.getAttribute('data-curso') || 'Curso';
            
            // Atualiza o corpo do toast com o nome do curso
            let toastBody = toastLiveExample.querySelector('.toast-body');
            if (toastBody) {
                toastBody.textContent = `"${nomeCurso}" foi adicionado à sua lista de interesses!`;
            }
            
            toastBootstrap.show();
        });
    }

    /* ----  2. FILTRO DE CURSOS POR CATEGORIA ----> (Página cursos.html) ----*/
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
                // já estamos em cursos.html: aplicar filtro diretamente
                if (inputFiltro) {
                    inputFiltro.value = termo;
                    if (typeof fazerFiltro === 'function') {
                        fazerFiltro();
                    }
                }
            } else {
                // redirecionar para cursos.html com o termo
                window.location.href = 'cursos.html?filtro=' + encodeURIComponent(termo);
            }
        });
    }

    // Inicializar toasts adicionais (se houver)
    let todosToasts = document.querySelectorAll('.toast');
    for (let i = 0; i < todosToasts.length; i++) {
        new bootstrap.Toast(todosToasts[i]);
    }

    /* ----- 3. VALIDAÇÃO AVANÇADA DO FORMULÁRIO DE CONTACTO ---> (Página contacto.html) ----- */
    let formContacto = document.getElementById('formContacto');
    
    if (formContacto) {
        formContacto.addEventListener('submit', function(evento) {
            evento.preventDefault(); // impede envio padrão
            
            let valido = true;
            let mensagemErro = '';
            
            // Obtém os valores dos campos
            let nome = document.getElementById('nome')?.value.trim() || '';
            let email = document.getElementById('email')?.value.trim() || '';
            let assunto = document.getElementById('assunto')?.value || '';
            let mensagem = document.getElementById('mensagem')?.value.trim() || '';
            let telefone = document.getElementById('telefone')?.value.trim() || '';
            
            // 1. Validação do nome (mínimo 3 caracteres, só letras e espaços)
            let nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;
            if (!nomeRegex.test(nome)) {
                valido = false;
                mensagemErro += '• O nome deve ter pelo menos 3 caracteres e conter apenas letras.\n';
            }
            
            // 2. Validação do email (formato básico)
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                valido = false;
                mensagemErro += '• Insira um endereço de email válido.\n';
            }
            
            // 3. Assunto obrigatório
            if (!assunto) {
                valido = false;
                mensagemErro += '• Selecione um assunto.\n';
            }
            
            // 4. Mensagem com mínimo de 10 caracteres
            if (mensagem.length < 10) {
                valido = false;
                mensagemErro += '• A mensagem deve ter pelo menos 10 caracteres.\n';
            }
            
            // 5. Telefone (opcional, mas se preenchido deve ter 9 dígitos)
            if (telefone !== '') {                            // se foi preenchido (opcional)
             let telefoneValido = true;

             // 1. Verificar comprimento exato de 9 caracteres
                if (telefone.length !== 9) {
                 telefoneValido = false;
                } else {

                // 2. Verificar se começa por 2 ou 9

             let primeiro = telefone[0];
              if (primeiro !== '2' && primeiro !== '9') {
            telefoneValido = false;
                } else { 
                    
                    // 3. Verificar se todos os caracteres são dígitos

                let digitos = '0123456789';
                for (let i = 0; i < telefone.length; i++) {
                if (!digitos.includes(telefone[i])) {
                    telefoneValido = false;
                    break;
                }
            }
        }
    }
}
            
            // Feedback ao utilizador
            let erroDiv = document.getElementById('erroFormulario');
            let sucessoDiv = document.getElementById('sucessoFormulario');
            
            // Limpa mensagens anteriores
            if (erroDiv) erroDiv.style.display = 'none';
            if (sucessoDiv) sucessoDiv.style.display = 'none';
            
            if (!valido) {
                // Mostra erros
                if (erroDiv) {
                    erroDiv.textContent = mensagemErro;
                    erroDiv.style.display = 'block';
                } else {
                    alert(mensagemErro);
                }
            } else {
                // Sucesso: mostra mensagem e limpa formulário
                if (sucessoDiv) {
                    sucessoDiv.textContent = '✓ Mensagem enviada com sucesso! Entraremos em contacto brevemente.';
                    sucessoDiv.style.display = 'block';
                } else {
                    alert('Mensagem enviada com sucesso!');
                }
                formContacto.reset();
            }
        });
    }

    /* ------ INICIALIZAÇÃO DE TODOS OS TOASTS DA PÁGINA  ----- > (Botões genéricos com data-bs-toggle="toast") ------*/
    let toastElList = document.querySelectorAll('.toast');
    toastElList.forEach(function(toastEl) {
        new bootstrap.Toast(toastEl, {
            autohide: true,
            delay: 3000
        });
    });


    

    

});

