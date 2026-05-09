const BASIC_CHARS = [
  { id: 'aurek',  letter: 'a', render: 'a', name: 'Aurek' },
  { id: 'besh',   letter: 'b', render: 'b', name: 'Besh' },
  { id: 'cresh',  letter: 'c', render: 'c', name: 'Cresh' },
  { id: 'dorn',   letter: 'd', render: 'd', name: 'Dorn' },
  { id: 'esk',    letter: 'e', render: 'e', name: 'Esk' },
  { id: 'forn',   letter: 'f', render: 'f', name: 'Forn' },
  { id: 'grek',   letter: 'g', render: 'g', name: 'Grek' },
  { id: 'herf',   letter: 'h', render: 'h', name: 'Herf' },
  { id: 'isk',    letter: 'i', render: 'i', name: 'Isk' },
  { id: 'jenth',  letter: 'j', render: 'j', name: 'Jenth' },
  { id: 'krill',  letter: 'k', render: 'k', name: 'Krill' },
  { id: 'leth',   letter: 'l', render: 'l', name: 'Leth' },
  { id: 'mern',   letter: 'm', render: 'm', name: 'Mern' },
  { id: 'nern',   letter: 'n', render: 'n', name: 'Nern' },
  { id: 'osk',    letter: 'o', render: 'o', name: 'Osk' },
  { id: 'peth',   letter: 'p', render: 'p', name: 'Peth' },
  { id: 'qek',    letter: 'q', render: 'q', name: 'Qek' },
  { id: 'resh',   letter: 'r', render: 'r', name: 'Resh' },
  { id: 'senth',  letter: 's', render: 's', name: 'Senth' },
  { id: 'trill',  letter: 't', render: 't', name: 'Trill' },
  { id: 'usk',    letter: 'u', render: 'u', name: 'Usk' },
  { id: 'vev',    letter: 'v', render: 'v', name: 'Vev' },
  { id: 'wesk',   letter: 'w', render: 'w', name: 'Wesk' },
  { id: 'xesh',   letter: 'x', render: 'x', name: 'Xesh' },
  { id: 'yirt',   letter: 'y', render: 'y', name: 'Yirt' },
  { id: 'zerek',  letter: 'z', render: 'z', name: 'Zerek' },
];

const DIGRAPH_CHARS = [
  { id: 'cherek',  letter: 'ch', render: 'ç', name: 'Cherek' },
  { id: 'enth',    letter: 'ae', render: 'æ', name: 'Enth' },
  { id: 'onith',   letter: 'eo', render: 'ë', name: 'Onith' },
  { id: 'krenth',  letter: 'kh', render: 'ß', name: 'Krenth' },
  { id: 'nen',     letter: 'ng', render: 'ñ', name: 'Nen' },
  { id: 'orenth',  letter: 'oo', render: 'ö', name: 'Orenth' },
  { id: 'shen',    letter: 'sh', render: 'ø', name: 'Shen' },
  { id: 'thesh',   letter: 'th', render: 'þ', name: 'Thesh' },
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
