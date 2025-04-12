
async function buscarPais() {
    const nome = document.getElementById("search").value;
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${nome}`);
      if (!res.ok) throw new Error("País não encontrado");
      const dados = await res.json();
      dados.forEach(pais => {
        resultado.innerHTML += criarCard(pais);
      });
    } catch (erro) {
      resultado.innerHTML = `<p style="color:red;">Erro: ${erro.message}</p>`;
    }
  }
  
  async function carregarPopulacao() {
    const div = document.getElementById("populacao");
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const dados = await res.json();
      const top5 = dados.sort((a, b) => b.population - a.population).slice(0, 5);
      top5.forEach(pais => {
        div.innerHTML += criarCard(pais);
      });
    } catch (erro) {
      div.innerHTML = `<p style="color:red;">Erro ao carregar dados</p>`;
    }
  }
  
  
  function criarCard(pais) {
    return `
      <div class="card">
        <img src="${pais.flags.svg}" alt="Bandeira de ${pais.name.common}" />
        <h3>${pais.name.common}</h3>
        <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "N/A"}</p>
        <p><strong>População:</strong> ${pais.population.toLocaleString()}</p>
        <p><strong>Região:</strong> ${pais.region}</p>
      </div>
    `;
  }
  
 
  window.onload = carregarPopulacao;
  