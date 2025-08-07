// Utilitários para formatação e validação

/**
 * Formatar número para moeda brasileira
 * @param {number} valor - Valor a ser formatado
 * @returns {string} - Valor formatado como R$ 1.234,56
 */
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

/**
 * Converter string de moeda para número
 * @param {string} valor - Valor em formato de moeda
 * @returns {number} - Valor numérico
 */
function parseMoeda(valor) {
    if (!valor) return 0;
    
    // Remove todos os caracteres não numéricos exceto vírgula e ponto
    let numeroLimpo = valor.replace(/[^\d,.-]/g, '');
    
    // Se contém vírgula, trata como separador decimal brasileiro
    if (numeroLimpo.includes(',')) {
        // Se tem ponto e vírgula, ponto é separador de milhares
        if (numeroLimpo.includes('.') && numeroLimpo.includes(',')) {
            numeroLimpo = numeroLimpo.replace(/\./g, '').replace(',', '.');
        } else {
            // Se só tem vírgula, pode ser decimal ou milhares
            const partes = numeroLimpo.split(',');
            if (partes.length === 2 && partes[1].length <= 2) {
                // É decimal (ex: 1.000,50)
                numeroLimpo = numeroLimpo.replace(',', '.');
            } else {
                // É separador de milhares (ex: 100,000)
                numeroLimpo = numeroLimpo.replace(',', '');
            }
        }
    }
    
    return parseFloat(numeroLimpo) || 0;
}

/**
 * Aplicar máscara de moeda em input
 * @param {HTMLInputElement} input - Input a ser mascarado
 */
