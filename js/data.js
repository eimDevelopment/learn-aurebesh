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
    'ace', 'act', 'add', 'age', 'all', 'and', 'arm', 'art', 'bad', 'bed',
    'big', 'box', 'boy', 'bug', 'bus', 'but', 'can', 'car', 'cat', 'cup',
    'cut', 'day', 'did', 'dig', 'dog', 'dry', 'duo', 'ear', 'eat', 'egg',
    'end', 'eye', 'fan', 'far', 'fat', 'fix', 'fly', 'foe', 'for', 'fox',
    'fun', 'gas', 'get', 'god', 'got', 'gun', 'guy', 'gym', 'had', 'ham',
    'hat', 'her', 'him', 'hit', 'hot', 'how', 'ice', 'its', 'jam', 'jar',
    'jaw', 'jet', 'job', 'joy', 'key', 'kid', 'kin', 'law', 'leg', 'let',
    'lie', 'lip', 'log', 'lot', 'low', 'mad', 'man', 'map', 'men', 'mix',
    'mud', 'net', 'new', 'nor', 'not', 'now', 'nut', 'odd', 'off', 'oil',
    'old', 'one', 'orb', 'ore', 'our', 'out', 'own', 'pay', 'pet', 'pie',
    'pig', 'pin', 'pit', 'pod', 'pop', 'pot', 'put', 'ran', 'raw', 'red',
    'rid', 'rim', 'rob', 'rod', 'row', 'run', 'sad', 'sat', 'saw', 'say',
    'sea', 'set', 'sir', 'sit', 'six', 'sky', 'son', 'spy', 'sum', 'sun',
    'ten', 'tie', 'tip', 'top', 'try', 'two', 'use', 'van', 'vow', 'war',
    'was', 'way', 'web', 'wet', 'win', 'yes', 'yet', 'you',
  ],
  4: [
    'able', 'army', 'away', 'baby', 'back', 'ball', 'band', 'bank', 'base',
    'bear', 'beat', 'bell', 'best', 'bill', 'bird', 'blue', 'body', 'bolt',
    'bone', 'born', 'burn', 'busy', 'call', 'calm', 'camp', 'card', 'care',
    'cave', 'city', 'clan', 'club', 'code', 'cold', 'come', 'copy', 'core',
    'crew', 'dark', 'data', 'dead', 'deal', 'deep', 'deny', 'dirt', 'doom',
    'down', 'draw', 'drop', 'drug', 'duel', 'dust', 'duty', 'earn', 'east',
    'edge', 'else', 'evil', 'exit', 'face', 'fact', 'fail', 'fair', 'fall',
    'farm', 'fast', 'fear', 'feed', 'feel', 'fill', 'film', 'find', 'fire',
    'firm', 'five', 'flat', 'flip', 'flow', 'fold', 'form', 'four', 'free',
    'from', 'fuel', 'full', 'fund', 'fury', 'gain', 'game', 'gave', 'gift',
    'girl', 'give', 'glad', 'glow', 'goal', 'gold', 'golf', 'grab', 'gray',
    'grew', 'grip', 'grow', 'gulf', 'hair', 'half', 'hall', 'hand', 'hate',
    'have', 'hear', 'heat', 'helm', 'help', 'here', 'hero', 'hide', 'hill',
    'hire', 'hold', 'hole', 'holy', 'home', 'hope', 'host', 'hull', 'hunt',
    'hurt', 'idea', 'iron', 'item', 'jack', 'jedi', 'join', 'joke', 'jump',
    'jury', 'just', 'keen', 'keep', 'kept', 'kill', 'kind', 'knew', 'lady',
    'laid', 'lake', 'land', 'last', 'late', 'lava', 'lawn', 'lead', 'left',
    'less', 'life', 'lift', 'like', 'line', 'link', 'list', 'live', 'load',
    'loan', 'lock', 'lord', 'lore', 'lose', 'loss', 'lost', 'love', 'luck',
    'made', 'mail', 'main', 'make', 'male', 'many', 'mark', 'mask', 'mass',
    'meet', 'mile', 'milk', 'mind', 'mine', 'miss', 'mode', 'moon', 'more',
    'most', 'move', 'must', 'name', 'navy', 'near', 'neat', 'neck', 'need',
    'news', 'next', 'nice', 'nine', 'nose', 'note', 'obey', 'only', 'open',
    'over', 'paid', 'pair', 'palm', 'park', 'part', 'pass', 'past', 'peak',
    'pick', 'pile', 'pipe', 'plan', 'play', 'plot', 'plus', 'poll', 'port',
    'pour', 'pray', 'prey', 'pull', 'pump', 'pure', 'quit', 'race', 'rage',
    'rain', 'rank', 'rare', 'rate', 'read', 'real', 'rear', 'rely', 'rent',
    'rest', 'rice', 'ride', 'rise', 'risk', 'road', 'robe', 'rock', 'role',
    'roll', 'rope', 'ruin', 'rule', 'safe', 'said', 'sale', 'salt', 'same',
    'sand', 'save', 'scum', 'seat', 'seed', 'seek', 'seem', 'self', 'sell',
    'send', 'side', 'sign', 'site', 'size', 'skin', 'slip', 'slow', 'snap',
    'snow', 'soft', 'soil', 'sold', 'some', 'sort', 'soul', 'spin', 'spot',
    'star', 'stay', 'stem', 'step', 'stop', 'suit', 'sure', 'swim', 'tail',
    'take', 'talk', 'tall', 'tank', 'tape', 'task', 'team', 'tear', 'tell',
    'term', 'test', 'text', 'time', 'tiny', 'tire', 'told', 'tone', 'torn',
    'tour', 'town', 'trap', 'tree', 'trip', 'true', 'tube', 'turn', 'twin',
    'type', 'unit', 'upon', 'used', 'vast', 'very', 'void', 'vote', 'wait',
    'wake', 'walk', 'wall', 'want', 'warm', 'warn', 'wave', 'weak', 'wear',
    'week', 'well', 'went', 'west', 'wide', 'wife', 'wild', 'will', 'wind',
    'wine', 'wire', 'wise', 'woke', 'wolf', 'word', 'wore', 'work', 'worn',
    'wrap', 'yard', 'year', 'zero', 'zone',
  ],
  5: [
    'aayla', 'abort', 'about', 'above', 'abyss', 'admit', 'adult', 'agent',
    'agree', 'alarm', 'album', 'alert', 'align', 'alive', 'allow', 'alone',
    'alpha', 'alter', 'apple', 'apply', 'arena', 'armed', 'armor', 'array',
    'aurek', 'avoid', 'award', 'aware', 'badly', 'barge', 'basic', 'batuu',
    'begin', 'below', 'bible', 'blade', 'blame', 'blast', 'blaze', 'blind',
    'block', 'blood', 'board', 'bonus', 'bossk', 'brain', 'brand', 'brave',
    'bravo', 'brawl', 'bread', 'break', 'brief', 'broad', 'broke', 'brown',
    'build', 'built', 'buyer', 'cabin', 'cable', 'cadet', 'cargo', 'carry',
    'cease', 'claim', 'class', 'clean', 'clear', 'climb', 'cloak', 'clock',
    'clone', 'close', 'cloud', 'codex', 'color', 'could', 'count', 'court',
    'cover', 'crack', 'craft', 'crait', 'crazy', 'cream', 'creed', 'crest',
    'crime', 'cross', 'crowd', 'cruel', 'curve', 'cyber', 'cycle', 'daily',
    'dance', 'decay', 'decks', 'decoy', 'delay', 'delta', 'depot', 'deter',
    'dirty', 'docks', 'dooku', 'doors', 'doubt', 'draft', 'drain', 'drama',
    'drawn', 'dread', 'dream', 'dress', 'drink', 'drive', 'droid', 'duels',
    'dwell', 'dwelt', 'early', 'eight', 'elite', 'empty', 'endor', 'enemy',
    'enjoy', 'enter', 'envoy', 'equal', 'error', 'evade', 'event', 'every',
    'ewoks', 'exact', 'exalt', 'exile', 'exist', 'extra', 'false', 'fault',
    'favor', 'fence', 'fever', 'field', 'fifty', 'fight', 'final', 'first',
    'fives', 'flame', 'flank', 'flare', 'fleet', 'float', 'flood', 'floor',
    'fluid', 'focus', 'force', 'forge', 'forum', 'found', 'frame', 'fraud',
    'front', 'fruit', 'fully', 'funny', 'gamma', 'gaunt', 'given', 'glass',
    'globe', 'glyph', 'grace', 'grade', 'grain', 'grand', 'grant', 'grasp',
    'grass', 'grave', 'great', 'greef', 'green', 'grogu', 'gross', 'group',
    'grown', 'guard', 'guess', 'guest', 'guide', 'guild', 'guilt', 'happy',
    'haven', 'havoc', 'heart', 'heavy', 'heist', 'hello', 'holos', 'hondo',
    'honor', 'horde', 'horse', 'hotel', 'house', 'human', 'humor', 'hutts',
    'hyper', 'ideal', 'image', 'imply', 'index', 'inner', 'input', 'issue',
    'ivory', 'jabba', 'jakku', 'jawas', 'jecki', 'jedha', 'jesse', 'joint',
    'judge', 'juice', 'klaud', 'known', 'kuiil', 'kyber', 'label', 'lando',
    'large', 'laser', 'later', 'layer', 'learn', 'least', 'leave', 'legal',
    'level', 'light', 'limit', 'linen', 'liver', 'lobot', 'local', 'logic',
    'loose', 'lover', 'lower', 'lucky', 'lunar', 'magic', 'major', 'maker',
    'mando', 'manor', 'marry', 'medal', 'media', 'mercy', 'merit', 'metal',
    'midst', 'might', 'miner', 'model', 'money', 'moral', 'motor', 'mount',
    'movie', 'mural', 'music', 'naboo', 'naive', 'nerve', 'never', 'nexus',
    'night', 'noble', 'noise', 'novel', 'nurse', 'occur', 'ocean', 'offer',
    'often', 'omega', 'orbit', 'order', 'organ', 'outer', 'overt', 'owner',
    'padme', 'paint', 'panel', 'paper', 'party', 'pasta', 'pause', 'peace',
    'penny', 'phase', 'pilot', 'pivot', 'pizza', 'place', 'plain', 'plane',
    'plant', 'plate', 'plaza', 'plead', 'plumb', 'point', 'pound', 'power',
    'press', 'price', 'pride', 'prime', 'print', 'prior', 'prize', 'probe',
    'proof', 'proud', 'prove', 'psalm', 'pulse', 'purge', 'purse', 'pyres',
    'queen', 'quest', 'quiet', 'quota', 'radar', 'radio', 'raise', 'rally',
    'rapid', 'ratio', 'razor', 'react', 'ready', 'realm', 'rebel', 'recon',
    'reign', 'relax', 'relay', 'relic', 'repel', 'reply', 'revan', 'rider',
    'rifle', 'right', 'rigid', 'risen', 'risky', 'rival', 'river', 'robot',
    'rocky', 'rogue', 'round', 'royal', 'ruler', 'rural', 'saber', 'sagas',
    'saint', 'salad', 'salvo', 'scale', 'scope', 'score', 'scout', 'seize',
    'sense', 'serve', 'setup', 'seven', 'sever', 'siege', 'sight', 'sigil',
    'sigma', 'silly', 'since', 'siren', 'sixty', 'skill', 'slave', 'sleep',
    'slide', 'slope', 'small', 'smart', 'smile', 'smoke', 'snake', 'snare',
    'snipe', 'snoke', 'solar', 'solid', 'solve', 'sorry', 'sound', 'space',
    'spare', 'spark', 'speak', 'spear', 'speed', 'spend', 'spice', 'spill',
    'spite', 'split', 'sport', 'spray', 'squad', 'stack', 'staff', 'stage',
    'stair', 'stake', 'stale', 'stalk', 'stand', 'stark', 'stars', 'start',
    'state', 'stave', 'steal', 'steam', 'steed', 'steel', 'steep', 'steer',
    'stern', 'stick', 'stiff', 'still', 'stock', 'stone', 'stood', 'store',
    'storm', 'story', 'strip', 'stuck', 'study', 'stuff', 'style', 'sugar',
    'super', 'surge', 'swamp', 'swear', 'sweep', 'sweet', 'sword', 'sworn',
    'table', 'talon', 'taris', 'taste', 'tears', 'tempo', 'tense', 'terms',
    'tight', 'timer', 'tired', 'titan', 'title', 'today', 'token', 'total',
    'tower', 'toxic', 'trace', 'track', 'trade', 'trail', 'train', 'trait',
    'traya', 'treat', 'trend', 'trial', 'tribe', 'trick', 'troop', 'truce',
    'truck', 'truly', 'trust', 'tumor', 'turbo', 'twice', 'twist', 'ultra',
    'uncle', 'under', 'unity', 'until', 'upper', 'upset', 'urban', 'usage',
    'usual', 'vader', 'valid', 'valor', 'value', 'veers', 'venom', 'verse',
    'vigor', 'viper', 'viral', 'visit', 'visor', 'vital', 'vivid', 'vocal',
    'voter', 'wampa', 'waste', 'water', 'watto', 'weary', 'weave', 'wedge',
    'weigh', 'weird', 'wheel', 'where', 'while', 'white', 'whole', 'whose',
    'wield', 'wolff', 'woman', 'world', 'worry', 'worst', 'would', 'wound',
    'wreck', 'write', 'yavin', 'yield', 'zorri',
  ],
  6: [
    'absorb', 'accept', 'access', 'across', 'active', 'actual', 'adjust', 'admire',
    'advice', 'affect', 'afford', 'agency', 'almost', 'always', 'amount', 'animal',
    'annual', 'answer', 'anyway', 'appear', 'arrive', 'assume', 'attack', 'ballot',
    'battle', 'become', 'before', 'behind', 'beside', 'beyond', 'bitter', 'bloody',
    'border', 'borrow', 'bottom', 'bounce', 'bridge', 'bright', 'broken', 'bronze',
    'budget', 'bundle', 'burden', 'bureau', 'button', 'camera', 'cancel', 'carbon',
    'career', 'castle', 'casual', 'center', 'circle', 'client', 'closer', 'coffee',
    'colony', 'column', 'combat', 'commit', 'common', 'comply', 'copper', 'corner',
    'couple', 'course', 'cousin', 'create', 'credit', 'crisis', 'custom', 'damage',
    'debate', 'decade', 'decide', 'defeat', 'defend', 'define', 'degree', 'demand',
    'dental', 'depend', 'deploy', 'desert', 'design', 'desire', 'detail', 'detect',
    'device', 'devote', 'differ', 'direct', 'divide', 'domain', 'donate', 'double',
    'driver', 'effect', 'effort', 'emerge', 'empire', 'employ', 'enable', 'endure',
    'energy', 'entire', 'entity', 'escape', 'evolve', 'exceed', 'excuse', 'expand',
    'expect', 'expert', 'export', 'extend', 'extent', 'fabric', 'factor', 'family',
    'famous', 'farmer', 'favour', 'female', 'figure', 'filter', 'fiscal', 'flavor',
    'flight', 'flower', 'follow', 'forest', 'forget', 'formal', 'former', 'fossil',
    'foster', 'freeze', 'future', 'galaxy', 'garage', 'garden', 'gender', 'gentle',
    'global', 'govern', 'ground', 'guilty', 'handle', 'happen', 'harbor', 'hardly',
    'heaven', 'height', 'hereby', 'hidden', 'honest', 'horror', 'hunter', 'ignore',
    'immune', 'impact', 'import', 'impose', 'income', 'indeed', 'indoor', 'infant',
    'inform', 'injure', 'injury', 'insert', 'inside', 'insist', 'insure', 'intend',
    'invest', 'island', 'itself', 'junior', 'justly', 'kernel', 'ladder', 'lawyer',
    'layout', 'leader', 'legacy', 'likely', 'linear', 'liquid', 'listen', 'little',
    'lively', 'locate', 'lovely', 'luxury', 'mainly', 'manage', 'manner', 'margin',
    'market', 'master', 'matter', 'medium', 'member', 'memory', 'mental', 'merely',
    'merger', 'middle', 'mighty', 'mirror', 'mobile', 'modern', 'modest', 'moment',
    'motive', 'murder', 'muscle', 'mutual', 'namely', 'narrow', 'native', 'nature',
    'nearby', 'nearly', 'needle', 'nobody', 'normal', 'notice', 'notion', 'number',
    'object', 'obtain', 'occupy', 'office', 'online', 'option', 'origin', 'outfit',
    'output', 'oxygen', 'palace', 'parent', 'partly', 'patrol', 'period', 'permit',
    'person', 'phrase', 'planet', 'player', 'please', 'pledge', 'plenty', 'pocket',
    'poetry', 'poison', 'police', 'policy', 'portal', 'poster', 'prayer', 'prefer',
    'pretty', 'priest', 'prince', 'profit', 'prompt', 'proper', 'proven', 'pursue',
    'racial', 'random', 'rarely', 'reason', 'recall', 'record', 'reduce', 'reform',
    'refuse', 'region', 'reject', 'remain', 'remedy', 'remote', 'remove', 'render',
    'repair', 'repeat', 'report', 'rescue', 'resist', 'resort', 'result', 'retain',
    'retire', 'return', 'reveal', 'review', 'revolt', 'reward', 'ritual', 'rocket',
    'rubber', 'safely', 'salary', 'sample', 'screen', 'script', 'season', 'secret',
    'sector', 'secure', 'select', 'seller', 'sequel', 'series', 'settle', 'severe',
    'signal', 'silent', 'silver', 'simple', 'simply', 'sister', 'slight', 'social',
    'solely', 'source', 'spirit', 'spread', 'square', 'stable', 'statue', 'steady',
    'strain', 'strand', 'stream', 'street', 'strict', 'strike', 'stroke', 'studio',
    'submit', 'sudden', 'suffer', 'summer', 'summit', 'supply', 'surely', 'survey',
    'symbol', 'system', 'tackle', 'talent', 'target', 'temple', 'tender', 'terror',
    'ticket', 'timber', 'tissue', 'travel', 'treaty', 'tribal', 'tricky', 'trophy',
    'tunnel', 'unfair', 'unique', 'unlike', 'update', 'upward', 'useful', 'valley',
    'vendor', 'vessel', 'victim', 'vision', 'visual', 'volume', 'walker', 'wander',
    'warmly', 'weapon', 'weekly', 'widely', 'window', 'winner', 'winter', 'wisdom',
    'worker', 'writer',
  ],
  7: [
    'abandon', 'ability', 'absence', 'absolve', 'academy', 'account', 'acquire',
    'address', 'admiral', 'advance', 'adverse', 'airline', 'already', 'analyst',
    'ancient', 'anxiety', 'applied', 'appoint', 'approve', 'arrival', 'article',
    'assault', 'attract', 'average', 'awesome', 'balance', 'barrier', 'battery',
    'because', 'believe', 'benefit', 'besides', 'billion', 'biology', 'cabinet',
    'capable', 'capital', 'capture', 'careful', 'carrier', 'catalog', 'caution',
    'central', 'century', 'certain', 'circuit', 'citizen', 'classic', 'climate',
    'cluster', 'coastal', 'collect', 'comfort', 'command', 'comment', 'compact',
    'company', 'compare', 'compete', 'complex', 'concern', 'conduct', 'confirm',
    'connect', 'consent', 'consist', 'consult', 'contact', 'contain', 'content',
    'context', 'control', 'convert', 'correct', 'council', 'counsel', 'counter',
    'country', 'courage', 'creator', 'credits', 'crucial', 'crystal', 'culture',
    'current', 'curtain', 'customs', 'declare', 'decline', 'default', 'defense',
    'deficit', 'deliver', 'density', 'deposit', 'desktop', 'destiny', 'destroy',
    'develop', 'digital', 'disable', 'display', 'dispute', 'distant', 'diverse',
    'predict', 'premium', 'prepare', 'present', 'prevent', 'primary', 'privacy',
    'private', 'problem', 'proceed', 'process', 'produce', 'product', 'profile',
    'program', 'project', 'promise', 'promote', 'protect', 'protest', 'provide',
    'qualify', 'radical', 'reactor', 'reality', 'realize', 'receipt', 'receive',
    'recover', 'reflect', 'related', 'release', 'remains', 'removal', 'replace',
    'request', 'require', 'reserve', 'resolve', 'respect', 'respond', 'restore',
    'retreat', 'revenue', 'reverse', 'revival', 'routine', 'salvage', 'scanner',
    'science', 'segment', 'senator', 'servant', 'service', 'session', 'silence',
    'similar', 'society', 'soldier', 'somehow', 'special', 'sponsor', 'station',
    'stellar', 'storage', 'subject', 'success', 'suggest', 'summary', 'support',
    'supreme', 'surface', 'surplus', 'survive', 'suspect', 'sustain', 'tactful',
    'tension', 'terrain', 'toolbar', 'tourist', 'tracker', 'traffic', 'trainer',
    'trigger', 'trouble', 'uniform', 'utility', 'venture', 'version', 'veteran',
    'victory', 'village', 'violent', 'virtual', 'visible', 'visitor', 'warrant',
    'warrior', 'welfare', 'western',
  ],
};

const SESSION_SIZES = { 1: 10, 2: 20, 3: 30 };

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
