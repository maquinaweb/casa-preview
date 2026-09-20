'use strict';
/* ==========================================================================
   dados-exemplo.js — TODO o conteúdo fictício do protótipo "Casa".

   É o único arquivo que você precisa abrir para trocar nomes, tarefas,
   itens de mercado, compromissos e o diálogo do assistente.
   Nenhum outro arquivo tem nome de pessoa ou item escrito dentro dele.

   COMO TROCAR OS NOMES DA FAMÍLIA
   1. Em `familia.membros`, troque `nome` e `inicial` (a inicial aparece no
      avatar colorido). NÃO troque o `id` — o resto do arquivo aponta para ele.
   2. Em `familia.nome`, troque o sobrenome que aparece na tela de entrada.
   3. Salve e recarregue o navegador. É só isso.

   Tudo aqui é inventado. Nada sai do navegador.
   ========================================================================== */

const dadosExemplo = {

  /* ---------------------------------------------------------------- casa */
  familia: {
    nome: 'Souza',
    // Papéis genéricos de propósito: troque por Marina, Rafael, etc.
    membros: [
      { id: 'pai',   nome: 'Pai',   inicial: 'P', cor: '#d59a63', papel: 'responsável' },
      { id: 'mae',   nome: 'Mãe',   inicial: 'M', cor: '#c9849f', papel: 'responsável' },
      { id: 'filho', nome: 'Filho', inicial: 'F', cor: '#7fb2c4', papel: 'jovem (14)' },
      { id: 'filha', nome: 'Filha', inicial: 'L', cor: '#8fc0a0', papel: 'jovem (9)' }
    ]
  },

  /* ------------------------------------------------------- tela de hoje */
  // Frases da tela "Hoje". O resto dessa tela é montado a partir das
  // tarefas, da despensa, da agenda e dos avisos abaixo.
  hoje: {
    // A saudação é escolhida pelo relógio do aparelho.
    saudacoes: { manha: 'Bom dia', tarde: 'Boa tarde', noite: 'Boa noite' },
    // Quem está usando o sistema nesta demonstração.
    usuario: 'pai'
  },

  /* ------------------------------------------------------------ tarefas */
  // responsavel: id do membro, ou null quando a tarefa está livre.
  // repete: texto livre ('' quando não se repete). concluida: true/false.
  tarefas: [
    { id: 't1', titulo: 'Levar o lixo para fora', responsavel: 'filho',
      prazo: 'Hoje · 19h', hoje: true, repete: 'Todo dia', concluida: false },

    { id: 't2', titulo: 'Pagar a conta de luz', responsavel: 'pai',
      prazo: 'Amanhã', hoje: true, repete: 'Todo mês', concluida: false,
      nota: 'R$ 287,40 · débito não está automático' },

    { id: 't3', titulo: 'Buscar a Filha na escola', responsavel: 'mae',
      prazo: 'Hoje · 17h30', hoje: true, repete: '', concluida: false },

    { id: 't4', titulo: 'Faxina do banheiro', responsavel: null,
      prazo: 'Até domingo', hoje: false, repete: 'Toda semana', concluida: false,
      nota: 'Ninguém assumiu ainda.' },

    { id: 't5', titulo: 'Mercado do mês', responsavel: 'mae',
      prazo: 'Sábado', hoje: false, repete: 'Todo mês', concluida: false,
      lista: 'Mercado do mês' },

    { id: 't6', titulo: 'Organizar o material da escola', responsavel: 'filho',
      prazo: 'Domingo', hoje: false, repete: '', concluida: false,
      checklist: [
        { texto: 'Separar os cadernos que sobraram', ok: true },
        { texto: 'Encapar os novos', ok: false },
        { texto: 'Conferir a lista da escola', ok: false }
      ] },

    { id: 't7', titulo: 'Trocar a água do filtro', responsavel: 'filha',
      prazo: 'Ontem', hoje: false, repete: 'Toda semana', concluida: true }
  ],

  /* ---------------------------------------------- compras (lista ativa) */
  listaAtiva: {
    nome: 'Compras da semana',
    itens: [
      { nome: 'Leite',          detalhe: '6 caixas',  comprado: false },
      { nome: 'Pão de forma',   detalhe: '',          comprado: true  },
      { nome: 'Detergente',     detalhe: '2',         comprado: false },
      { nome: 'Banana',         detalhe: 'uma penca', comprado: true  },
      { nome: 'Ração do gato',  detalhe: 'saco 3 kg', comprado: false },
      { nome: 'Papel higiênico',detalhe: '12 rolos',  comprado: false }
    ]
  },

  /* -------------------------------------------- compras (reutilizáveis) */
  listasSalvas: [
    { nome: 'Mercado do mês', usada: 'usada mês passado',
      itens: ['Arroz 5 kg', 'Feijão 2 kg', 'Óleo', 'Açúcar', 'Café', 'Leite 12 caixas',
              'Macarrão', 'Molho de tomate', 'Sabão em pó', 'Papel higiênico'] },
    { nome: 'Churrasco de domingo', usada: 'usada em julho',
      itens: ['Carne', 'Carvão', 'Pão de alho', 'Refrigerante', 'Gelo', 'Farofa'] },
    { nome: 'Farmácia', usada: 'usada em agosto',
      itens: ['Dipirona', 'Band-aid', 'Protetor solar', 'Soro fisiológico'] }
  ],

  /* ----------------------------------------------------------- despensa */
  // situacao: 'ok' | 'pouco' | 'falta'
  despensa: [
    { nome: 'Arroz',    local: 'Armário da cozinha', situacao: 'ok',    detalhe: 'pacote fechado' },
    { nome: 'Feijão',   local: 'Armário da cozinha', situacao: 'falta', detalhe: 'há 4 dias' },
    { nome: 'Café',     local: 'Armário da cozinha', situacao: 'falta', detalhe: 'acabou hoje' },
    { nome: 'Leite',    local: 'Geladeira',          situacao: 'pouco', detalhe: '2 caixas' },
    { nome: 'Óleo',     local: 'Armário da cozinha', situacao: 'ok',    detalhe: '' },
    { nome: 'Açúcar',   local: 'Armário da cozinha', situacao: 'ok',    detalhe: '' },
    { nome: 'Sabão em pó', local: 'Área de serviço', situacao: 'pouco', detalhe: 'meio pacote' }
  ],

  /* ------------------------------------------------------------- agenda */
  // emDias: 0 é hoje, 1 é amanhã, e assim por diante. A data de verdade é
  // calculada pelo relógio do aparelho — não precisa mexer em nada aqui.
  // tipo: 'compromisso' | 'tarefa' | 'conta'  ·  particular: esconde o detalhe
  agenda: [
    { emDias: 0, itens: [
      { hora: '17:30', tipo: 'tarefa',       titulo: 'Buscar a Filha na escola', quem: 'mae' },
      { hora: '19:00', tipo: 'tarefa',       titulo: 'Levar o lixo para fora',   quem: 'filho' },
      { hora: '20:00', tipo: 'compromisso',  titulo: 'Consulta',                 quem: 'mae', particular: true }
    ]},
    { emDias: 1, itens: [
      { hora: 'o dia',  tipo: 'conta',       titulo: 'Conta de luz vence',        quem: 'pai' },
      { hora: '19:00',  tipo: 'compromisso', titulo: 'Reunião de pais na escola', quem: 'mae' }
    ]},
    { emDias: 2, itens: [
      { hora: '15:00', tipo: 'compromisso',  titulo: 'Dentista da Filha',        quem: 'filha' }
    ]},
    { emDias: 3, itens: [
      { hora: '18:30', tipo: 'compromisso',  titulo: 'Futebol do Filho',         quem: 'filho' }
    ]},
    { emDias: 4, itens: [
      { hora: 'o dia', tipo: 'conta',        titulo: 'Internet vence',           quem: 'pai' }
    ]},
    { emDias: 5, itens: [
      { hora: '09:00', tipo: 'tarefa',       titulo: 'Mercado do mês',           quem: 'mae' },
      { hora: 'o dia', tipo: 'tarefa',       titulo: 'Faxina do banheiro',       quem: null }
    ]},
    { emDias: 6, itens: [
      { hora: '12:00', tipo: 'compromisso',  titulo: 'Almoço na casa da avó',    quem: null }
    ]}
  ],

  /* ------------------------------------------------------------ dinheiro */
  /* Transparência entre os dois adultos, sem devassa. Cada lançamento tem um
     NÍVEL DE VISIBILIDADE, e é ele que manda em tudo nessa tela:

       'aberto'  — os dois veem a descrição e o valor.
       'total'   — o outro vê o valor, mas não vê o que foi. Entra na soma.
       'privado' — o outro não vê, e o valor NÃO entra na soma que ele enxerga.

     Por que 'privado' fica fora da soma do outro: se entrasse, bastaria
     subtrair os lançamentos visíveis do total para descobrir o valor
     escondido. O total que cada pessoa vê é o total que a permissão dela
     alcança — os dois números podem não bater, e é isso mesmo.
     Quem é dono do lançamento sempre vê o próprio, em qualquer nível.       */
  dinheiro: {
    mes: 'setembro',

    // dono: id do membro, ou 'casa' para o que é dos dois.
    contas: [
      { id: 'cc-casa',    nome: 'Conta conjunta',   tipo: 'conta',  dono: 'casa', saldo: 4180.00 },
      { id: 'cartao-casa',nome: 'Cartão da casa',   tipo: 'cartao', dono: 'casa', saldo: 1940.00, vence: 'dia 10' },
      { id: 'cc-pai',     nome: 'Conta do Pai',     tipo: 'conta',  dono: 'pai',  saldo: 1260.00 },
      { id: 'cartao-pai', nome: 'Cartão do Pai',    tipo: 'cartao', dono: 'pai',  saldo: 640.00, vence: 'dia 10' },
      { id: 'cc-mae',     nome: 'Conta da Mãe',     tipo: 'conta',  dono: 'mae',  saldo: 2310.00 },
      { id: 'cartao-mae', nome: 'Cartão da Mãe',    tipo: 'cartao', dono: 'mae',  saldo: 880.00, vence: 'dia 10' }
    ],

    // descricao é sempre a de verdade. Quem não pode ver nunca recebe ela.
    lancamentos: [
      { id: 'l1',  tipo: 'entrada', descricao: 'Salário',                 valor: 4800.00, quem: 'pai', conta: 'cc-pai',      dia: '05', visibilidade: 'aberto' },
      { id: 'l2',  tipo: 'entrada', descricao: 'Salário',                 valor: 3900.00, quem: 'mae', conta: 'cc-mae',      dia: '05', visibilidade: 'aberto' },
      { id: 'l3',  tipo: 'entrada', descricao: 'Freela de fim de semana', valor: 620.00,  quem: 'pai', conta: 'cc-pai',      dia: '14', visibilidade: 'aberto' },

      { id: 'l4',  tipo: 'saida',   descricao: 'Aluguel',                 valor: 1850.00, quem: 'pai', conta: 'cc-casa',     dia: '05', visibilidade: 'aberto' },
      { id: 'l5',  tipo: 'saida',   descricao: 'Mercado do mês',          valor: 1240.00, quem: 'mae', conta: 'cartao-casa', dia: '07', visibilidade: 'aberto' },
      { id: 'l6',  tipo: 'saida',   descricao: 'Escola da Filha',         valor: 680.00,  quem: 'mae', conta: 'cc-casa',     dia: '10', visibilidade: 'aberto' },
      { id: 'l7',  tipo: 'saida',   descricao: 'Combustível',             valor: 320.00,  quem: 'pai', conta: 'cartao-pai',  dia: '12', visibilidade: 'aberto' },
      { id: 'l8',  tipo: 'saida',   descricao: 'Farmácia',                valor: 96.30,   quem: 'mae', conta: 'cartao-mae',  dia: '13', visibilidade: 'aberto' },
      { id: 'l9',  tipo: 'saida',   descricao: 'Internet',                valor: 129.90,  quem: 'pai', conta: 'cc-casa',     dia: '15', visibilidade: 'aberto' },

      // Nível "só no total": o outro vê o valor, não vê o que foi.
      { id: 'l10', tipo: 'saida',   descricao: 'Presente de aniversário do Pai', valor: 340.00, quem: 'mae', conta: 'cartao-mae', dia: '16', visibilidade: 'total' },
      { id: 'l11', tipo: 'saida',   descricao: 'Presente de aniversário da Filha', valor: 150.00, quem: 'pai', conta: 'cartao-pai', dia: '17', visibilidade: 'total' },

      // Nível "privado": o outro não vê, e não entra na soma dele.
      { id: 'l12', tipo: 'saida',   descricao: 'Terapia',                 valor: 260.00, quem: 'mae', conta: 'cc-mae',      dia: '11', visibilidade: 'privado' },
      { id: 'l13', tipo: 'saida',   descricao: 'Presente de aniversário de casamento', valor: 420.00, quem: 'pai', conta: 'cc-pai', dia: '18', visibilidade: 'privado' }
    ],

    // Contas do mês. emDias: 0 é hoje, 1 amanhã, negativo já passou.
    aPagar: [
      { id: 'p1', descricao: 'Aluguel',         valor: 1850.00, emDias: -15, quem: 'pai', pago: true  },
      { id: 'p2', descricao: 'Conta de luz',    valor: 287.40,  emDias: 1,   quem: 'pai', pago: false },
      { id: 'p3', descricao: 'Internet',        valor: 129.90,  emDias: 4,   quem: 'pai', pago: false },
      { id: 'p4', descricao: 'Cartão da casa',  valor: 1940.00, emDias: 5,   quem: 'casa',pago: false },
      { id: 'p5', descricao: 'Escola da Filha', valor: 680.00,  emDias: 7,   quem: 'mae', pago: false },
      { id: 'p6', descricao: 'Conta de água',   valor: 92.80,   emDias: 12,  quem: 'casa',pago: false }
    ]
  },

  /* ------------------------------------------------------------- avisos */
  // origem: de onde o aviso nasceu — aviso nunca é conversa solta.
  // acao: botão opcional. 'lista:Feijão' joga na lista; 'assumir:t4' assume a tarefa.
  avisos: [
    { id: 'a1', tipo: 'despensa', origem: 'Despensa · Feijão',
      titulo: 'Feijão em falta há 4 dias',
      detalhe: 'Ninguém colocou na lista de compras ainda.',
      quando: 'há 10 minutos', lido: false, acao: { texto: 'Jogar na lista', cmd: 'lista:Feijão' } },

    { id: 'a2', tipo: 'conta', origem: 'Tarefa · Pagar a conta de luz',
      titulo: 'A conta de luz vence amanhã',
      detalhe: 'R$ 287,40 · responsável: Pai · avisado com 1 dia de antecedência.',
      quando: 'hoje, 08:00', lido: false },

    { id: 'a3', tipo: 'tarefa', origem: 'Tarefa · Faxina do banheiro',
      titulo: 'Uma tarefa está sem responsável',
      detalhe: 'Prazo domingo. Qualquer um da casa pode assumir.',
      quando: 'hoje, 07:40', lido: false, acao: { texto: 'Assumir', cmd: 'assumir:t4' } },

    { id: 'a4', tipo: 'agenda', origem: 'Agenda · Reunião de pais',
      titulo: 'Reunião de pais amanhã às 19h',
      detalhe: 'Escola da Filha. 2 comentários no compromisso.',
      quando: 'hoje, 07:00', lido: true },

    { id: 'a5', tipo: 'tarefa', origem: 'Tarefa · Trocar a água do filtro',
      titulo: 'Filha concluiu uma tarefa',
      detalhe: 'Concluir não depende da aprovação de ninguém.',
      quando: 'ontem, 19:12', lido: true }
  ],

  /* --------------------------------------------------------- assistente */
  assistente: {
    nome: 'Assistente da casa',
    // Conversa que já está na tela quando o app abre.
    // de: 'agente' ou o id de um membro. tipo: '' | 'proativo' | 'confirmacao'
    conversa: [
      { de: 'agente', tipo: 'proativo', hora: '07:02',
        texto: 'Bom dia. Hoje tem três coisas: o lixo à noite (Filho), buscar a Filha às 17h30 e a conta de luz, que vence amanhã.' },

      { de: 'mae', hora: '07:15', texto: 'o que tem pra hoje?' },

      { de: 'agente', hora: '07:15',
        texto: 'Suas: buscar a Filha às 17h30. Da casa: lixo às 19h com o Filho, e a faxina do banheiro continua sem ninguém.',
        lista: ['17:30 · Buscar a Filha na escola — você',
                '19:00 · Levar o lixo para fora — Filho',
                'sem prazo definido · Faxina do banheiro — livre'] },

      { de: 'agente', tipo: 'proativo', hora: '11:40',
        texto: 'O feijão está em falta há 4 dias e ninguém colocou na lista. Quer que eu coloque?' },

      { de: 'pai', hora: '11:42', texto: 'pode colocar' },

      { de: 'agente', hora: '11:42', texto: 'Coloquei.',
        cartao: { tipo: 'compras', titulo: 'Feijão', detalhe: 'entrou em Compras da semana' } },

      { de: 'filho', hora: '13:20', texto: 'quanto a mãe gastou no cartão esse mês?' },

      { de: 'agente', hora: '13:20', cadeado: true,
        texto: 'Esse lançamento é particular da Mãe. Não posso mostrar, nem por cima — se eu desse o total da casa agora, dava para deduzir o valor dela.' },

      { de: 'pai', hora: '13:50', texto: 'apaga a tarefa da faxina' },

      { de: 'agente', tipo: 'confirmacao', hora: '13:50',
        texto: 'Isso apaga "Faxina do banheiro" (prazo domingo, sem responsável). Apagar não tem volta — confirma?',
        confirmar: 'Apaguei a tarefa "Faxina do banheiro".',
        cancelar: 'Certo, deixei a tarefa como está.' },

      // Dinheiro com a permissão de quem perguntou. Os valores entre chaves
      // — {entrou}, {saiu}, {aPagar} — são calculados na hora, do ponto de
      // vista de quem está olhando. Não precisa acertar número à mão.
      { de: 'pai', hora: '14:05', texto: 'quanto a gente gastou esse mês?' },

      { de: 'agente', hora: '14:05',
        texto: 'Entraram {entrou} e saíram {saiu}. Sobram {sobra} este mês, já tirando as contas que ainda faltam ({aPagar}).',
        lista: ['Aluguel, mercado e escola são a maior parte da saída',
                'A próxima a vencer é a conta de luz, amanhã'],
        nota: 'Esse número é o que a sua permissão alcança. Lançamento privado de qualquer pessoa fica de fora dele — e eu não digo nem se existe, porque dizer já seria contar.' },
    ],

    // Frases prontas que o dono pode tocar na demonstração.
    // acao: 'compra:Nome' cria item de compra · 'tarefa:Título|Prazo' cria tarefa
    sugestoes: [
      { texto: 'acabou o café',
        resposta: 'Coloquei na lista.',
        cartao: { tipo: 'compras', titulo: 'Café', detalhe: 'entrou em Compras da semana' },
        acao: 'compra:Café' },

      { texto: 'lembrar de pagar o IPTU dia 10',
        resposta: 'Criei a tarefa.',
        cartao: { tipo: 'tarefa', titulo: 'Pagar o IPTU', detalhe: 'prazo dia 10 · sem responsável' },
        acao: 'tarefa:Pagar o IPTU|Dia 10' },

      { texto: 'o que tem pra hoje?',
        resposta: 'Três tarefas para hoje e a conta de luz vencendo amanhã.',
        lista: ['17:30 · Buscar a Filha na escola — Mãe',
                '19:00 · Levar o lixo para fora — Filho',
                'amanhã · Conta de luz, R$ 287,40 — Pai'] },

      { texto: 'o que está faltando em casa?',
        resposta: 'Feijão e café acabaram. Leite e sabão em pó estão no fim.',
        lista: ['Feijão — em falta há 4 dias', 'Café — acabou hoje',
                'Leite — 2 caixas', 'Sabão em pó — meio pacote'] },

      // listaAuto:'aPagar' monta a lista das contas em aberto na hora.
      { texto: 'quanto falta pagar este mês?',
        resposta: 'Faltam {aPagar} em contas até o fim do mês.',
        listaAuto: 'aPagar',
        nota: 'Contas da casa todo mundo da casa vê. O que é particular de alguém segue as regras de quem pode ver.' }
    ],

    // Respostas para quem digitar à mão. A primeira que casar uma palavra vence.
    // Se nada casar, usa `semResposta`.
    respostasLivres: [
      // Dinheiro vem primeiro de propósito: "quanto falta pagar" não pode
      // cair na regra de compras só porque tem a palavra "falta".
      { palavras: ['quanto', 'gast', 'dinheiro', 'saldo', 'fatura', 'cartão', 'cartao', 'despesa', 'entrou', 'sobrou'],
        resposta: 'Entraram {entrou} e saíram {saiu}. Sobram {sobra}, já tirando {aPagar} de contas que faltam.',
        nota: 'Esse número é o que a sua permissão alcança. Lançamento privado de qualquer pessoa fica de fora — e eu não digo nem se existe.' },
      { palavras: ['acabou', 'comprar', 'compra', 'falta', 'lista'],
        resposta: 'Coloquei na lista de compras.',
        acaoAuto: 'compra' },
      { palavras: ['lembrar', 'lembra', 'preciso', 'pagar', 'marcar', 'agendar'],
        resposta: 'Criei a tarefa.',
        acaoAuto: 'tarefa' },
      { palavras: ['hoje', 'agora', 'agenda', 'amanhã'],
        resposta: 'Hoje: lixo às 19h (Filho), buscar a Filha às 17h30 (Mãe). Amanhã vence a conta de luz.' },
      { palavras: ['apagar', 'apaga', 'excluir', 'remover', 'cancelar'],
        resposta: 'Apagar não tem volta, então prefiro confirmar antes. Me diga qual registro e eu pergunto direitinho.',
        cadeado: true }
    ],
    semResposta: 'Anotei. Nesta demonstração eu só sei responder sobre tarefas, compras, despensa, agenda e dinheiro desta casa.'
  }
};
