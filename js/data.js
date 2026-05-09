const BASIC_CHARS = [
  { id: 'aurek',  letter: 'a', render: 'a', name: 'Aurek',  hint: 'An Arrowhead pointing right' },
  { id: 'besh',   letter: 'b', render: 'b', name: 'Besh',   hint: 'A Burger -- bun, patty, bun' },
  { id: 'cresh',  letter: 'c', render: 'c', name: 'Cresh',  hint: 'Chopsticks standing up' },
  { id: 'dorn',   letter: 'd', render: 'd', name: 'Dorn',   hint: 'A Door swinging open to the left' },
  { id: 'esk',    letter: 'e', render: 'e', name: 'Esk',    hint: 'Rabbit Ears on an old TV' },
  { id: 'forn',   letter: 'f', render: 'f', name: 'Forn',   hint: 'Four points on a plus sign' },
  { id: 'grek',   letter: 'g', render: 'g', name: 'Grek',   hint: 'A Gate, open at the top' },
  { id: 'herf',   letter: 'h', render: 'h', name: 'Herf',   hint: 'Three Hurdles in a row' },
  { id: 'isk',    letter: 'i', render: 'i', name: 'Isk',    hint: 'Just I -- one single line' },
  { id: 'jenth',  letter: 'j', render: 'j', name: 'Jenth',  hint: 'A J-hook flipped upside down' },
  { id: 'krill',  letter: 'k', render: 'k', name: 'Krill',  hint: 'The bow end of a Key' },
  { id: 'leth',   letter: 'l', render: 'l', name: 'Leth',   hint: 'An L Leaning over' },
  { id: 'mern',   letter: 'm', render: 'm', name: 'Mern',   hint: 'A Mountain slope going up' },
  { id: 'nern',   letter: 'n', render: 'n', name: 'Nern',   hint: 'The tip of a Needle' },
  { id: 'osk',    letter: 'o', render: 'o', name: 'Osk',    hint: 'An Orange slice -- a triangle wedge' },
  { id: 'peth',   letter: 'p', render: 'p', name: 'Peth',   hint: 'A goalPost' },
  { id: 'qek',    letter: 'q', render: 'q', name: 'Qek',    hint: 'The curve of a Question mark' },
  { id: 'resh',   letter: 'r', render: 'r', name: 'Resh',   hint: 'Pirates sail the 7 seas -- aRRR' },
  { id: 'senth',  letter: 's', render: 's', name: 'Senth',  hint: 'A Snake slithering in zigzags' },
  { id: 'trill',  letter: 't', render: 't', name: 'Trill',  hint: 'An upside-down T' },
  { id: 'usk',    letter: 'u', render: 'u', name: 'Usk',    hint: 'Shaped exactly like U' },
  { id: 'vev',    letter: 'v', render: 'v', name: 'Vev',    hint: 'A Vine branching into a V' },
  { id: 'wesk',   letter: 'w', render: 'w', name: 'Wesk',   hint: 'A Window frame' },
  { id: 'xesh',   letter: 'x', render: 'x', name: 'Xesh',   hint: 'X marks the spot on this map' },
  { id: 'yirt',   letter: 'y', render: 'y', name: 'Yirt',   hint: 'A slingshot -- the Y-shaped fork' },
  { id: 'zerek',  letter: 'z', render: 'z', name: 'Zerek',  hint: 'Zap! A lightning bolt' },
];

const DIGRAPH_CHARS = [
  { id: 'cherek',  letter: 'ch', render: 'ç', name: 'Cherek',  hint: 'The CH sound, like in "church"' },
  { id: 'enth',    letter: 'ae', render: 'æ', name: 'Enth',    hint: 'The AE vowel blend' },
  { id: 'onith',   letter: 'eo', render: 'ë', name: 'Onith',   hint: 'The EO vowel blend' },
  { id: 'krenth',  letter: 'kh', render: 'ß', name: 'Krenth',  hint: 'A guttural K, like clearing your throat' },
  { id: 'nen',     letter: 'ng', render: 'ñ', name: 'Nen',     hint: 'The NG ending, like in "ring"' },
  { id: 'orenth',  letter: 'oo', render: 'ö', name: 'Orenth',  hint: 'The long OO, like in "moon"' },
  { id: 'shen',    letter: 'sh', render: 'ø', name: 'Shen',    hint: 'The SH sound, like "shh"' },
  { id: 'thesh',   letter: 'th', render: 'þ', name: 'Thesh',   hint: 'The TH sound, like in "the"' },
];

const ALL_CHARS = [...BASIC_CHARS, ...DIGRAPH_CHARS];

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
  ['cherek', 'enth', 'onith', 'krenth', 'nen', 'orenth', 'shen', 'thesh'],
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

function getCharById(id) {
  return ALL_CHARS.find(c => c.id === id);
}
