// testApi.js
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config({ path: 'C:/Users/Frank Webber/Pictures/converter/.env' }); // Define o caminho específico

async function testOpenAI() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error("A chave API não foi encontrada. Verifique o arquivo .env.");
        return;
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Teste com gpt-3.5-turbo se gpt-4 não estiver acessível
                messages: [
                    { "role": "user", "content": "Diga olá ao GPT!" }
                ],
                max_tokens: 50
            })
        });

        if (!response.ok) {
            console.error("Erro na resposta da API:", await response.text());
            return;
        }

        const data = await response.json();
        console.log("Resposta da API:", data.choices[0].message.content);
    } catch (error) {
        console.error("Erro ao testar a API OpenAI:", error);
    }
}

testOpenAI();
