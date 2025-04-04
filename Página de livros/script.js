// Lista de livros populares para o carrossel
const livrosPopulares = [
    "O Senhor dos Anéis",
    "Harry Potter e a Pedra Filosofal",
    "Dom Casmurro",
    "O Pequeno Príncipe",
    "1984",
    "Cem Anos de Solidão",
    "O Hobbit",
    "A Revolução dos Bichos",
    "Crime e Castigo",
    "A Menina que Roubava Livros"
];

// Função para buscar livros na API do Google Books
async function buscarLivros(listaDeLivros, containerId) {
    let container = document.getElementById(containerId);
    container.innerHTML = ""; // Limpa os resultados antes de adicionar novos

    for (let titulo of listaDeLivros) {
        let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(titulo)}`;

        try {
            let response = await fetch(url);
            let data = await response.json();

            if (data.items && data.items.length > 0) {
                let livro = data.items[0].volumeInfo;
                let capa = livro.imageLinks?.thumbnail || "https://via.placeholder.com/200x300";
                let autor = livro.authors ? livro.authors.join(", ") : "Autor Desconhecido";

                let livroHTML = `
                    <div class="livro-container">
                        <img src="${capa}" alt="Capa de ${livro.title}">
                        <h2>${livro.title}</h2>
                        <p>Autor: ${autor}</p>
                        <a href="#" class="botao-comprar">Comprar</a>
                    </div>
                `;

                container.innerHTML += livroHTML;
            }
        } catch (error) {
            console.error(`Erro ao buscar "${titulo}":`, error);
        }
    }
}

// Função para buscar um livro digitado pelo usuário
async function pesquisarLivro() {
    let termo = document.getElementById("pesquisa").value.trim();
    if (termo.length < 3) return; // Só busca se tiver pelo menos 3 caracteres

    buscarLivros([termo], "livros-container"); // Busca e exibe no container correto
}

// Função para mover o carrossel
let deslocamento = 0;
function moverCarrossel(direcao) {
    const carrossel = document.getElementById("carrossel");
    const larguraItem = 270; // Largura do livro + margem

    deslocamento += direcao * larguraItem * 4; 
    const maxDeslocamento = (livrosPopulares.length - 4) * larguraItem;
    
    if (deslocamento < 0) deslocamento = 0;
    if (deslocamento > maxDeslocamento) deslocamento = maxDeslocamento;

    carrossel.style.transform = `translateX(-${deslocamento}px)`;
}

// 🔥 Carregar os livros populares no carrossel ao iniciar
buscarLivros(livrosPopulares, "carrossel");
