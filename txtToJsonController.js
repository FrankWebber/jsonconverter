// txtToJsonController.js
import * as fs from 'node:fs';
import path from 'node:path';
import { parseTxtToJson } from './txtToJsonService.js';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const processTxtToJsonHandler = async (req, res) => {
    try {
        // Verifica se o arquivo foi enviado
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
        }

        const file = req.files.file;

        // Valida o tipo do arquivo para aceitar apenas .txt
        if (file.mimetype !== 'text/plain') {
            return res.status(400).json({ error: 'Tipo de arquivo inválido. Apenas arquivos .txt são permitidos.' });
        }

        // Lê o conteúdo do arquivo
        const fileContent = file.data.toString('utf8');

        // Define o caminho para salvar o arquivo JSON
        const jsonFilePath = path.join(__dirname, 'Results', `${path.parse(file.name).name}.json`);
        console.log("Caminho do arquivo JSON:", jsonFilePath);

        // Cria o diretório 'Results' se ele não existir
        fs.mkdirSync(path.dirname(jsonFilePath), { recursive: true });

        // Processa o conteúdo do arquivo e gera o JSON
        const jsonData = await parseTxtToJson(fileContent);

        // Salva o JSON estruturado no arquivo
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

        // Envia o arquivo JSON para download
        res.download(jsonFilePath, `${path.parse(file.name).name}.json`, (err) => {
            if (err) {
                console.error("Erro ao enviar o arquivo para download:", err);
                res.status(500).json({ error: 'Erro ao enviar o arquivo para download.' });
            } else {
                console.log("Arquivo enviado para download com sucesso.");
            }
        });
    } catch (error) {
        console.error("Erro ao processar o arquivo:", error);
        res.status(500).json({ error: `Erro ao converter TXT para JSON: ${error.message}` });
    }
};
