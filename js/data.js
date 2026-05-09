const BASIC_CHARS = [
  { id: 'aurek',  letter: 'a', render: 'a', name: 'Aurek',  hint: 'The left side traces an A' },
  { id: 'besh',   letter: 'b', render: 'b', name: 'Besh',   hint: 'The round part is the belly of a B' },
  { id: 'cresh',  letter: 'c', render: 'c', name: 'Cresh',  hint: 'Two little hooks curving like a C' },
  { id: 'dorn',   letter: 'd', render: 'd', name: 'Dorn',   hint: 'A backwards 7 -- D is the reverse of R' },
  { id: 'esk',    letter: 'e', render: 'e', name: 'Esk',    hint: 'Three prongs at the top, like the three arms of E' },
  { id: 'forn',   letter: 'f', render: 'f', name: 'Forn',   hint: 'A cross -- the crossbar of F' },
  { id: 'grek',   letter: 'g', render: 'g', name: 'Grek',   hint: 'An open gate -- G for gate' },
  { id: 'herf',   letter: 'h', render: 'h', name: 'Herf',   hint: 'Three bars stacked like a ladder -- H has a bar too' },
  { id: 'isk',    letter: 'i', render: 'i', name: 'Isk',    hint: 'A single thin stroke, just like I' },
  { id: 'jenth',  letter: 'j', render: 'j', name: 'Jenth',  hint: 'A hook at the bottom, just like J' },
  { id: 'krill',  letter: 'k', render: 'k', name: 'Krill',  hint: 'An open bracket -- the two arms of K collapsed' },
  { id: 'leth',   letter: 'l', render: 'l', name: 'Leth',   hint: 'A right angle, like an L tilted' },
  { id: 'mern',   letter: 'm', render: 'm', name: 'Mern',   hint: 'An angle bracket -- half of M\'s two peaks' },
  { id: 'nern',   letter: 'n', render: 'n', name: 'Nern',   hint: 'Mountain peaks -- the zigzag of N' },
  { id: 'osk',    letter: 'o', render: 'o', name: 'Osk',    hint: 'A triangle -- an O with corners' },
  { id: 'peth',   letter: 'p', render: 'p', name: 'Peth',   hint: 'A goalpost -- P for post' },
  { id: 'qek',    letter: 'q', render: 'q', name: 'Qek',    hint: 'Like the G-gate but with a tail -- Q has a tail too' },
  { id: 'resh',   letter: 'r', render: 'r', name: 'Resh',   hint: 'Looks like a 7 -- R, the pirate letter, arrr' },
  { id: 'senth',  letter: 's', render: 's', name: 'Senth',  hint: 'A zigzag -- S made of straight lines' },
  { id: 'trill',  letter: 't', render: 't', name: 'Trill',  hint: 'An upside-down T' },
  { id: 'usk',    letter: 'u', render: 'u', name: 'Usk',    hint: 'A horseshoe -- same shape as U' },
  { id: 'vev',    letter: 'v', render: 'v', name: 'Vev',    hint: 'A Y shape -- V is just a Y without the stem' },
  { id: 'wesk',   letter: 'w', render: 'w', name: 'Wesk',   hint: 'A rectangle -- W for window' },
  { id: 'xesh',   letter: 'x', render: 'x', name: 'Xesh',   hint: 'A triangle with a line -- X marks the spot' },
  { id: 'yirt',   letter: 'y', render: 'y', name: 'Yirt',   hint: 'An upside-down V -- flip it and you get Y' },
  { id: 'zerek',  letter: 'z', render: 'z', name: 'Zerek',  hint: 'Angular zigzag -- Z for zigzag' },
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
