const BASIC_CHARS = [
  { id: 'aurek',  letter: 'a', render: 'a', name: 'Aurek', hints: [
    { type: 'shape', text: 'An Axe blade from the side -- A for Axe' },
    { type: 'story', text: 'An Arrowhead in flight -- A for Arrow' },
  ]},
  { id: 'besh',   letter: 'b', render: 'b', name: 'Besh', hints: [
    { type: 'shape', text: 'A Burger -- bun, patty, bun' },
    { type: 'story', text: 'Stacked Buns -- B for layers of Bread' },
  ]},
  { id: 'cresh',  letter: 'c', render: 'c', name: 'Cresh', hints: [
    { type: 'shape', text: 'Chopsticks standing up' },
    { type: 'story', text: 'Two tall Columns side by side' },
  ]},
  { id: 'dorn',   letter: 'd', render: 'd', name: 'Dorn', hints: [
    { type: 'shape', text: 'A Diving board from the side' },
    { type: 'story', text: 'A Doorframe -- just the top and one side' },
  ]},
  { id: 'esk',    letter: 'e', render: 'e', name: 'Esk', hints: [
    { type: 'shape', text: 'Rabbit Ears on an old TV -- E for Ears' },
    { type: 'story', text: 'A crown with two points -- E for Emperor' },
  ]},
  { id: 'forn',   letter: 'f', render: 'f', name: 'Forn', hints: [
    { type: 'shape', text: 'Looks like an F lying on its side' },
    { type: 'story', text: 'Four points on a plus sign' },
  ]},
  { id: 'grek',   letter: 'g', render: 'g', name: 'Grek', hints: [
    { type: 'shape', text: 'Looks like a lowercase g tipped over' },
    { type: 'story', text: 'A Gutter catching rain' },
  ]},
  { id: 'herf',   letter: 'h', render: 'h', name: 'Herf', hints: [
    { type: 'shape', text: 'The Hamburger menu icon -- H for Hamburger' },
    { type: 'story', text: 'Three Horizontal bars stacked up' },
  ]},
  { id: 'isk',    letter: 'i', render: 'i', name: 'Isk', hints: [
    { type: 'shape', text: 'Looks exactly like the letter I' },
    { type: 'story', text: 'The simplest one -- I is just one stroke' },
  ]},
  { id: 'jenth',  letter: 'j', render: 'j', name: 'Jenth', hints: [
    { type: 'shape', text: 'A fishhook -- J for the J-hook shape' },
    { type: 'story', text: 'A bent Javelin thrown at an angle' },
  ]},
  { id: 'krill',  letter: 'k', render: 'k', name: 'Krill', hints: [
    { type: 'shape', text: 'A backwards C with a tail at the bottom' },
    { type: 'story', text: 'A Kite with a string hanging down -- K for Kite' },
  ]},
  { id: 'leth',   letter: 'l', render: 'l', name: 'Leth', hints: [
    { type: 'shape', text: 'A Leaning line -- L for Lean' },
    { type: 'story', text: 'A single diagonal Line -- L for Line' },
  ]},
  { id: 'mern',   letter: 'm', render: 'm', name: 'Mern', hints: [
    { type: 'shape', text: 'An open bracket -- like a squared C opening right' },
    { type: 'story', text: 'A Mailbox opening -- M for the slot on the right' },
  ]},
  { id: 'nern',   letter: 'n', render: 'n', name: 'Nern', hints: [
    { type: 'shape', text: 'A Needle stitching in and out' },
    { type: 'story', text: 'Notches carved into wood' },
  ]},
  { id: 'osk',    letter: 'o', render: 'o', name: 'Osk', hints: [
    { type: 'shape', text: 'A trapezoid -- flat top, wider at the base' },
    { type: 'story', text: 'A bucket from the side -- O for the Open top' },
  ]},
  { id: 'peth',   letter: 'p', render: 'p', name: 'Peth', hints: [
    { type: 'shape', text: 'A Pot or bucket from the side' },
    { type: 'story', text: 'A Planter box holding soil -- P for Planter' },
  ]},
  { id: 'qek',    letter: 'q', render: 'q', name: 'Qek', hints: [
    { type: 'shape', text: 'A Quarter of the letter Q -- just the curve' },
    { type: 'story', text: 'A crescent -- Q for Quarter moon' },
  ]},
  { id: 'resh',   letter: 'r', render: 'r', name: 'Resh', hints: [
    { type: 'shape', text: 'A Right angle -- look at the corner' },
    { type: 'story', text: 'A Ramp going up then dropping straight down' },
  ]},
  { id: 'senth',  letter: 's', render: 's', name: 'Senth', hints: [
    { type: 'shape', text: 'A Snake slithering in zigzags' },
    { type: 'story', text: 'Sharp points like the teeth of a Saw blade' },
  ]},
  { id: 'trill',  letter: 't', render: 't', name: 'Trill', hints: [
    { type: 'shape', text: 'Looks like an upside-down T' },
    { type: 'story', text: 'A sword pointing down -- the cross-guard makes the T' },
  ]},
  { id: 'usk',    letter: 'u', render: 'u', name: 'Usk', hints: [
    { type: 'shape', text: 'Looks exactly like the letter U' },
    { type: 'story', text: 'The easiest one -- it IS the letter U' },
  ]},
  { id: 'vev',    letter: 'v', render: 'v', name: 'Vev', hints: [
    { type: 'shape', text: 'A Vine branching into a V shape' },
    { type: 'story', text: 'A tree trunk splitting -- V for the fork' },
  ]},
  { id: 'wesk',   letter: 'w', render: 'w', name: 'Wesk', hints: [
    { type: 'shape', text: 'A Window frame' },
    { type: 'story', text: 'Four Walls around an empty room' },
  ]},
  { id: 'xesh',   letter: 'x', render: 'x', name: 'Xesh', hints: [
    { type: 'shape', text: 'A triangle -- two sides meeting at a pointed peak' },
    { type: 'story', text: 'A tent frame -- X marks the peak at the top' },
  ]},
  { id: 'yirt',   letter: 'y', render: 'y', name: 'Yirt', hints: [
    { type: 'shape', text: 'A slingshot -- the Y-shaped fork' },
    { type: 'story', text: 'A fork in the road -- which waY do you go?' },
  ]},
  { id: 'zerek',  letter: 'z', render: 'z', name: 'Zerek', hints: [
    { type: 'shape', text: 'One step of a Zigzag staircase' },
    { type: 'story', text: 'The last letter takes a sharp turn -- Z for the final Zigzag' },
  ]},
];

