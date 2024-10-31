// txtToJsonService.js
import dotenv from 'dotenv';

// Carrega o arquivo .env usando o caminho absoluto
dotenv.config({ path: 'C:/Users/Frank Webber/Pictures/converter/.env' });

export async function parseTxtToJson(fileContent) {
    try {
        // Expressões regulares para extrair os dados com logs para verificação
        const nome = fileContent.match(/servidor\(a\)\s+([\w\s]+)/i)?.[1]?.trim() || "não disponível";
        console.log("Nome:", nome);
        
        const cpf = fileContent.match(/CPF:\s*([\d.]+)/i)?.[1]?.replace(/\D/g, "") || "não disponível";
        console.log("CPF:", cpf);
        
        const matricula = fileContent.match(/matrícula\s*n[ºo]?\s*([\d.-\w]+)/i)?.[1]?.trim() || "não disponível";
        console.log("Matrícula:", matricula);
        
        const lotacao = fileContent.match(/lotado\s*no\(a\):\s*([\w\s]+)/i)?.[1]?.trim() || "não disponível";
        console.log("Lotação:", lotacao);
        
        const unidade = fileContent.match(/unidade:\s*([\w\s\d]+)/i)?.[1]?.trim() || "não disponível";
        console.log("Unidade:", unidade);
        
        const cargo = fileContent.match(/cargo\s*de:\s*([\w\s]+)/i)?.[1]?.trim() || "não disponível";
        console.log("Cargo:", cargo);

        const endereco = {
            rua: fileContent.match(/residente\s*a:\s*([\w\s]+),/i)?.[1]?.trim() || "não disponível",
            numero: fileContent.match(/N[ºo]?\s*(\d+)/i)?.[1] || "não disponível",
            cep: fileContent.match(/CEP:\s*(\d+)/i)?.[1] || "não disponível",
            bairro: fileContent.match(/Bairro:\s*([\w\s]+)/i)?.[1]?.trim() || "não disponível",
            cidade: fileContent.match(/cidade:\s*([\w\s]+)\//i)?.[1]?.trim() || "não disponível",
            estado: fileContent.match(/cidade:.*\/([A-Z]+)/i)?.[1] || "não disponível"
        };
        console.log("Endereço:", endereco);

        const telefone = fileContent.match(/telefone:\s*(\(\d+\)\d+-\d+)/i)?.[1] || "não disponível";
        console.log("Telefone:", telefone);

        const tipoLicenca = fileContent.match(/requerer:\s*([\w\s/]+)/i)?.[1]?.trim() || "não disponível";
        console.log("Tipo de Licença:", tipoLicenca);

        const dataRequerimento = fileContent.match(/Data\s+(\d{2}\/\d{2}\/\d{4})/i)?.[1] || "não disponível";
        console.log("Data de Requerimento:", dataRequerimento);

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
        console.log("Laudo Médico:", laudoMedico);

        const informacoesJuntaMedica = {
            endereco: {
                rua: fileContent.match(/Endereço:\s*([\w\s]+),/i)?.[1]?.trim() || "não disponível",
                quadra: fileContent.match(/Quadra\s*(\d+)/i)?.[1] || "não disponível",
                bairro: fileContent.match(/bairro:\s*([\w\s]+)/i)?.[1]?.trim() || "não disponível",
                cidade: fileContent.match(/cidade:\s*([\w\s]+)/i)?.[1]?.trim() || "não disponível",
                estado: fileContent.match(/cidade:\s*[\w\s]+\/([A-Z]{2})/i)?.[1] || "não disponível",
                telefone: fileContent.match(/Telefone\s*\(?(\d+\)?\d+-\d+)/i)?.[1] || "não disponível"
            },
            crm: fileContent.match(/CRM\s*([\w\s\d]+)/i)?.[1] || "não disponível",
            observacoes: "Atendimento realizado no antigo prédio onde funcionava a sede do Prosamim, Centro"
        };
        console.log("Informações da Junta Médica:", informacoesJuntaMedica);

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

        console.log("JSON Estruturado Final:", structuredResponse); // Log para verificar o JSON final

        return structuredResponse;
    } catch (error) {
        console.error("Erro ao processar o texto:", error);
        throw error;
    }
}
