const BASIC_CHARS = [
  { id: 'aurek',  letter: 'a', render: 'a', name: 'Aurek', hints: [
    { type: 'shape', text: 'Looks like a K -- Aurek starts with A' },
    { type: 'story', text: 'An Arrow notched on a bowstring, pointing right' },
  ]},
  { id: 'besh',   letter: 'b', render: 'b', name: 'Besh', hints: [
    { type: 'shape', text: 'An eye on its side -- B for Blink' },
    { type: 'story', text: 'A Belt Buckle -- oval with a bar through the middle' },
  ]},
  { id: 'cresh',  letter: 'c', render: 'c', name: 'Cresh', hints: [
    { type: 'shape', text: 'Two Candles standing side by side' },
    { type: 'story', text: 'Chopsticks -- C for Chopsticks' },
  ]},
  { id: 'dorn',   letter: 'd', render: 'd', name: 'Dorn', hints: [
    { type: 'shape', text: 'A 7 with a Dash on top -- D for Dash' },
    { type: 'story', text: 'A Diving board -- the dash is the platform' },
  ]},
  { id: 'esk',    letter: 'e', render: 'e', name: 'Esk', hints: [
    { type: 'shape', text: 'Rabbit Ears on an old TV -- E for Ears' },
    { type: 'story', text: 'Two peaks like an EKG heartbeat' },
  ]},
  { id: 'forn',   letter: 'f', render: 'f', name: 'Forn', hints: [
    { type: 'shape', text: 'A plus sign with Feet -- F for Feet' },
    { type: 'story', text: 'Four points on a cross -- F for Four' },
  ]},
  { id: 'grek',   letter: 'g', render: 'g', name: 'Grek', hints: [
    { type: 'shape', text: 'A Gate seen from the side -- G for Gate' },
    { type: 'story', text: 'A Garage door with a handle on the right' },
  ]},
  { id: 'herf',   letter: 'h', render: 'h', name: 'Herf', hints: [
    { type: 'shape', text: 'The Hamburger menu icon -- H for Hamburger' },
    { type: 'story', text: 'Three Horizontal bars -- H for Horizontal' },
  ]},
  { id: 'isk',    letter: 'i', render: 'i', name: 'Isk', hints: [
    { type: 'shape', text: 'A single vertical stroke -- just like the letter I' },
    { type: 'story', text: 'The simplest glyph -- I is one line' },
  ]},
  { id: 'jenth',  letter: 'j', render: 'j', name: 'Jenth', hints: [
    { type: 'shape', text: 'A fishhook -- J curves at the bottom like a hook' },
    { type: 'story', text: 'A Javelin in flight, angled down' },
  ]},
  { id: 'krill',  letter: 'k', render: 'k', name: 'Krill', hints: [
    { type: 'shape', text: 'A backwards C with a Kick at the bottom -- K for Kick' },
    { type: 'story', text: 'A Kite with a tail hanging down' },
  ]},
  { id: 'leth',   letter: 'l', render: 'l', name: 'Leth', hints: [
    { type: 'shape', text: 'A single Leaning Line -- L for Lean' },
    { type: 'story', text: 'A slide at a playground -- L for the sLope' },
  ]},
  { id: 'mern',   letter: 'm', render: 'm', name: 'Mern', hints: [
    { type: 'shape', text: 'A squared bracket opening right -- like a Mouth' },
    { type: 'story', text: 'A Mailbox slot -- M for Mail' },
  ]},
  { id: 'nern',   letter: 'n', render: 'n', name: 'Nern', hints: [
    { type: 'shape', text: 'Rounded zigzag like a Needle stitching -- N for Needle' },
    { type: 'story', text: 'Soft wavy Notches -- N for Notch' },
  ]},
  { id: 'osk',    letter: 'o', render: 'o', name: 'Osk', hints: [
    { type: 'shape', text: 'A trapezoid -- like a bucket with an Open top' },
    { type: 'story', text: 'An Open box seen from the side -- O for Open' },
  ]},
  { id: 'peth',   letter: 'p', render: 'p', name: 'Peth', hints: [
    { type: 'shape', text: 'A Pot -- open at the top like a U shape' },
    { type: 'story', text: 'A Pocket -- P for the open Pouch' },
  ]},
  { id: 'qek',    letter: 'q', render: 'q', name: 'Qek', hints: [
    { type: 'shape', text: 'The simplest C-shape -- Q is the Quietest letter' },
    { type: 'story', text: 'A Quarter moon -- just a curved sliver' },
  ]},
  { id: 'resh',   letter: 'r', render: 'r', name: 'Resh', hints: [
    { type: 'shape', text: 'A 7 shape -- the Right angle at the corner' },
    { type: 'story', text: 'A Ramp going up then dropping straight down' },
  ]},
  { id: 'senth',  letter: 's', render: 's', name: 'Senth', hints: [
    { type: 'shape', text: 'Sharp pointed zigzag -- like a Snake' },
    { type: 'story', text: 'Saw teeth -- S for the sharp jagged edge' },
  ]},
  { id: 'trill',  letter: 't', render: 't', name: 'Trill', hints: [
    { type: 'shape', text: 'A downward arrow -- T for the Top crossbar' },
    { type: 'story', text: 'A sword pointing down -- the cross-guard makes the T' },
  ]},
  { id: 'usk',    letter: 'u', render: 'u', name: 'Usk', hints: [
    { type: 'shape', text: 'A squared U shape -- it looks like U' },
    { type: 'story', text: 'The easiest one -- it IS the letter U' },
  ]},
  { id: 'vev',    letter: 'v', render: 'v', name: 'Vev', hints: [
    { type: 'shape', text: 'A Y shape -- a trunk splitting into a V at the top' },
    { type: 'story', text: 'A tree branching into a V fork' },
  ]},
  { id: 'wesk',   letter: 'w', render: 'w', name: 'Wesk', hints: [
    { type: 'shape', text: 'A square -- four Walls make a W' },
    { type: 'story', text: 'A Window frame -- W for Window' },
  ]},
  { id: 'xesh',   letter: 'x', render: 'x', name: 'Xesh', hints: [
    { type: 'shape', text: 'The two sides are the strokes of an X, pushed together at the peak' },
    { type: 'transform', text: 'Remove the bottom line and cross the top two to form an X' },
    { type: 'story', text: 'A tent made from two X sticks leaning together' },
  ]},
  { id: 'yirt',   letter: 'y', render: 'y', name: 'Yirt', hints: [
    { type: 'shape', text: 'An upside-down Y -- the fork points up' },
    { type: 'story', text: 'A slingshot -- Y for the Y-shaped fork' },
  ]},
  { id: 'zerek',  letter: 'z', render: 'z', name: 'Zerek', hints: [
    { type: 'shape', text: 'Like M but with a bar across the middle -- Z adds the Zigzag' },
    { type: 'story', text: 'A staircase step -- Z for Zigzag' },
  ]},
];