const DIGRAPH_CHARS = [
  { id: 'cherek',  letter: 'ch', render: 'ç', name: 'Cherek', hints: [
    { type: 'shape', text: 'A squared bracket with sharp right-angle corners' },
    { type: 'story', text: 'Like K (Krill) but angular and no tail at the bottom' },
  ]},
  { id: 'enth',    letter: 'ae', render: 'æ', name: 'Enth', hints: [
    { type: 'shape', text: 'The Æ symbol -- A and E fused into one circle' },
    { type: 'story', text: 'An Atom split down the middle -- AE for Atomic Energy' },
  ]},
  { id: 'onith',   letter: 'eo', render: 'ë', name: 'Onith', hints: [
    { type: 'shape', text: 'A peaked shape like a nEOn sign' },
    { type: 'story', text: 'A gEOdesic dome -- the triangle roof' },
  ]},
  { id: 'krenth',  letter: 'kh', render: 'ß', name: 'Krenth', hints: [
    { type: 'shape', text: 'K (Krill) with dots -- the dots mark it as KH, not plain K' },
    { type: 'story', text: 'K got freckles -- the dots are the H that makes it heavier' },
  ]},
  { id: 'nen',     letter: 'ng', render: 'ñ', name: 'Nen', hints: [
    { type: 'shape', text: 'Looks like a haNGer -- the hook shape' },
    { type: 'story', text: 'A boomeraNG -- the curved shape that comes back' },
  ]},
  { id: 'shen',    letter: 'sh', render: 'ø', name: 'Shen', hints: [
    { type: 'shape', text: 'Two halves of a SHell -- a clam opening up' },
    { type: 'story', text: 'Hands pressing together -- SHush' },
  ]},
  { id: 'thesh',   letter: 'th', render: 'þ', name: 'Thesh', hints: [
    { type: 'shape', text: 'A T wearing a hat -- the hat is the H' },
    { type: 'story', text: 'T with a THorn on top' },
  ]},
];

const ALL_CHARS = [...BASIC_CHARS, ...DIGRAPH_CHARS];

const DIGRAPHS = ['ch', 'sh', 'th', 'ae', 'eo', 'kh', 'ng'];

function containsDigraph(word) {
  const w = word.toLowerCase();
  return DIGRAPHS.some(d => w.includes(d));
}

