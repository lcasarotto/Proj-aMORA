// Aplicação principal do simulador aMORA
class AmoraApp {
    constructor() {
        this.elementos = {};
        this.dadosSimulacao = null;
        this.resultadoAtual = null;
        
        this.init();
    }

    /**
     * Inicializar a aplicação
     */
    init() {
        this.obterElementos();
        this.configurarEventos();
        this.configurarMascaras();
        this.verificarConectividade();
        
        console.log('aMORA App inicializada com sucesso!');
    }

    /**
     * Obter referências dos elementos DOM
     */
    obterElementos() {
        this.elementos = {
            // Formulário
            form: document.getElementById('simulationForm'),
            valorImovel: document.getElementById('valorImovel'),
            percentualEntrada: document.getElementById('percentualEntrada'),
            percentualValue: document.getElementById('percentualValue'),
            anosContrato: document.getElementById('anosContrato'),
            btnSimulate: document.getElementById('btnSimulate'),

            // Containers
            resultsContainer: document.getElementById('resultsContainer'),
            errorContainer: document.getElementById('errorContainer'),

            // Resultados
            resultValorImovel: document.getElementById('resultValorImovel'),
            resultValorEntrada: document.getElementById('resultValorEntrada'),
            resultPercentualEntrada: document.getElementById('resultPercentualEntrada'),
            resultValorFinanciado: document.getElementById('resultValorFinanciado'),
            resultTotalGuardar: document.getElementById('resultTotalGuardar'),
            resultParcelaMensal: document.getElementById('resultParcelaMensal'),
            resultMesesContrato: document.getElementById('resultMesesContrato'),

            // Botões de ação
            btnNewSimulation: document.getElementById('btnNewSimulation'),
            btnSaveResult: document.getElementById('btnSaveResult'),
            btnTryAgain: document.getElementById('btnTryAgain'),

            // Erro
            errorMessage: document.getElementById('errorMessage')
        };

        // Verificar se todos os elementos foram encontrados
        const elementosNaoEncontrados = Object.entries(this.elementos)
            .filter(([key, element]) => !element)
            .map(([key]) => key);

        if (elementosNaoEncontrados.length > 0) {
            console.warn('Elementos não encontrados:', elementosNaoEncontrados);
        }
    }

