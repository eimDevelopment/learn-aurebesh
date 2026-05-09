const BASIC_CHARS = [
  { id: 'aurek',  letter: 'a', render: 'a', name: 'Aurek',  hint: 'Pointed at the top, like an A-frame roof' },
  { id: 'besh',   letter: 'b', render: 'b', name: 'Besh',   hint: 'Round and stacked, like the two bumps of a B' },
  { id: 'cresh',  letter: 'c', render: 'c', name: 'Cresh',  hint: 'Two prongs, like a C-clamp' },
  { id: 'dorn',   letter: 'd', render: 'd', name: 'Dorn',   hint: 'A backwards 7 -- R is a 7, D is its mirror' },
  { id: 'esk',    letter: 'e', render: 'e', name: 'Esk',    hint: 'Rabbit ears -- E for Ears' },
  { id: 'forn',   letter: 'f', render: 'f', name: 'Forn',   hint: 'A big plus sign -- the crossbar of an F' },
  { id: 'grek',   letter: 'g', render: 'g', name: 'Grek',   hint: 'An open gate -- G for Gate' },
  { id: 'herf',   letter: 'h', render: 'h', name: 'Herf',   hint: 'H for Horizontal -- three horizontal lines' },
  { id: 'isk',    letter: 'i', render: 'i', name: 'Isk',    hint: 'One single stroke, just like the letter I' },
  { id: 'jenth',  letter: 'j', render: 'j', name: 'Jenth',  hint: 'A fishhook -- J hooks at the bottom, this hooks at the top' },
  { id: 'krill',  letter: 'k', render: 'k', name: 'Krill',  hint: 'An open claw -- K for Klaw' },
  { id: 'leth',   letter: 'l', render: 'l', name: 'Leth',   hint: 'The long leg of an L, leaning over' },
  { id: 'mern',   letter: 'm', render: 'm', name: 'Mern',   hint: 'One slope of the M mountain' },
  { id: 'nern',   letter: 'n', render: 'n', name: 'Nern',   hint: 'A mountain peak -- the up-down diagonal of N' },
  { id: 'osk',    letter: 'o', render: 'o', name: 'Osk',    hint: 'A circle with corners -- O as a triangle' },
  { id: 'peth',   letter: 'p', render: 'p', name: 'Peth',   hint: 'A goalpost -- P for Post' },
  { id: 'qek',    letter: 'q', render: 'q', name: 'Qek',    hint: 'Curves like Q\'s tail' },
  { id: 'resh',   letter: 'r', render: 'r', name: 'Resh',   hint: 'Looks exactly like the number 7 -- R = 7' },
  { id: 'senth',  letter: 's', render: 's', name: 'Senth',  hint: 'An S made of straight lines -- same zigzag shape' },
  { id: 'trill',  letter: 't', render: 't', name: 'Trill',  hint: 'An upside-down T' },
  { id: 'usk',    letter: 'u', render: 'u', name: 'Usk',    hint: 'Shaped exactly like the letter U' },
  { id: 'vev',    letter: 'v', render: 'v', name: 'Vev',    hint: 'The top of this Y is a V -- V before it grew a stem' },
  { id: 'wesk',   letter: 'w', render: 'w', name: 'Wesk',   hint: 'A Window -- W for Window' },
  { id: 'xesh',   letter: 'x', render: 'x', name: 'Xesh',   hint: 'X marks the spot -- a triangle on your treasure map' },
  { id: 'yirt',   letter: 'y', render: 'y', name: 'Yirt',   hint: 'An upside-down V -- the fork of a Y' },
  { id: 'zerek',  letter: 'z', render: 'z', name: 'Zerek',  hint: 'Z is a zigzag, and so is this' },
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