const WORD_LISTS = {
  2: [
    'am', 'an', 'as', 'at', 'be', 'by', 'do', 'go', 'he', 'if',
    'in', 'is', 'it', 'me', 'my', 'no', 'of', 'on', 'or', 'up',
  ],
  3: [
    'act', 'add', 'age', 'all', 'and', 'arm', 'art', 'bad', 'bed', 'big',
    'box', 'boy', 'bug', 'bus', 'but', 'can', 'car', 'cat', 'cup', 'cut',
    'day', 'did', 'dig', 'dog', 'dry', 'ear', 'eat', 'egg', 'end', 'eye',
    'fan', 'far', 'fat', 'fix', 'fly', 'for', 'fox', 'fun', 'gas', 'get',
    'god', 'got', 'gun', 'guy', 'gym', 'had', 'ham', 'hat', 'her', 'him',
    'hit', 'hot', 'how', 'ice', 'its', 'jam', 'jar', 'jaw', 'jet', 'job',
    'joy', 'key', 'kid', 'law', 'leg', 'let', 'lie', 'lip', 'log', 'lot',
    'low', 'mad', 'man', 'map', 'men', 'mix', 'mud', 'net', 'new', 'nor',
    'not', 'now', 'nut', 'odd', 'off', 'oil', 'old', 'one', 'our', 'out',
    'own', 'pay', 'pet', 'pie', 'pig', 'pin', 'pit', 'pop', 'pot', 'put',
    'ran', 'raw', 'red', 'rid', 'rob', 'rod', 'row', 'run', 'sad', 'sat',
    'saw', 'say', 'sea', 'set', 'sir', 'sit', 'six', 'sky', 'son', 'spy',
    'sum', 'sun', 'ten', 'tie', 'tip', 'top', 'try', 'two', 'use', 'van',
    'war', 'was', 'way', 'web', 'wet', 'win', 'yes', 'yet', 'you',
  ],
  4: [
    'able', 'army', 'away', 'baby', 'back', 'ball', 'band', 'bank', 'base',
    'bear', 'beat', 'bell', 'best', 'bill', 'bird', 'blue', 'body', 'bone',
    'born', 'burn', 'busy', 'call', 'calm', 'camp', 'card', 'care', 'city',
    'club', 'cold', 'come', 'copy', 'crew', 'dark', 'data', 'dead', 'deal',
    'deep', 'deny', 'dirt', 'down', 'draw', 'drop', 'drug', 'dust', 'duty',
    'earn', 'east', 'edge', 'else', 'evil', 'exit', 'face', 'fact', 'fail',
    'fair', 'fall', 'farm', 'fast', 'fear', 'feed', 'feel', 'fill', 'film',
    'find', 'fire', 'firm', 'five', 'flat', 'flip', 'flow', 'fold', 'form',
    'four', 'free', 'from', 'fuel', 'full', 'fund', 'gain', 'game', 'gave',
    'gift', 'girl', 'give', 'glad', 'goal', 'gold', 'golf', 'grab', 'gray',
    'grew', 'grow', 'gulf', 'hair', 'half', 'hall', 'hand', 'hate', 'have',
    'hear', 'heat', 'help', 'here', 'hero', 'hide', 'hill', 'hire', 'hold',
    'hole', 'holy', 'home', 'hope', 'host', 'hurt', 'idea', 'iron', 'item',
    'jack', 'join', 'joke', 'jury', 'just', 'keen', 'keep', 'kept', 'kill',
    'kind', 'knew', 'lady', 'laid', 'lake', 'land', 'last', 'late', 'lawn',
    'lead', 'left', 'less', 'life', 'lift', 'like', 'line', 'link', 'list',
    'live', 'load', 'loan', 'lock', 'lord', 'lose', 'loss', 'lost', 'love',
    'luck', 'made', 'mail', 'main', 'make', 'male', 'many', 'mark', 'mass',
    'meet', 'mile', 'milk', 'mind', 'mine', 'miss', 'mode', 'more', 'most',
    'move', 'must', 'name', 'navy', 'near', 'neat', 'neck', 'need', 'news',
    'next', 'nice', 'nine', 'nose', 'note', 'obey', 'only', 'open', 'over',
    'paid', 'pair', 'palm', 'park', 'part', 'pass', 'past', 'peak', 'pick',
    'pile', 'pipe', 'plan', 'play', 'plot', 'plus', 'poll', 'port', 'pour',
    'pray', 'pull', 'pump', 'pure', 'quit', 'race', 'rain', 'rank', 'rare',
    'rate', 'read', 'real', 'rear', 'rely', 'rent', 'rest', 'rice', 'ride',
    'rise', 'risk', 'road', 'rock', 'role', 'roll', 'rope', 'rule', 'safe',
    'said', 'sale', 'salt', 'same', 'sand', 'save', 'seat', 'seed', 'seek',
    'seem', 'self', 'sell', 'send', 'side', 'sign', 'site', 'size', 'skin',
    'slip', 'slow', 'snap', 'snow', 'soft', 'soil', 'sold', 'some', 'sort',
    'soul', 'spin', 'spot', 'star', 'stay', 'stem', 'step', 'stop', 'suit',
    'sure', 'swim', 'tail', 'take', 'talk', 'tall', 'tank', 'tape', 'task',
    'team', 'tear', 'tell', 'term', 'test', 'text', 'time', 'tiny', 'tire',
    'told', 'tone', 'torn', 'tour', 'town', 'trap', 'tree', 'trip', 'true',
    'tube', 'turn', 'twin', 'type', 'unit', 'upon', 'used', 'vast', 'very',
    'vote', 'wait', 'wake', 'walk', 'wall', 'want', 'warm', 'warn', 'wave',
    'weak', 'wear', 'week', 'well', 'went', 'west', 'wide', 'wife', 'wild',
    'will', 'wind', 'wine', 'wire', 'wise', 'woke', 'wolf', 'word', 'wore',
    'work', 'worn', 'wrap', 'yard', 'year', 'zero', 'zone',
  ],
};