function aplicarMascaraMoeda(input) {
    input.addEventListener('input', function(e) {
        let valor = e.target.value;
        
        // Remove tudo que não é dígito
        valor = valor.replace(/\D/g, '');
        
        // Se valor está vazio, mantem vazio
        if (!valor) {
            e.target.value = '';
            return;
        }
        
        // Converte para número e divide por 100 para ter centavos
        valor = (parseInt(valor) || 0) / 100;
        
        // Formata como moeda sem o símbolo R$
        const valorFormatado = valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        e.target.value = valorFormatado;
    });

    // Evento blur para garantir formatação correta
    input.addEventListener('blur', function(e) {
        const valor = parseMoeda(e.target.value);
        if (valor > 0) {
            e.target.value = valor.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    });
}

/**
 * Validar campos obrigatórios
 * @param {Object} dados - Dados a serem validados
 * @returns {Object} - { valido: boolean, erros: string[] }
 */
function validarDados(dados) {
    const erros = [];
    
    // Validar valor do imóvel
    if (!dados.valor_imovel || dados.valor_imovel <= 0) {
        erros.push('Valor do imóvel deve ser maior que zero');
    } else if (dados.valor_imovel < 50000) {
        erros.push('Valor do imóvel deve ser no mínimo R$ 50.000,00');
    }
    
    // Validar percentual de entrada
    if (!dados.percentual_entrada || dados.percentual_entrada < 5 || dados.percentual_entrada > 20) {
        erros.push('Percentual de entrada deve estar entre 5% e 20%');
    }
    
    // Validar anos de contrato
    if (!dados.anos_contrato || dados.anos_contrato < 1 || dados.anos_contrato > 5) {
        erros.push('Anos de contrato deve estar entre 1 e 5 anos');
    }
    
    return {
        valido: erros.length === 0,
        erros
    };
}

/**
 * Mostrar elemento com animação
 * @param {HTMLElement} elemento - Elemento a ser mostrado
 */
function mostrarElemento(elemento) {
    elemento.style.display = 'block';
    elemento.classList.add('fade-in');
    
    // Remove a classe após a animação
    setTimeout(() => {
        elemento.classList.remove('fade-in');
    }, 300);
}

/**
 * Esconder elemento
 * @param {HTMLElement} elemento - Elemento a ser escondido
 */
function esconderElemento(elemento) {
    elemento.style.display = 'none';
}

/**
 * Mostrar loading no botão
 * @param {HTMLButtonElement} botao - Botão a mostrar loading
 */
function mostrarLoading(botao) {
    const textoOriginal = botao.querySelector('.btn-text');
    const loading = botao.querySelector('.btn-loading');
    
    textoOriginal.style.display = 'none';
    loading.style.display = 'flex';
    botao.disabled = true;
}

/**
 * Esconder loading no botão
 * @param {HTMLButtonElement} botao - Botão a esconder loading
 */
function esconderLoading(botao) {
    const textoOriginal = botao.querySelector('.btn-text');
    const loading = botao.querySelector('.btn-loading');
    
    textoOriginal.style.display = 'block';
    loading.style.display = 'none';
    botao.disabled = false;
}

/**
 * Mostrar notificação toast
 * @param {string} mensagem - Mensagem a ser exibida
 * @param {string} tipo - Tipo da notificação ('success', 'error', 'warning')
 */
function mostrarToast(mensagem, tipo = 'success') {
    // Remove toast existente se houver
    const toastExistente = document.querySelector('.toast');
    if (toastExistente) {
        toastExistente.remove();
    }
    
    // Cria novo toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensagem;
    
    // Adiciona estilos CSS dinamicamente
    const estilos = `
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            font-size: 14px;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        }
        
        .toast-success {
            background-color: #10b981;
        }
        
        .toast-error {
            background-color: #ef4444;
        }
        
        .toast-warning {
            background-color: #f59e0b;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    // Adiciona estilos se ainda não existem
    if (!document.querySelector('#toast-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'toast-styles';
        styleSheet.textContent = estilos;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(toast);
    
    // Remove toast após 3 segundos
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

/**
 * Gerar PDF com resultado da simulação
 * @param {Object} resultado - Resultado da simulação
 */
async function gerarPDF(resultado) {
    try {
        // Verificar se jsPDF está disponível
        if (typeof window.jspdf === 'undefined') {
            throw new Error('Biblioteca jsPDF não carregada');
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configurações
        const margemEsquerda = 20;
        const margemTopo = 20;
        let posicaoY = margemTopo;
        
        // Função auxiliar para adicionar texto
        const adicionarTexto = (texto, x, y, opcoes = {}) => {
            if (opcoes.cor && Array.isArray(opcoes.cor)) {
                doc.setTextColor(opcoes.cor[0], opcoes.cor[1], opcoes.cor[2]);
            } else {
                doc.setTextColor(31, 41, 55); // Cor padrão
            }
            doc.setFontSize(opcoes.tamanho || 12);
            doc.setFont('helvetica', opcoes.peso || 'normal');
            doc.text(texto, x, y);
        };
        
        // Função auxiliar para adicionar retângulo colorido
        const adicionarRetangulo = (x, y, width, height, cor) => {
            doc.setFillColor(cor[0], cor[1], cor[2]);
            doc.rect(x, y, width, height, 'F');
        };
        
        // Header com logo da empresa
        adicionarRetangulo(margemEsquerda, posicaoY, 170, 35, [139, 92, 246]);
        
        // Logo texto - centralizado verticalmente no retângulo
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');
        doc.text('aMORA', margemEsquerda + 15, posicaoY + 23);
        
        // Texto descritivo - alinhado à direita do logo
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Financiamento Imobiliário Descomplicado', margemEsquerda + 85, posicaoY + 23);
        
        posicaoY += 55;
        
        // Título do documento - centralizado
        const tituloDocumento = 'SIMULAÇÃO DE FINANCIAMENTO IMOBILIÁRIO';
        doc.setTextColor(139, 92, 246);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        const larguraTitulo = doc.getTextWidth(tituloDocumento);
        const posicaoXTitulo = margemEsquerda + (170 - larguraTitulo) / 2;
        doc.text(tituloDocumento, posicaoXTitulo, posicaoY);
        
        posicaoY += 20;
        
        // Data e hora
        const agora = new Date();
        const dataFormatada = agora.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        adicionarTexto(`Gerado em: ${dataFormatada}`, margemEsquerda, posicaoY, {
            tamanho: 10,
            cor: [55, 65, 81]
        });
        
        posicaoY += 30;
        
        // Seção de dados da simulação
        adicionarTexto('DADOS DA SIMULAÇÃO', margemEsquerda, posicaoY, {
            tamanho: 14,
            peso: 'bold',
            cor: [139, 92, 246]
        });
        
        posicaoY += 15;
        
        // Linha separadora
        doc.setDrawColor(139, 92, 246);
        doc.setLineWidth(0.5);
        doc.line(margemEsquerda, posicaoY, 190, posicaoY);
        
        posicaoY += 15;
        
        // Dados da simulação com melhor alinhamento
        const dadosSimulacao = [
            ['Valor do Imóvel:', resultado.formatted.valor_imovel],
            ['Percentual de Entrada:', `${resultado.percentual_entrada}%`],
            ['Valor da Entrada:', resultado.formatted.valor_entrada],
            ['Prazo do Contrato:', `${resultado.anos_contrato} ${resultado.anos_contrato === 1 ? 'ano' : 'anos'}`]
        ];
        
        dadosSimulacao.forEach(([label, valor]) => {
            adicionarTexto(label, margemEsquerda, posicaoY, { peso: 'bold', tamanho: 11 });
            adicionarTexto(valor, margemEsquerda + 80, posicaoY, { tamanho: 11 });
            posicaoY += 14;
        });
        
        posicaoY += 20;
        
        // Seção de resultados
        adicionarTexto('RESULTADOS DA SIMULAÇÃO', margemEsquerda, posicaoY, {
            tamanho: 14,
            peso: 'bold',
            cor: [139, 92, 246]
        });
        
        posicaoY += 15;
        doc.line(margemEsquerda, posicaoY, 190, posicaoY);
        posicaoY += 20;
        
        // Resultado principal destacado
        adicionarRetangulo(margemEsquerda, posicaoY - 5, 170, 30, [248, 250, 252]);
        
        // Texto e valor alinhados
        adicionarTexto('PARCELA MENSAL A GUARDAR:', margemEsquerda + 8, posicaoY + 0, {
            peso: 'bold',
            tamanho: 12,
            cor: [139, 92, 246]
        });
        
        // Valor alinhado à direita
        const valorParcela = resultado.formatted.parcela_mensal;
        doc.setTextColor(139, 92, 246);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        const larguraValor = doc.getTextWidth(valorParcela);
        doc.text(valorParcela, margemEsquerda + 170 - larguraValor - 8, posicaoY + 0);
        
        posicaoY += 45;
        
        // Outros resultados com melhor alinhamento
        const resultados = [
            ['Valor a ser Financiado:', resultado.formatted.valor_financiado],
            ['Total a Guardar (20%):', resultado.formatted.total_a_guardar],
            ['Período do Contrato:', `${resultado.meses_contrato} meses`]
        ];
        
        resultados.forEach(([label, valor]) => {
            adicionarTexto(label, margemEsquerda, posicaoY, { peso: 'bold', tamanho: 11 });
            adicionarTexto(valor, margemEsquerda + 80, posicaoY, { tamanho: 11 });
            posicaoY += 14;
        });
        
        posicaoY += 30;
        
        // Seção explicativa
        adicionarTexto('COMO FUNCIONA', margemEsquerda, posicaoY, {
            tamanho: 14,
            peso: 'bold',
            cor: [139, 92, 246]
        });
        
        posicaoY += 15;
        doc.line(margemEsquerda, posicaoY, 190, posicaoY);
        posicaoY += 15;
        
        const explicacao = [
            '1. Você paga a entrada inicial de ' + resultado.formatted.valor_entrada + ' para morar no imóvel.',
            '2. Durante ' + resultado.anos_contrato + ' ' + (resultado.anos_contrato === 1 ? 'ano' : 'anos') + ', você guarda ' + resultado.formatted.parcela_mensal + ' por mês.',
            '3. Ao final do período, você terá guardado ' + resultado.formatted.total_a_guardar + ' (20% do valor).',
            '4. Com os 20% completos, você pode financiar os 80% restantes pelo banco.',
            '5. O imóvel será 100% seu, com financiamento tradicional aprovado.'
        ];
        
        explicacao.forEach(texto => {
            const linhas = doc.splitTextToSize(texto, 170);
            linhas.forEach(linha => {
                adicionarTexto(linha, margemEsquerda, posicaoY, { tamanho: 10 });
                posicaoY += 8;
            });
            posicaoY += 5;
        });
        
        // Footer
        posicaoY = 275;
        adicionarRetangulo(margemEsquerda, posicaoY, 170, 25, [139, 92, 246]);
        
        // Texto do footer centralizado
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        const textoFooter = 'aMORA - Transformando sonhos em realidade imobiliária';
        const larguraTexto = doc.getTextWidth(textoFooter);
        const posicaoXCentralizada = margemEsquerda + (170 - larguraTexto) / 2;
        doc.text(textoFooter, posicaoXCentralizada, posicaoY + 16);
        
        // Gerar nome do arquivo
        const nomeArquivo = `amora-simulacao-${Date.now()}.pdf`;
        
        // Salvar PDF
        doc.save(nomeArquivo);
        
        return true;
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        throw error;
    }
}

/**
 * Salvar resultado da simulação no localStorage
 * @param {Object} resultado - Resultado da simulação
 */
function salvarResultado(resultado) {
    try {
        const historico = JSON.parse(localStorage.getItem('amora_simulacoes') || '[]');
        
        const novaSimulacao = {
            ...resultado,
            timestamp: new Date().toISOString(),
            id: Date.now()
        };
        
        historico.unshift(novaSimulacao);
        
        // Manter apenas as últimas 10 simulações
        if (historico.length > 10) {
            historico.splice(10);
        }
        
        localStorage.setItem('amora_simulacoes', JSON.stringify(historico));
        return true;
    } catch (error) {
        console.error('Erro ao salvar resultado:', error);
        return false;
    }
}

/**
 * Obter histórico de simulações
 * @returns {Array} - Array com as simulações salvas
 */
function obterHistorico() {
    try {
        return JSON.parse(localStorage.getItem('amora_simulacoes') || '[]');
    } catch (error) {
        console.error('Erro ao obter histórico:', error);
        return [];
    }
}

/**
 * Debounce function para evitar chamadas excessivas
 * @param {Function} func - Função a ser executada
 * @param {number} delay - Delay em milissegundos
 * @returns {Function} - Função com debounce aplicado
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Animação de entrada para elementos
 * @param {HTMLElement} elemento - Elemento a ser animado
 * @param {string} animacao - Tipo de animação ('fadeIn', 'slideUp', 'slideDown')
 */
function animarEntrada(elemento, animacao = 'fadeIn') {
    const animacoes = {
        fadeIn: 'opacity: 0; transform: scale(0.95);',
        slideUp: 'opacity: 0; transform: translateY(20px);',
        slideDown: 'opacity: 0; transform: translateY(-20px);'
    };
    
    elemento.style.cssText = animacoes[animacao] + 'transition: all 0.3s ease;';
    
    requestAnimationFrame(() => {
        elemento.style.opacity = '1';
        elemento.style.transform = 'none';
    });
}

/**
 * Scroll suave para elemento
 * @param {HTMLElement|string} elemento - Elemento ou seletor
 */
function scrollPara(elemento) {
    const target = typeof elemento === 'string' ? document.querySelector(elemento) : elemento;
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Validar formato de email
 * @param {string} email - Email a ser validado
 * @returns {boolean} - True se válido
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Formatar número com separadores
 * @param {number} numero - Número a ser formatado
 * @returns {string} - Número formatado
 */
function formatarNumero(numero) {
    return numero.toLocaleString('pt-BR');
}

/**
 * Calcular porcentagem
 * @param {number} valor - Valor base
 * @param {number} porcentagem - Porcentagem a ser calculada
 * @returns {number} - Resultado do cálculo
 */
function calcularPorcentagem(valor, porcentagem) {
    return (valor * porcentagem) / 100;
}

/**
 * Verificar se dispositivo é mobile
 * @returns {boolean} - True se for mobile
 */
function isMobile() {
    return window.innerWidth <= 768;
}

/**
 * Criar efeito de confete para celebração
 */
function mostrarConfete() {
    // Criar confetes animados
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            criarConfete();
        }, i * 50);
    }
}

function criarConfete() {
    const confete = document.createElement('div');
    confete.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${['#0066ff', '#ff6b35', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)]};
        top: -10px;
        left: ${Math.random() * window.innerWidth}px;
        z-index: 1000;
        pointer-events: none;
        animation: confeteFall 3s linear forwards;
    `;
    
    document.body.appendChild(confete);
    
    setTimeout(() => {
        confete.remove();
    }, 3000);
}

// Adicionar CSS para animação de confete
const confeteStyles = `
    @keyframes confeteFall {
        to {
            transform: translateY(${window.innerHeight + 10}px) rotate(360deg);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = confeteStyles;
document.head.appendChild(styleSheet);
