// server.js
import express from 'express';
import cors from 'cors'; // Importa o cors
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import { ensureDirectoryExists } from './fileUtils.js';
import txtToJsonRoutes from './txtToJsonRoutes.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Carregar variáveis de ambiente
dotenv.config();

// Obter o diretório atual usando import.meta.url para compatibilidade com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Habilita CORS para permitir requisições de outros domínios
app.use(cors({
    origin: '*' // Permite todas as origens; ajuste se precisar de mais restrição
}));

// Configuração dos diretórios
const resultsDir = path.join(__dirname, 'Results');
ensureDirectoryExists(resultsDir);

// Middleware para upload de arquivos
app.use(fileUpload());

// Middleware para JSON
app.use(express.json());

// Servir arquivos estáticos, incluindo index.html
app.use(express.static(__dirname));

// Configuração das rotas de API
app.use('/convert_txt', txtToJsonRoutes);

// Rota raiz para exibir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint de teste
app.get('/test', (req, res) => {
  res.json({ message: "Servidor OK" });
});

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