function getWordList(length) {
  return WORD_LISTS[length] || [];
}

const LEARN_GROUPS = [
  ['esk', 'trill', 'aurek'],
  ['osk', 'isk', 'nern'],
  ['senth', 'herf', 'resh'],
  ['dorn', 'leth', 'usk'],
  ['cresh', 'mern', 'forn'],
  ['peth', 'grek', 'wesk'],
  ['yirt', 'besh', 'vev'],
  ['krill', 'jenth', 'xesh'],
  ['qek', 'zerek'],
  ['cherek', 'enth', 'onith', 'krenth', 'nen', 'shen', 'thesh'],
];

const DIGRAPH_MAP = {};
for (const ch of DIGRAPH_CHARS) {
  DIGRAPH_MAP[ch.letter] = ch.render;
}

const SORTED_DIGRAPHS = Object.keys(DIGRAPH_MAP).sort((a, b) => b.length - a.length);

function toAurebeshText(str) {
  let result = str.toLowerCase();
  for (const digraph of SORTED_DIGRAPHS) {
    result = result.replaceAll(digraph, DIGRAPH_MAP[digraph]);
  }
  return result;
}

const CONFUSABLE_PAIRS = [
  { ids: ['dorn', 'resh'], tip: 'D has the dash on top. R is the right angle.' },
  { ids: ['krill', 'cherek', 'qek'], tip: 'Q is the simplest -- just a C. K adds a tail at the bottom. CH has sharp right-angle corners.' },
  { ids: ['osk', 'xesh'], tip: 'O is a trapezoid (flat top). X is a triangle (pointed top).' },
  { ids: ['nern', 'senth'], tip: 'N has rounded zigzags (needle stitches). S has sharp pointed zigzags (saw teeth).' },
  { ids: ['mern', 'zerek'], tip: 'M is an open bracket (no middle bar). Z adds a shelf in the middle.' },
];

function getCharById(id) {
  return ALL_CHARS.find(c => c.id === id);
}

function getHintsForChar(ch, progressRecord) {
  const hints = [...ch.hints];
  if (progressRecord && progressRecord.customHint) {
    hints.push({ type: 'custom', text: progressRecord.customHint });
  }
  return hints;
}

function getPinnedHintText(ch, progressRecord) {
  const hints = getHintsForChar(ch, progressRecord);
  if (!progressRecord || !progressRecord.pinnedHint) return hints[0].text;
  if (progressRecord.pinnedHint.source === 'custom' && progressRecord.customHint) {
    return progressRecord.customHint;
  }
  if (progressRecord.pinnedHint.source === 'curated') {
    const idx = progressRecord.pinnedHint.index;
    if (idx < ch.hints.length) return ch.hints[idx].text;
  }
  return hints[0].text;
}
