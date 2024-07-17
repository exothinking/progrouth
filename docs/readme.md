# ProGrouth
> Grouth é um jogo de palavra com growth.

# Concepção do produto

A ideia do produto é ser um uma plataforma de `Gamificação de Processos` de forma geral, API First, baseada em eventos, feita para ser integrada a outras plataformas e sistemas.

# O Jogo (as ações dos players semeiam seu progresso)

Cada usuário é um `Player` dentro da plataforma e cada um participa de um sistema de progresso customizado e definido a nível de `Company`, segregado em temporadas. Ex: player1 atingiu o nível de progresso X até o final dessa temporada (últimos 6 meses) e, portanto, tem direito a recompensas.

## O Sistema de Progresso (Status e Badges)

O responsável definirá um conjunto de `Status` que será comum à todos os players, definirá o início de uma `Season` e então as ações dos players terão como efeito gerar `Progression` em cada um dos status, aumentando o nível do status conforme acumula progresso/progressão.

Conforme cada player aumenta o nível dos seus status ele ganha, automaticamente, `Badges` como recompensa por alcançar determinados níveis específicos em um conjunto determinado de status. Esses badges e as `BadgeConditions` necessárias para ter direito à eles também são configurados pelo responsável a nível de empresa.

Exemplo de cenário customizado para equipe de desenvolvimento:

### Lista de `Status` possíveis

Resolução de Tickets 
 - name: `Resolução de Tickets` (nome que será exibido nos relatórios formais)
 - badassName: `Caos Handling` (nome for fun que será exibido na plataforma para os players)
 - maxLevel: 30 (nível máximo desse status que cada player poderá alcançar por temporada)

Entrega de Inovação
 - name: `Entrega de Inovação`
 - badassName: `Gearing`
 - maxLevel: 20

Entrega de Spyke (pesquisa técnica)
 - name: `Entrega de Spike`
 - badassName: `Alchemy Research`
 - maxLevel: 8

Resolução de dívida técnica
 - name: `Resolução de dívida técnica`
 - badassName: `Rust cleaning`
 - maxLevel: 15

Cadastro de dívida técnica
 - name: `Cadastro de dívida técnica`
 - badassName: `Give a shit tracking`
 - maxLevel: 10

### Lista de `Badges` relacionados aos `Status`

Atendimento excepcional
 - name: `Atendimento excepcional`
 - badassName: `Caos Mage`
 - requirements: `Caos Handling` lvl 25+

Cuidado excepcional com a saúde da empresa
 - name: `Cuidado excepcional com a saúde da empresa`
 - badassName: `Caos Nemesis`
 - requirements: `Caos Handling` lvl 15+, `Give a shit tracking` lvl 8+

Entrega de valor
 - name: `Entrega de valor`
 - badassName: `Mark I`
 - requirements: `Gearing` lvl 10+, `Rust cleaning` lvl 4+

Entrega de valor excelente
 - name: `Entrega de valor excelente`
 - badassName: `Tony Stark`
 - requirements: `Gearing` lvl 18+ 

Inovação
 - name: `Inovação`
 - badassName: `Acolyte`
 - requirements: `Alchemy research` lvl 2+, `Gearing` lvl 5+

Inovação excelente
 - name: `Inovação excelente`
 - badassName: `Master of Nature`
 - requirements: `Alchemy research` lvl 7+, `Gearing` lvl 10+ 

Atuação multidisciplinar
 - name: `Atuação multidisciplinar`
 - badassName: `F*** Omni Octopus`
 - requirements: `Caos Handling` lvl 3+, `Gearing` lvl 3+, `Alchemy Research` lvl 3+, `Rust cleaning` lvl 3+, `Give a shit tracking` lvl 3+

 > Esses são apenas exemplos, o responsável pode ser criativo e utilizar o gosto geral do time para pensar em títulos que façam sentido dentro da brincadeira.

 > O balanceamento dos REQUISITOS DOS BADGES também é totalmente customizável e caberá ao responsável experimentar ou aplicar algum racional que faça sentido para a sua realidade, dentro da forma como ele planeja recompensar o time pelos feitos. Além disso existe o balanceamento customizável da CADÊNCIA DO PROGRESSO EM CADA STATUS, como será descrito abaixo.

## O Balanceamento do Progresso (Seeds)

O progresso em cada um dos status é feito através do acúmulo de `Seeds` (o progresso é semeado pelas próprias ações dos players).

Cada status tem um volume arbitrário e fixo de 100 pontos de progresso para que se atinja cada um dos níveis. Ex: Para alcançar o nível 3 de `Gearing` é necessário que o player acumule 300 pontos de progresso através de um número qualquer de seeds de `Gearing`.

Portanto o balanceamento é feito através do `size`, do tamanho, ou seja, do **Número de Pontos de Progresso** que cada `Seed` confere ao status para a qual foi criada. 

Ex: O responsável pode cadastrar 2 tipos de seeds para o progresso em `Caos Handling (resolução de tickets)`:

- `Medium Caos Handling Seed` size: 10 
> cada vez que um player receber essa seed ele vai ganhar 10 pontos de progresso em `Caos Hanling`

- `Great Caos Handling Seed` size: 70 
> cada vez que um player receber essa seed ele vai ganhar 70 pontos de progresso em `Caos Hanling`

Então o responsável pode definir que toda vez que um player fechar um ticket com até 2 dias de atraso no SLA, ele receberá uma `Medium Caos Handling Seed`. E toda vez que um player fechar um ticket dentro do SLA ele receberá uma `Great Caos Handling Seed`. Assim os players serão incentivados a fechar os tickets antes do fim do SLA, pois progredirão mais rapidamente o seu status de `Caos Handling`.

## As recompensas reais

A recompensa para cada uma das conquistas fica à cargo da empresa, o responsável poderá cadastrar um descritivo para cada season onde serão exibidas as recompensas e todos os players ficarão sabendo o que os espera no final da corrida.