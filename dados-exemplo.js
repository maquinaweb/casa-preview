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
    { nome: 'Sabão em pó', local: 'Área de serviço', situacao: 'pouco', detalhe: 'meio pacote' },
    { nome: 'Macarrão', local: 'Armário da cozinha', situacao: 'ok',    detalhe: '2 pacotes' },
    { nome: 'Molho de tomate', local: 'Armário da cozinha', situacao: 'falta', detalhe: 'acabou ontem' }
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

    { id: 'a6', tipo: 'documento', origem: 'Documento · Seguro do carro',
      titulo: 'O seguro do carro vence em 12 dias',
      detalhe: 'Documento guardado em Documentos. O aviso nasceu sozinho, da data de validade.',
      quando: 'hoje, 06:00', lido: false },

    { id: 'a4', tipo: 'agenda', origem: 'Agenda · Reunião de pais',
      titulo: 'Reunião de pais amanhã às 19h',
      detalhe: 'Escola da Filha. 2 comentários no compromisso.',
      quando: 'hoje, 07:00', lido: true },

    { id: 'a5', tipo: 'tarefa', origem: 'Tarefa · Trocar a água do filtro',
      titulo: 'Filha concluiu uma tarefa',
      detalhe: 'Concluir não depende da aprovação de ninguém.',
      quando: 'ontem, 19:12', lido: true }
  ],

  /* --------------------------------------------------------------- comida */
  /* O nome é COMIDA, não cardápio — palavra de restaurante não entra em casa.
     Os rótulos são "Almoço" e "Janta", como se fala.

     A armadilha deste tipo de módulo é exigir planejar a semana num domingo:
     é assim que ele é abandonado na terceira semana. Então ANOTAR DEPOIS vale
     tanto quanto planejar antes, e dia em branco é normal — nunca vira
     cobrança nem aviso.

     Cada refeição é um de três estados, escolhidos num toque:
       'casa'  — comeu em casa, com o quê em `oque`
       'fora'  — saiu ou pediu; `gasto` opcional, nunca obrigatório
       'sobra' — comeu o que sobrou
       null    — ainda não combinaram, e está tudo bem
     `ingredientes` é opcional e só serve para o aviso leve de falta: não
     existe cadastro de receita, porque exigir isso mata o módulo.         */
  comida: {
    dias: [
      { id: 'c-1', emDias: -1,
        almoco: { estado: 'casa',  oque: 'Frango com batata' },
        janta:  { estado: 'sobra', oque: 'O que sobrou do almoço' } },

      { id: 'c0', emDias: 0,
        almoco: { estado: 'casa',  oque: 'Macarrão', ingredientes: ['Macarrão','Molho de tomate'] },
        janta:  { estado: null,    oque: '' } },

      { id: 'c1', emDias: 1,
        almoco: { estado: 'casa',  oque: 'Arroz, feijão e bife', ingredientes: ['Arroz','Feijão'] },
        janta:  { estado: 'fora',  oque: 'Pizza', gasto: null } },

      { id: 'c2', emDias: 2,
        almoco: { estado: null, oque: '' },
        janta:  { estado: null, oque: '' } },

      { id: 'c3', emDias: 3,
        almoco: { estado: 'casa',  oque: 'Peixe com legumes' },
        janta:  { estado: 'sobra', oque: 'O que sobrou do almoço' } },

      { id: 'c4', emDias: 4,
        almoco: { estado: 'fora',  oque: 'Churrasco na casa da avó', gasto: null },
        janta:  { estado: null,    oque: '' } },

      { id: 'c5', emDias: 5,
        almoco: { estado: null,   oque: '' },
        janta:  { estado: 'casa', oque: 'Sopa' } }
    ]
  },

  /* ----------------------------------------------------------- documentos */
  /* O que a casa precisa achar na hora que precisa. Duas coisas mandam aqui:
     a BUSCA (ninguém navega pasta) e a VALIDADE (documento que vence e
     ninguém lembra). Documento com `venceEmDias` vira aviso sozinho.

     Os mesmos três níveis do dinheiro valem aqui, com a leitura adaptada:
       'aberto'  — todo mundo da casa vê e abre.
       'total'   — a outra pessoa vê que o documento existe e o nome dele,
                   mas não abre. (No dinheiro isso era "vê o valor".)
       'privado' — a outra pessoa nem sabe que existe.
     quem: id do membro, ou 'casa' quando é dos dois.
     tipo: 'pdf' | 'foto' | 'planilha'                                     */
  documentos: [
    { id: 'd1', nome: 'Contrato de aluguel',        tipo: 'pdf',      quem: 'casa', data: '10/01/2026', tamanho: '2,4 MB', venceEmDias: null, visibilidade: 'aberto' },
    { id: 'd2', nome: 'Seguro do carro',            tipo: 'pdf',      quem: 'casa', data: '03/03/2026', tamanho: '1,1 MB', venceEmDias: 12,   visibilidade: 'aberto' },
    { id: 'd3', nome: 'Garantia da geladeira',      tipo: 'pdf',      quem: 'casa', data: '22/09/2024', tamanho: '640 KB', venceEmDias: 26,   visibilidade: 'aberto' },
    { id: 'd4', nome: 'IPVA pago',                  tipo: 'pdf',      quem: 'pai',  data: '14/02/2026', tamanho: '210 KB', venceEmDias: null, visibilidade: 'aberto' },
    { id: 'd5', nome: 'Nota fiscal da máquina de lavar', tipo: 'foto', quem: 'casa', data: '08/08/2025', tamanho: '3,2 MB', venceEmDias: null, visibilidade: 'aberto' },
    { id: 'd6', nome: 'Foto do RG da Filha',        tipo: 'foto',     quem: 'casa', data: '19/05/2025', tamanho: '1,8 MB', venceEmDias: null, visibilidade: 'aberto' },
    { id: 'd7', nome: 'Comprovante de residência',  tipo: 'pdf',      quem: 'casa', data: '05/09/2026', tamanho: '180 KB', venceEmDias: null, visibilidade: 'aberto' },
    { id: 'd8', nome: 'Planilha da reforma',        tipo: 'planilha', quem: 'casa', data: '30/06/2026', tamanho: '95 KB',  venceEmDias: null, visibilidade: 'aberto' },
    { id: 'd9', nome: 'Contrato de trabalho',       tipo: 'pdf',      quem: 'mae',  data: '01/02/2024', tamanho: '820 KB', venceEmDias: null, visibilidade: 'total' },
    { id: 'd10',nome: 'Exames da consulta',         tipo: 'pdf',      quem: 'mae',  data: '11/09/2026', tamanho: '1,4 MB', venceEmDias: null, visibilidade: 'privado' },
    { id: 'd11',nome: 'Apólice do seguro de vida',  tipo: 'pdf',      quem: 'pai',  data: '20/07/2026', tamanho: '760 KB', venceEmDias: null, visibilidade: 'privado' }
  ],

  /* -------------------------------------------------------------- viagens */
  /* A mecânica é dele, e é o coração do app: a viagem tem DOIS MOMENTOS do
     mesmo conteúdo. Primeiro planejando — lugares que alguém quis conhecer,
     bagunçado de propósito. Depois, quando a viagem acontece, o que foi
     acordado VIRA ROTEIRO por dia. O plano não é jogado fora: ele se converte,
     e cada item do roteiro guarda em `veioDe` o lugar que alguém sugeriu.

     estado: 'planejando' | 'acontecendo'
     lugar.querem: 'vamos' | 'talvez' | 'nao'                              */
  viagens: [
    {
      id: 'v1', nome: 'Fim de semana na serra', estado: 'acontecendo',
      quando: 'agora · dia 2 de 3', participantes: ['pai','mae','filho','filha'],
      convidados: [],
      lugares: [
        { id: 'p1', nome: 'Cachoeira do Salto',   quemSugeriu: 'filho', querem: 'vamos' },
        { id: 'p2', nome: 'Café colonial',        quemSugeriu: 'mae',   querem: 'vamos' },
        { id: 'p3', nome: 'Trilha do mirante',    quemSugeriu: 'pai',   querem: 'vamos' },
        { id: 'p4', nome: 'Parque de aventura',   quemSugeriu: 'filha', querem: 'talvez' }
      ],
      // O roteiro nasceu das escolhas acima. veioDe aponta para o lugar.
      roteiro: [
        { dia: 'Ontem', itens: [
          { hora: '14:00', titulo: 'Chegada e almoço', veioDe: null },
          { hora: '16:30', titulo: 'Café colonial', veioDe: 'p2' } ] },
        { dia: 'Hoje', itens: [
          { hora: '09:00', titulo: 'Trilha do mirante', veioDe: 'p3' },
          { hora: '13:00', titulo: 'Almoço na cidade', veioDe: null },
          { hora: '15:30', titulo: 'Cachoeira do Salto', veioDe: 'p1' } ] },
        { dia: 'Amanhã', itens: [
          { hora: '10:00', titulo: 'Volta para casa', veioDe: null } ] }
      ],
      reservas: [
        { nome: 'Pousada Vista Alta', tipo: 'hospedagem', anexo: 'PDF', feito: true },
        { nome: 'Café colonial — mesa para 4', tipo: 'reserva', anexo: '', feito: true }
      ],
      preparacao: [
        { texto: 'Levar casaco e bota', ok: true },
        { texto: 'Deixar a chave com a vizinha', ok: true }
      ],
      despesas: [
        { oque: 'Pousada', valor: 980.00, quem: 'pai' },
        { oque: 'Combustível', valor: 260.00, quem: 'pai' },
        { oque: 'Café colonial', valor: 214.00, quem: 'mae' }
      ],
      orcamento: 2200.00
    },
    {
      id: 'v2', nome: 'Praia em janeiro', estado: 'planejando',
      quando: 'janeiro · 5 dias, ainda sem data fechada',
      participantes: ['pai','mae','filho','filha'],
      convidados: [ { nome: 'Tia Cláudia', acesso: 'só esta viagem', ate: 'até o fim da viagem' } ],
      lugares: [
        { id: 'q1', nome: 'Praia do Forte',        quemSugeriu: 'mae',   querem: 'vamos'  },
        { id: 'q2', nome: 'Passeio de escuna',     quemSugeriu: 'filho', querem: 'vamos'  },
        { id: 'q3', nome: 'Projeto Tamar',         quemSugeriu: 'filha', querem: 'vamos'  },
        { id: 'q4', nome: 'Mergulho com cilindro', quemSugeriu: 'filho', querem: 'talvez' },
        { id: 'q5', nome: 'Restaurante do porto',  quemSugeriu: 'pai',   querem: 'talvez' },
        { id: 'q6', nome: 'Parque aquático',       quemSugeriu: 'filha', querem: 'nao'    }
      ],
      roteiro: [],   // vazio de propósito: a viagem ainda não aconteceu
      reservas: [
        { nome: 'Passagens', tipo: 'transporte', anexo: '', feito: false },
        { nome: 'Casa na praia', tipo: 'hospedagem', anexo: '', feito: false },
        { nome: 'Escuna — orçamento', tipo: 'passeio', anexo: 'PDF', feito: false }
      ],
      preparacao: [
        { texto: 'Conferir documento das crianças', ok: false },
        { texto: 'Ver se a Tia Cláudia vai mesmo', ok: false },
        { texto: 'Revisar o carro', ok: false }
      ],
      despesas: [],
      orcamento: 6000.00
    }
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

      { de: 'agente', tipo: 'proativo', hora: '17:40',
        texto: 'O que vai ter pra janta? Ninguém marcou ainda — se quiser, me diz e eu anoto.' },

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

      { texto: 'hoje a janta é pizza',
        resposta: 'Anotei a janta de hoje.',
        cartao: { tipo: 'comida', titulo: 'Pizza', detalhe: 'janta de hoje · fora' },
        acao: 'janta:Pizza' },

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
      { palavras: ['janta', 'jantar', 'almoço', 'almoco', 'comida', 'pizza'],
        resposta: 'Anotei a janta de hoje.',
        acaoAuto: 'comida' },
      { palavras: ['lembrar', 'lembra', 'preciso', 'pagar', 'marcar', 'agendar'],
        resposta: 'Criei a tarefa.',
        acaoAuto: 'tarefa' },
      { palavras: ['hoje', 'agora', 'agenda', 'amanhã'],
        resposta: 'Hoje: lixo às 19h (Filho), buscar a Filha às 17h30 (Mãe). Amanhã vence a conta de luz.' },
      { palavras: ['apagar', 'apaga', 'excluir', 'remover', 'cancelar'],
        resposta: 'Apagar não tem volta, então prefiro confirmar antes. Me diga qual registro e eu pergunto direitinho.',
        cadeado: true }
    ],
    semResposta: 'Anotei. Nesta demonstração eu só sei responder sobre tarefas, compras, despensa, agenda, comida e dinheiro desta casa.'
  }
};
