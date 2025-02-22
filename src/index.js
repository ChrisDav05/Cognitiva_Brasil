import { getGeminiResponse } from "./services/geminiService.js";
import { getLlamaResponse } from "./services/llamaService.js";
import { getMixtralResponse } from "./services/mixtralService.js";

async function verificarErros(texto) {
  const resposta = await fetch("https://api.languagetool.org/v2/check", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      text: texto,
      language: "pt-BR",
    }),
  });

  const dados = await resposta.json();
  return dados.matches.length; // Número de erros detectados
}

async function pedirRanking(modeloNome, modeloFunc, respostas) {
  const prompt = `
  Aqui estão três respostas para a mesma pergunta sobre Programação Orientada a Objetos:

  Llama: ${respostas.Llama}

  Gemini: ${respostas.Gemini}

  Mixtral: ${respostas.Mixtral}

  Avalie as respostas considerando:
  
  - Consistência gramatical.

  **Retorne um ranking das respostas (1º, 2º e 3º lugar) e justifique brevemente.**
  `;

  try {
    const ranking = await modeloFunc(prompt);
    console.log(`\nRanking gerado por ${modeloNome}: \n${ranking}`);
    return ranking;
  } catch (error) {
    console.error(`Erro ao pedir ranking para ${modeloNome}:`, error);
    return `Erro ao processar ranking para ${modeloNome}`;
  }
}

async function main() {
  const questao = "Explique sobre Programação orientada a objetos.";

  console.log("Consultando Modelos...");

  try {
    // Obtendo respostas dos modelos
    const llamaResponse = await getLlamaResponse(questao);
    const geminiResponse = await getGeminiResponse(questao);
    const mixtralResponse = await getMixtralResponse(questao);

    console.log("\n---------------- RESPOSTAS ----------------\n");
    console.log("\nLlama:", llamaResponse);
    console.log("\n-------------------------------------------------------------------------------------------------------")
    console.log("\nGemini:", geminiResponse);
    console.log("\n-------------------------------------------------------------------------------------------------------")
    console.log("\nMixtral:", mixtralResponse);
    
    console.log("\n-----------------------------------------------------------------------------------------------------");
    console.log("\nAnalisando erros gramaticais...");

    // Verificando erros em cada resposta
    const errosLlama = await verificarErros(llamaResponse);
    const errosGemini = await verificarErros(geminiResponse);
    const errosMixtral = await verificarErros(mixtralResponse);

    console.log(`Llama: ${errosLlama} erros`);
    console.log(`Gemini: ${errosGemini} erros`);
    console.log(`Mixtral: ${errosMixtral} erros`);

    // Criando um ranking baseado no menor número de erros
    const rankingErros = [
      { nome: "Llama", erros: errosLlama },
      { nome: "Gemini", erros: errosGemini },
      { nome: "Mixtral", erros: errosMixtral },
    ].sort((a, b) => a.erros - b.erros); // Ordena pelo menor número de erros

    console.log("\nRANKING BASEADO EM ERROS GRAMATICAIS:");
    rankingErros.forEach((modelo, index) => {
      console.log(`${index + 1}️⃣ ${modelo.nome} - ${modelo.erros} erros`);
    });

    console.log("\n---------------------------------------------");
    console.log("\PEDINDO QUE OS MODELOS FAÇAM O RANKING...\n");

    // Criando um objeto com as respostas
    const respostas = {
      Llama: llamaResponse,
      Gemini: geminiResponse,
      Mixtral: mixtralResponse,
    };

    // Pedindo para cada modelo ranquear as respostas
    const rankingLlama = await pedirRanking("Llama", getLlamaResponse, respostas);
    const rankingGemini = await pedirRanking("Gemini", getGeminiResponse, respostas);
    const rankingMixtral = await pedirRanking("Mixtral", getMixtralResponse, respostas);

    console.log("\n----------------- RANKINGS FINAIS -----------------\n");
    console.log(`\nRanking segundo Llama: \n${rankingLlama}`);
    console.log("\n--------------------------------------------------------------------------------------------------------")
    console.log(`\nRanking segundo Gemini: \n${rankingGemini}`);
    console.log("\n--------------------------------------------------------------------------------------------------------")
    console.log(`\nRanking segundo Mixtral: \n${rankingMixtral}`);

  } catch (error) {
    console.error("Erro ao obter respostas:", error);
  }
}

main();
