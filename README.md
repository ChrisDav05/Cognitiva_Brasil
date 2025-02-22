🚀 Projeto: Comparação de Respostas de LLMs

📌 Descrição

Este projeto acessa três modelos de linguagem (LLMs) diferentes - Gemini, Llama e Mixtral - para gerar respostas a uma mesma pergunta e compará-las.

🛠️ Tecnologias Utilizadas:

Node.js

groq-sdk (SDK para Groq cloud)

Dotenv (para gerenciamento de variáveis de ambiente)

@google/generative-ai (SDK para Google Gemini)

LanguageTool API (para análise gramatical)

🔧 Configuração e Execução

1️⃣ Pré-requisitos:

Antes de executar o projeto, certifique-se de ter:

Node.js instalado (versão 18+)

Chaves de API para Groq (Llama & Mixtral) e Gemini

2️⃣ Instalar dependências

No terminal, navegue até a pasta do projeto e execute:

npm install

Isso instalará todas as bibliotecas necessárias.

3️⃣ Configurar as Chaves de API

Crie um arquivo .env na raiz do projeto e adicione suas chaves:

GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key

⚠️ Nunca compartilhe esse arquivo no GitHub!

4️⃣ Executar o Projeto

No terminal, execute:

node index.js

5️⃣ Verificando as Respostas

Exemplo de Saída no Console

Consultando Modelos...

---------------- RESPOSTAS ----------------

Llama: [resposta gerada]

Gemini: [resposta gerada]

Mixtral: [resposta gerada]

------------------------------------------------------
Analisando erros gramaticais...

Llama: 3 erros

Gemini: 1 erro

Mixtral: 2 erros

RANKING BASEADO EM ERROS GRAMATICAIS:

1️⃣ Gemini - 1 erro

2️⃣ Mixtral - 2 erros

3️⃣ Llama - 3 erros

---------------------------------------------
PEDINDO QUE OS MODELOS FAÇAM O RANKING...

Ranking segundo Llama: [ranking gerado]

Ranking segundo Gemini: [ranking gerado]

Ranking segundo Mixtral: [ranking gerado]
