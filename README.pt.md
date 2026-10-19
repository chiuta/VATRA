# VATRA — A enciclopédia da sobrevivência

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · **Português** · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versão:** 1.3.0 · **Última atualização:** 2026-10-19

Idiomas da interface: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

**Aplicação online / demo:** https://chiuta.github.io/VATRA/

![VATRA — captura de ecrã](screenshot.png)

Guia de sobrevivência num único ficheiro HTML (`index.html`), em romeno: ~21 secções (água, fogo, abrigo, alimentação, nós, primeiros socorros, sinalização, navegação sem GPS, meteorologia, ambientes, desastres, fauna perigosa, recursos para a Roménia), kit de emergência interativo, calculadoras (água, calorias, hipotermia/hipertermia, azimute), bússola, glossário e teste de conhecimentos.

**Conteúdo educativo geral; não substitui um curso certificado de primeiros socorros ou de sobrevivência, a equipa de socorro local nem a avaliação médica especializada.** Numa emergência, na Roménia, ligue para o 112. As informações do guia (incluindo números, contactos, dados sobre fauna ou legislação) podem ficar desatualizadas; verifique as fontes oficiais. As calculadoras são indicativas.

## Utilização
Pesquise em todo o guia a partir do campo da barra lateral (atalho `/`).
Abra `index.html` num navegador (ou a versão publicada através do GitHub Pages); funciona offline. Tema «Noite»/«Dia» na barra lateral (a escolha é guardada). As marcações do kit, as suas próprias notas, o progresso do teste e o tema são guardados automaticamente em local no navegador (`localStorage`, chave `vatra:v1`); pode apagá-los na barra lateral («Apagar os dados guardados no navegador») ou exportá-los/importá-los como ficheiro.

## Novas funcionalidades (v1.1.0, 14 de outubro de 2026)

Sem novas funcionalidades de aprendizagem nesta versão: **a repetição espaçada já existe** (§19 Teste de conhecimentos, «Modo: Repetição espaçada», com exportação/importação do progresso) e não foi duplicada. O único acrescento é o kit abaixo.

### Transparência e cópia de segurança (fff-kit)

Um clique (ou Enter) na versão apresentada (`v 1.1.0 · 2026-10-14`) abre a janela «Transparência»: os anfitriões de rede declarados (0 pedidos externos), as chaves de armazenamento local com os tamanhos, as API utilizadas, o tamanho e o SHA-256 do ficheiro (com um verificador para um ficheiro transferido) e a **cópia de segurança** dos dados da aplicação num ficheiro `.fff.json` (opcionalmente cifrado com palavra-passe, AES-GCM 256 / PBKDF2; a palavra-passe não pode ser recuperada), a importação com confirmação e a eliminação dos dados da aplicação. O kit (`fff-kit`, módulos: core, label, bundle) está colado em `index.html`, não faz pedidos de rede e não altera os dados existentes; sem ele a aplicação funciona da mesma forma. A cópia de segurança do kit inclui a chave de armazenamento opcional da aplicação (se ativou a conservação no dispositivo), não o progresso do teste, que se exporta através de «Exportar o progresso». Os textos do kit estão em 8 línguas (ro, en, fr, it, es, pt, hu, de); **as traduções fr/it/es/pt/hu/de são automáticas e não foram verificadas por falantes nativos**. A interface da própria aplicação continua em romeno.

## Dados e privacidade
Verificado por auditoria: a página não faz pedidos de rede (0 pedidos ao carregar, sem `fetch`/CDN/tipos de letra externos) e não envia nada para lado nenhum; o único armazenamento é o `localStorage` local (chave `vatra:v1`, com as marcações do kit, as notas, o progresso do teste e o tema), tão privado quanto o próprio ficheiro. A geolocalização (o botão da calculadora de azimute) é usada apenas a pedido, localmente. As ligações externas (Salvamont, RO-ALERT, Cruz Vermelha, etc.) só se abrem ao clicar. Tem uma política CSP rigorosa (meta): sem ligações de rede (`connect-src 'none'`), script permitido apenas por hash SHA-256 (sem `unsafe-inline` para scripts), estilos inline.

## Limitações
- Fontes citadas apenas em parte (sem referências bibliográficas detalhadas); a estimativa da população de ursos tem agora fonte (AGERPRES, 10 de abril de 2025); a legislação sobre a intervenção relativa aos ursos muda com frequência (OUG 60/2025 e a lei subsequente) e não é citada artigo a artigo: consulte legislatie.just.ro.
- O teste de comestibilidade e os procedimentos de primeiros socorros são resumos gerais, não protocolos médicos.

## Licença

MIT — ver o ficheiro `LICENSE`. © 2026 Alexandru-Ionuț Chiuță (Alexio). Eventuais bibliotecas de terceiros incluídas no ficheiro mantêm as suas próprias licenças.

A ligação «Comunicar um erro» (GitHub) aponta agora para `chiuta/vatra`. As indicações médicas e de sobrevivência (incluindo o teste universal de comestibilidade, assinalado «apenas plantas, último recurso») continuam a ser conteúdo do autor, com o aviso presente na página e acima.

Auditoria: 2026-10-10

## Histórico / Changelog

### 1.2.0 — 2026-10-19
- Novo: na calculadora «Azimute e distância», a ligação «↗ O céu neste momento, no Bolta» (posição retirada dos campos, arredondada a ~1 km; abre num novo separador; aviso sobre o histórico).

### 1.1.0 — 2026-10-14
- fff-kit: a janela «Transparência» (clique na versão) e a cópia de segurança unificada `.fff.json`. O conteúdo e a repetição espaçada não mudaram.

### 1.0.4 — 2026-10-12
- A versão e a data da última atualização são apresentadas na aplicação (barra lateral).

### 1.0.3 — 11 de outubro de 2026 (ronda 7)
- Novo: pesquisa em todo o guia (campo na barra lateral, atalho `/`; sem distinção de diacríticos, resultados com excerto e salto para a passagem encontrada).
- Corrigido: nas secções que não a Página inicial, a página não tinha nenhum título de nível 1 (axe-core `page-has-heading-one`); agora o cabeçalho «VATRA» da barra lateral passa a título de nível 1 fora da Página inicial.

### 1.0.2 — 11 de outubro de 2026 (ronda 6)
- Acrescentado: gravação local automática do kit, das notas, do progresso do teste e do tema (com botão de eliminação); CSP com `script-src` por hash.

### 1.0.1 — 11 de outubro de 2026
- Corrigido: o título do hero já não mostra carateres aleatórios durante a animação (efeito de revelação; o texto final está sempre na página).
- Corrigido: acessibilidade: o cabeçalho móvel é um `<header>`, os títulos do rodapé são h3 (ordem correta); 0 violações axe-core a 1280 e 360 px.
- Acrescentado: política CSP rigorosa; versão 1.0.1 apresentada na barra lateral.
- Atualizado: dados sobre os ursos verificados em 11.10.2026 (fonte: AGERPRES, 10.04.2025); a formulação sobre a legislação já não afirma uma alteração não verificada de maio de 2026. Fontes verificadas em 11.10.2026.

