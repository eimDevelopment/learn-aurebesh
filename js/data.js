const BASIC_CHARS = [
  { id: 'aurek',  letter: 'a', render: 'a', name: 'Aurek',  hint: 'Like a K -- Aurek starts with A' },
  { id: 'besh',   letter: 'b', render: 'b', name: 'Besh',   hint: 'A circle with a line, like a sideways B' },
  { id: 'cresh',  letter: 'c', render: 'c', name: 'Cresh',  hint: 'Small angular hooks, like a staple' },
  { id: 'dorn',   letter: 'd', render: 'd', name: 'Dorn',   hint: 'A backwards 7 -- flip Resh for Dorn' },
  { id: 'esk',    letter: 'e', render: 'e', name: 'Esk',    hint: 'Looks like V and T merged together' },
  { id: 'forn',   letter: 'f', render: 'f', name: 'Forn',   hint: 'A cross shape, like a plus sign' },
  { id: 'grek',   letter: 'g', render: 'g', name: 'Grek',   hint: 'A square with a notch, like an open gate' },
  { id: 'herf',   letter: 'h', render: 'h', name: 'Herf',   hint: 'Three horizontal lines, like a stack of H bars' },
  { id: 'isk',    letter: 'i', render: 'i', name: 'Isk',    hint: 'Looks like the number 1' },
  { id: 'jenth',  letter: 'j', render: 'j', name: 'Jenth',  hint: 'A hook shape, like a bent J' },
  { id: 'krill',  letter: 'k', render: 'k', name: 'Krill',  hint: 'An open bracket, like a backwards C' },
  { id: 'leth',   letter: 'l', render: 'l', name: 'Leth',   hint: 'A checkmark shape, leaning left like L' },
  { id: 'mern',   letter: 'm', render: 'm', name: 'Mern',   hint: 'An angle shape, like a corner bracket' },
  { id: 'nern',   letter: 'n', render: 'n', name: 'Nern',   hint: 'Like an upside-down W or mountain peaks' },
  { id: 'osk',    letter: 'o', render: 'o', name: 'Osk',    hint: 'A triangle, like a round O made angular' },
  { id: 'peth',   letter: 'p', render: 'p', name: 'Peth',   hint: 'A U-bracket shape, like a goalpost' },
  { id: 'qek',    letter: 'q', render: 'q', name: 'Qek',    hint: 'Similar to Grek but with a tail for Q' },
  { id: 'resh',   letter: 'r', render: 'r', name: 'Resh',   hint: 'Looks like the number 7' },
  { id: 'senth',  letter: 's', render: 's', name: 'Senth',  hint: 'A zigzag, like a lightning bolt S' },
  { id: 'trill',  letter: 't', render: 't', name: 'Trill',  hint: 'An upside-down T with an arrow pointing down' },
  { id: 'usk',    letter: 'u', render: 'u', name: 'Usk',    hint: 'A horseshoe shape, like a U' },
  { id: 'vev',    letter: 'v', render: 'v', name: 'Vev',    hint: 'Looks like a Y, think V for Vev' },
  { id: 'wesk',   letter: 'w', render: 'w', name: 'Wesk',   hint: 'A rectangle, like a wide Window' },
  { id: 'xesh',   letter: 'x', render: 'x', name: 'Xesh',   hint: 'A triangle shape, like an X-wing delta' },
  { id: 'yirt',   letter: 'y', render: 'y', name: 'Yirt',   hint: 'An upside-down V, like a Y without the stem' },
  { id: 'zerek',  letter: 'z', render: 'z', name: 'Zerek',  hint: 'Angular shape with a zigzag for Z' },
];

const DIGRAPH_CHARS = [
  { id: 'cherek',  letter: 'ch', render: 'ç', name: 'Cherek',  hint: 'Combines Cresh and Herf sounds' },
  { id: 'enth',    letter: 'ae', render: 'æ', name: 'Enth',    hint: 'The AE vowel blend' },
  { id: 'onith',   letter: 'eo', render: 'ë', name: 'Onith',   hint: 'The EO vowel blend' },
  { id: 'krenth',  letter: 'kh', render: 'ß', name: 'Krenth',  hint: 'A guttural K sound, like clearing your throat' },
  { id: 'nen',     letter: 'ng', render: 'ñ', name: 'Nen',     hint: 'The NG ending sound, like in "ring"' },
  { id: 'orenth',  letter: 'oo', render: 'ö', name: 'Orenth',  hint: 'The long OO sound, like in "moon"' },
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
