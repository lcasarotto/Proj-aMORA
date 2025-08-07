// Configuração da API
const API_CONFIG = {
    baseURL: 'http://localhost:3001',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
};

/**
 * Classe para comunicação com a API
 */
class ApiClient {
    constructor(config = API_CONFIG) {
        this.baseURL = config.baseURL;
        this.timeout = config.timeout;
        this.headers = config.headers;
    }

    /**
     * Fazer requisição HTTP
     * @param {string} endpoint - Endpoint da API
     * @param {Object} options - Opções da requisição
     * @returns {Promise} - Promise com a resposta
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        const config = {
            method: 'GET',
            headers: { ...this.headers },
            ...options
        };

        // Adicionar timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        config.signal = controller.signal;

        try {
            const response = await fetch(url, config);
            clearTimeout(timeoutId);

            // Verificar se a resposta é JSON
            const contentType = response.headers.get('content-type');
            const isJson = contentType && contentType.includes('application/json');

            if (!response.ok) {
                let errorData;
                try {
                    errorData = isJson ? await response.json() : { message: response.statusText };
                } catch {
                    errorData = { message: 'Erro desconhecido' };
                }
                
                throw new ApiError(
                    errorData.message || 'Erro na requisição',
                    response.status,
                    errorData
                );
            }

            return isJson ? await response.json() : await response.text();

        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new ApiError('Tempo limite da requisição excedido', 408);
            }
            
            if (error instanceof ApiError) {
                throw error;
            }
            
            // Erro de rede ou outro erro
            throw new ApiError(
                'Erro de conexão. Verifique sua internet e tente novamente.',
                0,
                error
            );
        }
    }

    /**
     * Fazer requisição GET
     * @param {string} endpoint - Endpoint da API
     * @returns {Promise} - Promise com a resposta
     */
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    /**
     * Fazer requisição POST
     * @param {string} endpoint - Endpoint da API
     * @param {Object} data - Dados a serem enviados
     * @returns {Promise} - Promise com a resposta
     */
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}

/**
 * Classe de erro personalizada para a API
 */
class ApiError extends Error {
    constructor(message, status = 0, data = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }

    /**
     * Verificar se é erro de validação
     * @returns {boolean}
     */
    isValidationError() {
        return this.status === 400 && this.data && this.data.details;
    }

    /**
     * Verificar se é erro de servidor
     * @returns {boolean}
     */
    isServerError() {
        return this.status >= 500;
    }

    /**
     * Verificar se é erro de rede
     * @returns {boolean}
     */
    isNetworkError() {
        return this.status === 0;
    }

    /**
     * Obter mensagem formatada do erro
     * @returns {string}
     */
    getFormattedMessage() {
        if (this.isValidationError() && this.data.details) {
            const erros = this.data.details.map(erro => erro.message);
            return erros.join('\n');
        }
        
        return this.message;
    }
}

// Instância global da API
const api = new ApiClient();

/**
 * Serviços específicos da aplicação
 */
const SimulacaoService = {
    /**
     * Verificar status da API
     * @returns {Promise} - Promise com o status
     */
    async verificarStatus() {
        try {
            const response = await api.get('/health');
            return {
                online: true,
                data: response
            };
        } catch (error) {
            return {
                online: false,
                error: error.message
            };
        }
    },

    /**
     * Realizar simulação de financiamento
     * @param {Object} dados - Dados da simulação
     * @returns {Promise} - Promise com o resultado
     */
    async simular(dados) {
        try {
            console.log('Enviando dados para simulação:', dados);
            
            const response = await api.post('/api/simulacao', dados);
            
            console.log('Resposta recebida:', response);
            
            if (response.success && response.data) {
                return {
                    sucesso: true,
                    dados: response.data
                };
            } else {
                throw new Error('Resposta inválida da API');
            }
            
        } catch (error) {
            console.error('Erro na simulação:', error);
            
            return {
                sucesso: false,
                erro: error instanceof ApiError ? error : new ApiError(error.message)
            };
        }
    }
};

/**
 * Monitor de conectividade
 */
class ConnectivityMonitor {
    constructor() {
        this.isOnline = navigator.onLine;
        this.callbacks = [];
        
        this.init();
    }

    init() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.notifyCallbacks('online');
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.notifyCallbacks('offline');
        });

        // Verificar conectividade periodicamente
        setInterval(() => {
            this.checkConnectivity();
        }, 30000); // 30 segundos
    }

    async checkConnectivity() {
        if (!this.isOnline) return;

        try {
            const status = await SimulacaoService.verificarStatus();
            if (!status.online) {
                this.notifyCallbacks('api-offline');
            }
        } catch (error) {
            this.notifyCallbacks('api-offline');
        }
    }

    onStatusChange(callback) {
        this.callbacks.push(callback);
    }

    notifyCallbacks(status) {
        this.callbacks.forEach(callback => {
            try {
                callback(status);
            } catch (error) {
                console.error('Erro no callback de conectividade:', error);
            }
        });
    }
}

// Instância global do monitor
const connectivityMonitor = new ConnectivityMonitor();

// Exportar para uso global
window.SimulacaoService = SimulacaoService;
window.ApiError = ApiError;
window.connectivityMonitor = connectivityMonitor;
