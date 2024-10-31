// txtToJsonService.js
import dotenv from 'dotenv';

// Carrega o arquivo .env usando o caminho absoluto
dotenv.config({ path: 'C:/Users/Frank Webber/Pictures/converter/.env' });

// Função simulada para conversão de texto para JSON, estruturando-o conforme o modelo
export async function parseTxtToJson(fileContent) {
    try {
        // Expressões regulares para extrair os dados
        const nome = fileContent.match(/servidor\(a\)\s+([A-Z\s]+)/i)?.[1]?.trim() || "não disponível";
        const cpf = fileContent.match(/CPF:\s*([\d.]+)/i)?.[1]?.replace(/\D/g, "") || "não disponível";
        const matricula = fileContent.match(/matrícula\s*n[ºo]?\s*([\d.-\w]+)/i)?.[1]?.trim() || "não disponível";
        const lotacao = fileContent.match(/lotado\s*no\(a\):\s*([A-Z\s]+)/i)?.[1]?.trim() || "não disponível";
        const unidade = fileContent.match(/unidade:\s*([A-Z\s\d]+)/i)?.[1]?.trim() || "não disponível";
        const cargo = fileContent.match(/cargo\s*de:\s*([A-Z\s]+)/i)?.[1]?.trim() || "não disponível";
        
        const endereco = {
            rua: fileContent.match(/residente\s*a:\s*([A-Za-z\s]+),/i)?.[1]?.trim() || "não disponível",
            numero: fileContent.match(/N[ºo]?\s*(\d+)/i)?.[1] || "não disponível",
            cep: fileContent.match(/CEP:\s*(\d+)/i)?.[1] || "não disponível",
            bairro: fileContent.match(/Bairro:\s*([A-Za-z\s]+)/i)?.[1]?.trim() || "não disponível",
            cidade: fileContent.match(/cidade:\s*([A-Za-z\s]+)\//i)?.[1]?.trim() || "não disponível",
            estado: fileContent.match(/cidade:.*\/([A-Z]+)/i)?.[1] || "não disponível"
        };
        
        const telefone = fileContent.match(/telefone:\s*(\(\d+\)\d+-\d+)/i)?.[1] || "não disponível";
        const tipoLicenca = fileContent.match(/requerer:\s*([A-Z\s/]+)/i)?.[1]?.trim() || "não disponível";
        const dataRequerimento = fileContent.match(/Data\s+(\d{2}\/\d{2}\/\d{4})/i)?.[1] || "não disponível";

        const laudoMedico = {
            numero: fileContent.match(/LAUDO\s*M[ÉE]DICO\s*N[ºo]?\s*(\d+\/\d+)/i)?.[1] || "não disponível",
            periodo_licenca: {
                dias: parseInt(fileContent.match(/Por\s+(\d+)\s+dias/i)?.[1]) || 0,
                data_inicio: fileContent.match(/Por\s+\d+\s+dias\s+(\d{2}\/\d{2}\/\d{4})/i)?.[1] || "não disponível",
                data_fim: fileContent.match(/à\s+(\d{2}\/\d{2}\/\d{4})/i)?.[1] || "não disponível"
            },
            data_exame: fileContent.match(/Data\s+do\s+exame\s+(\d{2}\/\d{2}\/\d{4})/i)?.[1] || "não disponível",
            cid: fileContent.match(/CID\s+([\w,]+)/i)?.[1]?.split(",") || ["não disponível"],
            status_licenca: fileContent.match(/\[X\]\s*Licença\s*Negada/i) ? "Negada" : "Concedida"
        };

        const informacoesJuntaMedica = {
            endereco: {
                rua: fileContent.match(/Endereço:\s*([A-Za-z\s]+),/i)?.[1]?.trim() || "não disponível",
                quadra: fileContent.match(/Quadra\s*(\d+)/i)?.[1] || "não disponível",
                bairro: fileContent.match(/bairro:\s*([A-Za-z\s]+)/i)?.[1]?.trim() || "não disponível",
                cidade: fileContent.match(/cidade:\s*([A-Za-z\s]+)/i)?.[1]?.trim() || "não disponível",
                estado: fileContent.match(/cidade:\s*[A-Za-z\s]+\/([A-Z]{2})/i)?.[1] || "não disponível",
                telefone: fileContent.match(/Telefone\s*\(?(\d+\)?\d+-\d+)/i)?.[1] || "não disponível"
            },
            crm: fileContent.match(/CRM\s*([A-Za-z\s\d]+)/i)?.[1] || "não disponível",
            observacoes: "Atendimento realizado no antigo prédio onde funcionava a sede do Prosamim, Centro"
        };

        // Estrutura final JSON conforme o modelo desejado
        const structuredResponse = {
            "servidor": {
                nome,
                cpf,
                matricula,
                lotacao,
                unidade,
                cargo,
                endereco,
                telefone
            },
            "requerimento": {
                "tipo": tipoLicenca,
                "data_requerimento": dataRequerimento
            },
            "laudo_medico": laudoMedico,
            "informacoes_junta_medica": informacoesJuntaMedica
        };

        // Retorna o JSON estruturado
        return structuredResponse;
    } catch (error) {
        console.error("Erro ao processar o texto:", error);
        throw error;
    }
}
