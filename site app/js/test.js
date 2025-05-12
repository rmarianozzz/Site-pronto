document.addEventListener('DOMContentLoaded', () => {
    const maxAptidoes = 5;
  
    const intelectuaisBtns = document.querySelectorAll('#intelectuais button');
    const fisicasBtns = document.querySelectorAll('#fisicas button');
    const resultado = document.getElementById('resultado');
    const verResultado = document.getElementById('ver-resultado');
  
    const toggleSelection = (btn, container) => {
      const selecionados = container.querySelectorAll('button.selected');
      if (btn.classList.contains('selected')) {
        btn.classList.remove('selected');
      } else if (selecionados.length < maxAptidoes) {
        btn.classList.add('selected');
      } else {
        alert(`Você só pode selecionar até ${maxAptidoes} aptidões.`);
      }
    };
  
    intelectuaisBtns.forEach(btn => {
      btn.addEventListener('click', () => toggleSelection(btn, document.getElementById('intelectuais')));
    });
  
    fisicasBtns.forEach(btn => {
      btn.addEventListener('click', () => toggleSelection(btn, document.getElementById('fisicas')));
    });
  
    verResultado.addEventListener('click', () => {
      const intelectuais = Array.from(document.querySelectorAll('#intelectuais button.selected')).map(btn => btn.textContent);
      const fisicas = Array.from(document.querySelectorAll('#fisicas button.selected')).map(btn => btn.textContent);
      const idade = document.getElementById('idade').value;
      const altura = document.getElementById('altura').value;
      const peso = document.getElementById('peso').value;
      const localizacao = document.getElementById('localizacao').value;
  
      if (intelectuais.length === 0 && fisicas.length === 0) {
        alert('Por favor, selecione pelo menos uma aptidão.');
        return;
      }
  
      const sugestoes = gerarSugestoes(intelectuais, fisicas, localizacao);
  
      resultado.innerHTML = `
        <h2>Seus Talentos Compatíveis</h2>
        <p>Com base nas suas escolhas e informações, encontramos esses talentos que você pode explorar:</p>
        <div class="cartas-talento">
          ${sugestoes.map(s => `
            <div class="card-talento">
              <h3>${s.nome}</h3>
              <p>${s.descricao}</p>
              <p><strong>Sugestão:</strong> <a href="${s.link}" target="_blank">Clique aqui</a></p>
            </div>
          `).join('')}
        </div>
      `;
    });
  
    function gerarSugestoes(intelectuais, fisicas, localizacao) {
      const talentos = [
        {
          nome: "Analista de Dados",
          aptidoes: ["Matemática", "Lógica", "Programação", "Pesquisa"],
          descricao: "Ideal para quem tem habilidades analíticas e raciocínio lógico.",
          link: `https://www.coursera.org/search?query=analista%20de%20dados%20${localizacao}`
        },
        {
          nome: "Engenharia de Software",
          aptidoes: ["Programação", "Lógica", "Ciência", "Física"],
          descricao: "Área voltada à criação de soluções tecnológicas e sistemas.",
          link: `https://www.udemy.com/courses/search/?q=engenharia+de+software+${localizacao}`
        },
        {
          nome: "Atleta de Alto Rendimento",
          aptidoes: ["Velocidade", "Resistência", "Agilidade", "Fôlego"],
          descricao: "Perfeito para quem possui vigor físico e dedicação esportiva.",
          link: `https://www.educacaofisica.com.br/locais/${localizacao}`
        },
        {
          nome: "Designer Gráfico",
          aptidoes: ["Design Gráfico", "Criatividade", "Escrita Criativa"],
          descricao: "Transforme ideias em comunicação visual eficiente.",
          link: `https://www.alura.com.br/cursos-online-design`
        },
        {
          nome: "Professor de Idiomas",
          aptidoes: ["Idiomas", "Didática", "Memória", "Leitura Rápida"],
          descricao: "Ensine idiomas com fluência e envolvimento pedagógico.",
          link: `https://www.linkedin.com/jobs/search/?keywords=professor%20idiomas%20${localizacao}`
        },
        {
          nome: "Personal Trainer",
          aptidoes: ["Musculatura", "Condicionamento Físico", "Reflexo", "Resistência"],
          descricao: "Trabalhe com saúde e performance física.",
          link: `https://www.sesiesporte.com.br/cursos-personal-trainer`
        },
        {
          nome: "Debatedor ou Advogado",
          aptidoes: ["Debate", "Filosofia", "Negociação", "Leitura Rápida"],
          descricao: "Carreira ideal para mentes argumentativas e articuladas.",
          link: `https://www.estacio.br/cursos/direito`
        },
        {
          nome: "Piloto de Drones ou Corridas",
          aptidoes: ["Reflexo", "Percepção Espacial", "Coordenação", "Controle Corporal"],
          descricao: "Exige reflexos rápidos e controle preciso do corpo.",
          link: `https://www.droneschool.com.br/`
        },
      ];
  
    
      const selecionadas = [...intelectuais, ...fisicas];
      const sugestoesOrdenadas = talentos
        .map(t => ({
          ...t,
          score: t.aptidoes.filter(ap => selecionadas.includes(ap)).length
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
  
      return sugestoesOrdenadas;
    }
  });
  