    /**
     * Configurar event listeners
     */
    configurarEventos() {
        // Formulário
        this.elementos.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.realizarSimulacao();
        });

        // Range de percentual
        this.elementos.percentualEntrada.addEventListener('input', (e) => {
            this.elementos.percentualValue.textContent = `${e.target.value}%`;
        });

        // Botões de ação
        this.elementos.btnNewSimulation.addEventListener('click', () => {
            this.novaSimulacao();
        });

        this.elementos.btnSaveResult.addEventListener('click', () => {
            this.salvarResultado();
        });

        this.elementos.btnTryAgain.addEventListener('click', () => {
            this.ocultarErro();
        });

        // Monitor de conectividade
        if (window.connectivityMonitor) {
            connectivityMonitor.onStatusChange((status) => {
                this.handleConnectivityChange(status);
            });
        }
    }

    /**
     * Configurar máscaras de input
     */
    configurarMascaras() {
        aplicarMascaraMoeda(this.elementos.valorImovel);
    }

    /**
     * Verificar conectividade inicial
     */
    async verificarConectividade() {
        try {
            const status = await SimulacaoService.verificarStatus();
            if (!status.online) {
                mostrarToast('API offline. Algumas funcionalidades podem não funcionar.', 'warning');
            }
        } catch (error) {
            console.warn('Erro ao verificar conectividade:', error);
            mostrarToast('Erro ao verificar conectividade com o servidor.', 'warning');
        }
    }

    /**
     * Realizar simulação
     */
    async realizarSimulacao() {
        try {
            // Mostrar loading
            mostrarLoading(this.elementos.btnSimulate);
            
            // Ocultar containers anteriores
            this.ocultarResultados();
            this.ocultarErro();

            // Obter dados do formulário
            const dados = this.obterDadosFormulario();
            
            // Validar dados
            const validacao = validarDados(dados);
            if (!validacao.valido) {
                throw new Error(validacao.erros.join('\n'));
            }

            console.log('Iniciando simulação com dados:', dados);

            // Fazer requisição para API
            const resultado = await SimulacaoService.simular(dados);

            if (resultado.sucesso) {
                this.resultadoAtual = resultado.dados;
                this.exibirResultados(resultado.dados);
                mostrarToast('Simulação realizada com sucesso!', 'success');
            } else {
                throw resultado.erro;
            }

        } catch (error) {
            console.error('Erro na simulação:', error);
            this.exibirErro(error);
        } finally {
            // Esconder loading
            esconderLoading(this.elementos.btnSimulate);
        }
    }

    /**
     * Obter dados do formulário
     */
    obterDadosFormulario() {
        const valorImovelStr = this.elementos.valorImovel.value;
        const valorImovel = parseMoeda(valorImovelStr);
        
        console.log('Valor string:', valorImovelStr);
        console.log('Valor parseado:', valorImovel);
        
        const dados = {
            valor_imovel: valorImovel,
            percentual_entrada: parseInt(this.elementos.percentualEntrada.value),
            anos_contrato: parseInt(this.elementos.anosContrato.value)
        };
        
        console.log('Dados do formulário:', dados);
        
        return dados;
    }

    /**
     * Exibir resultados da simulação
     */
    exibirResultados(dados) {
        // Preencher valores calculados
        this.elementos.resultValorImovel.textContent = dados.formatted.valor_imovel;
        this.elementos.resultValorEntrada.textContent = dados.formatted.valor_entrada;
        this.elementos.resultPercentualEntrada.textContent = `${dados.percentual_entrada}% do valor do imóvel`;
        this.elementos.resultValorFinanciado.textContent = dados.formatted.valor_financiado;
        this.elementos.resultTotalGuardar.textContent = dados.formatted.total_a_guardar;
        this.elementos.resultParcelaMensal.textContent = dados.formatted.parcela_mensal;
        this.elementos.resultMesesContrato.textContent = `em ${dados.meses_contrato} meses`;

        // Mostrar container de resultados com animação
        mostrarElemento(this.elementos.resultsContainer);
        animarEntrada(this.elementos.resultsContainer, 'slideUp');
        
        // Scroll suave para os resultados
        setTimeout(() => {
            scrollPara(this.elementos.resultsContainer);
        }, 100);
        
        // Efeito de celebração
        setTimeout(() => {
            mostrarConfete();
        }, 500);
    }

    /**
     * Exibir erro
     */
    exibirErro(error) {
        let mensagem = 'Ocorreu um erro inesperado';

        if (error instanceof ApiError) {
            mensagem = error.getFormattedMessage();
        } else if (error instanceof Error) {
            mensagem = error.message;
        }

        this.elementos.errorMessage.textContent = mensagem;
        mostrarElemento(this.elementos.errorContainer);
        animarEntrada(this.elementos.errorContainer, 'slideDown');
        
        // Scroll para o erro
        setTimeout(() => {
            scrollPara(this.elementos.errorContainer);
        }, 100);

        // Mostrar toast de erro
        mostrarToast('Erro na simulação. Verifique os dados e tente novamente.', 'error');
    }

    /**
     * Ocultar resultados
     */
    ocultarResultados() {
        esconderElemento(this.elementos.resultsContainer);
    }

    /**
     * Ocultar erro
     */
    ocultarErro() {
        esconderElemento(this.elementos.errorContainer);
    }

    /**
     * Nova simulação
     */
    novaSimulacao() {
        // Limpar formulário
        this.elementos.form.reset();
        this.elementos.percentualEntrada.value = 10;
        this.elementos.percentualValue.textContent = '10%';
        
        // Ocultar containers
        this.ocultarResultados();
        this.ocultarErro();
        
        // Limpar dados
        this.resultadoAtual = null;
        
        // Focar no primeiro input
        this.elementos.valorImovel.focus();
        
        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        mostrarToast('Formulário limpo para nova simulação', 'success');
    }

    /**
     * Salvar resultado
     */
    async salvarResultado() {
        if (!this.resultadoAtual) {
            mostrarToast('Nenhum resultado para salvar', 'warning');
            return;
        }

        try {
            // Mostrar loading no botão
            const btnSalvar = this.elementos.btnSaveResult;
            const textoOriginal = btnSalvar.textContent;
            btnSalvar.textContent = 'Gerando PDF...';
            btnSalvar.disabled = true;

            // Gerar PDF
            await gerarPDF(this.resultadoAtual);
            
            // Salvar no localStorage também
            const sucessoLocal = salvarResultado(this.resultadoAtual);
            
            if (sucessoLocal) {
                mostrarToast('PDF gerado e resultado salvo com sucesso!', 'success');
            } else {
                mostrarToast('PDF gerado com sucesso!', 'success');
            }
            
        } catch (error) {
            console.error('Erro ao salvar resultado:', error);
            mostrarToast('Erro ao gerar PDF. Tente novamente.', 'error');
        } finally {
            // Restaurar botão
            const btnSalvar = this.elementos.btnSaveResult;
            btnSalvar.textContent = 'Salvar Resultado';
            btnSalvar.disabled = false;
        }
    }

    /**
     * Lidar com mudanças de conectividade
     */
    handleConnectivityChange(status) {
        switch (status) {
            case 'online':
                mostrarToast('Conexão restaurada', 'success');
                break;
            case 'offline':
                mostrarToast('Conexão perdida. Verifique sua internet.', 'error');
                break;
            case 'api-offline':
                mostrarToast('API temporariamente indisponível', 'warning');
                break;
        }
    }
}

// Aguardar carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se é necessário polyfill para fetch
    if (!window.fetch) {
        console.error('Fetch API não suportada. Considere adicionar um polyfill.');
        mostrarToast('Navegador não suportado. Atualize seu navegador.', 'error');
        return;
    }

    // Aguardar que os serviços estejam disponíveis
    setTimeout(() => {
        if (window.SimulacaoService) {
            // Inicializar aplicação
            window.amoraApp = new AmoraApp();
        } else {
            console.error('SimulacaoService não está disponível');
            mostrarToast('Erro ao carregar a aplicação. Recarregue a página.', 'error');
        }
    }, 100);
});

// Tratamento de erros globais
window.addEventListener('error', (event) => {
    console.error('Erro global capturado:', event.error);
    mostrarToast('Ocorreu um erro inesperado na aplicação', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise rejeitada não tratada:', event.reason);
    mostrarToast('Erro de comunicação com o servidor', 'error');
});

// Exportar para debug
window.AmoraApp = AmoraApp;