const DIGRAPH_CHARS = [
  { id: 'cherek',  letter: 'ch', render: 'ç', name: 'Cherek', hints: [
    { type: 'shape', text: 'Like K but with sharp right-angle Corners -- CH for Corners' },
    { type: 'story', text: 'A CHest or box lid opening -- angular and boxy' },
  ]},
  { id: 'enth',    letter: 'ae', render: 'æ', name: 'Enth', hints: [
    { type: 'shape', text: 'A circle split in half -- A and E fused together' },
    { type: 'story', text: 'An Atom split down the middle -- AE for Atomic Energy' },
  ]},
  { id: 'onith',   letter: 'eo', render: 'ë', name: 'Onith', hints: [
    { type: 'shape', text: 'A peaked roof shape -- like a nEOn sign on a building' },
    { type: 'story', text: 'A gEOdesic dome -- the angled roof' },
  ]},
  { id: 'krenth',  letter: 'kh', render: 'ß', name: 'Krenth', hints: [
    { type: 'shape', text: 'K (Krill) plus dots -- the dots add the H sound' },
    { type: 'story', text: 'K with freckles -- the heavier version of K' },
  ]},
  { id: 'nen',     letter: 'ng', render: 'ñ', name: 'Nen', hints: [
    { type: 'shape', text: 'A haNGer hook -- NG for haNGer' },
    { type: 'story', text: 'A boomeraNG -- the curved shape that comes back' },
  ]},
  { id: 'shen',    letter: 'sh', render: 'ø', name: 'Shen', hints: [
    { type: 'shape', text: 'Two halves of a SHell -- a clam opening up' },
    { type: 'story', text: 'Hands pressing together -- SHush' },
  ]},
  { id: 'thesh',   letter: 'th', render: 'þ', name: 'Thesh', hints: [
    { type: 'shape', text: 'T with a THorn poking up from the top' },
    { type: 'story', text: 'A THumbstick on a game controller' },
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
  5: [
    'about', 'above', 'admit', 'adult', 'agent', 'agree', 'alarm', 'album',
    'alert', 'align', 'alive', 'allow', 'alone', 'alter', 'apple', 'apply',
    'avoid', 'award', 'aware', 'badly', 'basic', 'begin', 'below', 'bible',
    'blade', 'blame', 'blind', 'block', 'blood', 'board', 'bonus', 'brain',
    'brand', 'brave', 'bread', 'break', 'brief', 'broad', 'broke', 'brown',
    'build', 'built', 'buyer', 'cabin', 'cable', 'carry', 'claim', 'class',
    'clean', 'clear', 'climb', 'clock', 'close', 'cloud', 'color', 'could',
    'count', 'court', 'cover', 'crack', 'craft', 'crazy', 'cream', 'crime',
    'cross', 'crowd', 'cruel', 'curve', 'cycle', 'daily', 'dance', 'delay',
    'delta', 'dirty', 'doubt', 'draft', 'drain', 'drama', 'drawn', 'dream',
    'dress', 'drink', 'drive', 'early', 'eight', 'elite', 'empty', 'enemy', 'enjoy',
    'enter', 'equal', 'error', 'event', 'every', 'exact', 'exist', 'extra',
    'false', 'fault', 'favor', 'fence', 'fever', 'field', 'fifty',
    'fight', 'final', 'first', 'flame', 'fleet', 'float', 'flood', 'floor',
    'fluid',
    'focus', 'force', 'forge', 'forum', 'found', 'frame', 'fraud', 'front',
    'fruit', 'fully', 'funny', 'given', 'glass', 'globe', 'grace', 'grade',
    'grain', 'grand', 'grant', 'grass', 'grave', 'great', 'green', 'gross',
    'group', 'grown', 'guard', 'guess', 'guest', 'guide', 'guilt', 'happy',
    'heart', 'heavy', 'hello', 'horse', 'hotel', 'house', 'human', 'humor',
    'ideal', 'image', 'imply', 'index', 'inner', 'input', 'issue', 'ivory',
    'joint', 'judge', 'juice', 'known', 'label', 'large', 'later', 'layer',
    'learn', 'least', 'leave', 'legal', 'level', 'light', 'limit', 'linen', 'liver',
    'local', 'logic', 'loose', 'lover', 'lower', 'lucky', 'magic', 'major',
    'maker', 'manor', 'marry', 'medal', 'media', 'mercy', 'merit', 'metal',
    'midst', 'might', 'model', 'money', 'moral', 'motor', 'mount', 'movie', 'music',
    'naive', 'nerve', 'never', 'night', 'noble', 'noise', 'novel', 'nurse', 'occur',
    'ocean', 'offer', 'often', 'order', 'organ', 'outer', 'owner', 'paint',
    'panel', 'paper', 'party', 'pasta', 'pause', 'peace', 'penny', 'pilot',
    'pizza', 'place', 'plain', 'plane', 'plant', 'plate', 'plaza', 'plead',
    'plumb', 'point', 'pound', 'power', 'press', 'price', 'pride', 'prime',
    'print', 'prior', 'prize', 'proof', 'proud', 'prove', 'psalm', 'purse',
    'queen', 'quest', 'quiet', 'quota', 'radar', 'radio', 'raise', 'rapid',
    'ratio', 'ready', 'realm', 'rebel', 'reign', 'relax', 'reply', 'rider',
    'right', 'rigid', 'risky', 'rival', 'river', 'robot', 'rocky', 'royal', 'rural',
    'saint', 'salad', 'scale', 'score', 'sense', 'serve', 'setup', 'seven',
    'sight', 'silly', 'since', 'sixty', 'skill', 'sleep', 'slide', 'slope',
    'small', 'smart', 'smile', 'smoke', 'snake', 'solar', 'solid', 'solve',
    'sorry', 'sound', 'space', 'spare', 'speak', 'speed', 'spend', 'spill',
    'spite', 'split', 'sport', 'spray', 'squad', 'stack', 'staff', 'stage',
    'stair', 'stake', 'stale', 'stand', 'stark', 'start', 'state', 'steal',
    'steam', 'steel', 'steep', 'steer', 'stick', 'stiff', 'still', 'stock',
    'stone', 'stood', 'store', 'storm', 'story', 'strip', 'stuck', 'study',
    'stuff', 'style', 'sugar', 'super', 'surge', 'swamp', 'swear', 'sweep',
    'sweet', 'sword', 'table', 'taste', 'tears', 'tempo', 'tense', 'terms',
    'tight', 'timer', 'tired', 'title', 'today', 'token', 'total', 'tower', 'toxic',
    'trace', 'track', 'trade', 'trail', 'train', 'trait', 'treat', 'trend',
    'trial', 'tribe', 'trick', 'troop', 'truck', 'truly', 'trust', 'tumor',
    'twice', 'twist', 'ultra', 'uncle', 'under', 'unity', 'until', 'upper',
    'upset', 'urban', 'usage', 'usual', 'valid', 'value', 'verse', 'vigor',
    'viral', 'visit', 'vital', 'vivid', 'vocal', 'voter', 'waste', 'water',
    'weary', 'weave', 'weigh', 'weird', 'wheel', 'where', 'while', 'white',
    'whole', 'whose', 'woman', 'world', 'worry', 'worst', 'would', 'wound',
    'write', 'yield',
  ],
};

const WORD_TIERS = {
  2: [7, 14, 20],
  3: [30, 70, 139],
  4: [50, 120, 340],
  5: [80, 200, 424],
};

function getWordList(length, tier) {
  const list = WORD_LISTS[length] || [];
  if (!tier) return list;
  const tiers = WORD_TIERS[length];
  if (!tiers) return list;
  const count = tiers[tier - 1] || list.length;
  return list.slice(0, count);
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
