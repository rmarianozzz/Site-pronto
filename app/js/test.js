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
      const cep = document.getElementById('cep').value.trim();
      const idade = document.getElementById('idade').value;
      const peso = document.getElementById('peso').value;
      const altura = document.getElementById('altura').value;
  
      if (intelectuais.length === 0 && fisicas.length === 0) {
        alert('Por favor, selecione pelo menos uma aptidão.');
        return;
      }
  
      const sugestoes = gerarSugestoes(intelectuais, fisicas, cep, idade, peso, altura);
  
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
  
    function gerarSugestoes(intelectuais, fisicas, cep, idade, peso, altura) {
      const talentos = [
        {
          nome: "Analista de Dados",
          aptidoes: ["Matemática", "Lógica", "Programação", "Pesquisa"],
          descricao: "Ideal para quem tem habilidades analíticas e raciocínio lógico.",
          link: `https://www.coursera.org/search?query=analista%20de%20dados%20${cep}`
        },
        {
          nome: "Engenharia de Software",
          aptidoes: ["Programação", "Lógica", "Ciência", "Física"],
          descricao: "Área voltada à criação de soluções tecnológicas e sistemas.",
          link: `https://www.udemy.com/courses/search/?q=engenharia+de+software+${cep}`
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
          link: `https://www.linkedin.com/jobs/search/?keywords=professor%20idiomas%20${cep}`
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
  
      // Analisando idade, peso e altura para ajustar sugestões
      if (idade && idade >= 16 && idade <= 24) {
        sugestoesOrdenadas.push({
          nome: "Jovem Aprendiz",
          descricao: "Cursos e vagas para jovem aprendiz.",
          link: `https://www.catho.com.br/vagas/jovem-aprendiz/${cep}`
        });
      }
  
      if (peso && altura) {
        if (peso > 80 && altura > 180) {
          sugestoesOrdenadas.push({
            nome: "Atleta de Basquete",
            descricao: "Esporte ideal para quem tem uma boa altura e resistência.",
            link: `https://www.novobasquete.com.br/cursos/${cep}`
          });
          sugestoesOrdenadas.push({
            nome: "Atleta de Boxe",
            descricao: "Esporte de combate que exige resistência e força.",
            link: `https://www.boxe.com.br/treinamento/${cep}`
          });
        } else if (peso > 70 && altura > 175) {
          sugestoesOrdenadas.push({
            nome: "Atleta de Futebol",
            descricao: "Futebol é excelente para quem tem resistência e coordenação.",
            link: `https://www.cbf.com.br/cursos/${cep}`
          });
        } else if (peso < 60 && altura < 170) {
          sugestoesOrdenadas.push({
            nome: "Natação",
            descricao: "Esporte indicado para quem busca resistência e flexibilidade.",
            link: `https://www.natacao.com.br/cursos/${cep}`
          });
        }
      }
  
      return sugestoesOrdenadas;
    }
  });
  