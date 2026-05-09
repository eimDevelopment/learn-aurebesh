const BASIC_CHARS = [
  { id: 'aurek',  letter: 'a', render: 'a', name: 'Aurek', hints: [
    { type: 'shape', text: 'An Arrowhead pointing right' },
    { type: 'name',  text: 'Aurek starts with A -- the first letter to learn' },
  ]},
  { id: 'besh',   letter: 'b', render: 'b', name: 'Besh', hints: [
    { type: 'shape', text: 'A Burger -- bun, patty, bun' },
    { type: 'story', text: 'Three curved layers stacked like a sandwich' },
  ]},
  { id: 'cresh',  letter: 'c', render: 'c', name: 'Cresh', hints: [
    { type: 'shape', text: 'Chopsticks standing up' },
    { type: 'story', text: 'Tall parallel lines like Columns' },
  ]},
  { id: 'dorn',   letter: 'd', render: 'd', name: 'Dorn', hints: [
    { type: 'shape', text: 'A Diving board from the side' },
    { type: 'story', text: 'The board hangs over the Deep end of the pool' },
  ]},
  { id: 'esk',    letter: 'e', render: 'e', name: 'Esk', hints: [
    { type: 'shape', text: 'Rabbit Ears on an old TV' },
    { type: 'story', text: 'Two points going up like a crown -- E for Emperor' },
  ]},
  { id: 'forn',   letter: 'f', render: 'f', name: 'Forn', hints: [
    { type: 'shape', text: 'Four points on a plus sign' },
    { type: 'story', text: 'A compass rose pointing in Four directions' },
  ]},
  { id: 'grek',   letter: 'g', render: 'g', name: 'Grek', hints: [
    { type: 'shape', text: 'A Gate, open at the top' },
    { type: 'story', text: 'A Gutter or trough catching rain' },
  ]},
  { id: 'herf',   letter: 'h', render: 'h', name: 'Herf', hints: [
    { type: 'shape', text: 'Three Horizontal lines stacked' },
    { type: 'story', text: 'The three-line menu icon on your phone' },
  ]},
  { id: 'isk',    letter: 'i', render: 'i', name: 'Isk', hints: [
    { type: 'shape', text: 'Just I -- one single line' },
    { type: 'story', text: 'The simplest character -- I is just one stroke' },
  ]},
  { id: 'jenth',  letter: 'j', render: 'j', name: 'Jenth', hints: [
    { type: 'shape', text: 'A fishhook -- a J-hook flipped over' },
    { type: 'story', text: 'A bent Javelin thrown at an angle' },
  ]},
  { id: 'krill',  letter: 'k', render: 'k', name: 'Krill', hints: [
    { type: 'sound', text: 'A backwards C -- K and C make the same sound' },
    { type: 'shape', text: 'A Cup without a handle -- same hard K sound' },
  ]},
  { id: 'leth',   letter: 'l', render: 'l', name: 'Leth', hints: [
    { type: 'shape', text: 'An L Leaning to the side' },
    { type: 'story', text: 'A single diagonal Line -- L for Line' },
  ]},
  { id: 'mern',   letter: 'm', render: 'm', name: 'Mern', hints: [
    { type: 'shape', text: 'A Mountain slope going up' },
    { type: 'story', text: 'An angle bracket like a Mouth opening wide' },
  ]},
  { id: 'nern',   letter: 'n', render: 'n', name: 'Nern', hints: [
    { type: 'shape', text: 'A Needle stitching in and out' },
    { type: 'story', text: 'Peaks and valleys like Notches cut into wood' },
  ]},
  { id: 'osk',    letter: 'o', render: 'o', name: 'Osk', hints: [
    { type: 'shape', text: 'An Orange slice -- a triangle wedge' },
    { type: 'story', text: 'A pizza slice from a round pie -- O for the circle it came from' },
  ]},
  { id: 'peth',   letter: 'p', render: 'p', name: 'Peth', hints: [
    { type: 'shape', text: 'A goalPost from the front' },
    { type: 'story', text: 'A Pot or bucket seen from the side' },
  ]},
  { id: 'qek',    letter: 'q', render: 'q', name: 'Qek', hints: [
    { type: 'shape', text: 'The curve of a Question mark' },
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
    { type: 'shape', text: 'An upside-down T' },
    { type: 'story', text: 'A sword pointing down -- the cross-guard makes the T' },
  ]},
  { id: 'usk',    letter: 'u', render: 'u', name: 'Usk', hints: [
    { type: 'shape', text: 'Shaped exactly like U' },
    { type: 'story', text: 'The easiest one -- it IS the letter U' },
  ]},
  { id: 'vev',    letter: 'v', render: 'v', name: 'Vev', hints: [
    { type: 'shape', text: 'A Vine branching into a V' },
    { type: 'story', text: 'A tree trunk splitting in two -- V for the split' },
  ]},
  { id: 'wesk',   letter: 'w', render: 'w', name: 'Wesk', hints: [
    { type: 'shape', text: 'A Window frame' },
    { type: 'story', text: 'A box -- four Walls around an empty room' },
  ]},
  { id: 'xesh',   letter: 'x', render: 'x', name: 'Xesh', hints: [
    { type: 'story', text: 'X marks the spot -- the treasure under the X' },
    { type: 'shape', text: 'A triangle like O but slightly different -- eXtra sharp' },
  ]},
  { id: 'yirt',   letter: 'y', render: 'y', name: 'Yirt', hints: [
    { type: 'shape', text: 'A slingshot -- the Y-shaped fork' },
    { type: 'story', text: 'A fork in the road -- which waY do you go?' },
  ]},
  { id: 'zerek',  letter: 'z', render: 'z', name: 'Zerek', hints: [
    { type: 'shape', text: 'One step of a Zigzag staircase' },
    { type: 'story', text: 'An L-shape rotated -- Z, the last letter, takes a final turn' },
  ]},
];

const DIGRAPH_CHARS = [
  { id: 'cherek',  letter: 'ch', render: 'ç', name: 'Cherek', hints: [
    { type: 'shape', text: 'Looks like K (Krill) -- add a breath for CH' },
    { type: 'sound', text: 'The CH in "chair" and "church"' },
  ]},
  { id: 'enth',    letter: 'ae', render: 'æ', name: 'Enth', hints: [
    { type: 'shape', text: 'A circle split in half -- say it like "aesthetic"' },
    { type: 'story', text: 'A target with a line through the bullseye -- AE for "aiming"' },
  ]},
  { id: 'onith',   letter: 'eo', render: 'ë', name: 'Onith', hints: [
    { type: 'shape', text: 'A tent shape -- the EO in "neon"' },
    { type: 'sound', text: 'Two vowels blended -- E and O together' },
  ]},
  { id: 'krenth',  letter: 'kh', render: 'ß', name: 'Krenth', hints: [
    { type: 'shape', text: 'The dotted one -- a throaty K, like clearing your throat' },
    { type: 'sound', text: 'Has dots that plain K doesn\'t -- extra dots, extra breath' },
  ]},
  { id: 'nen',     letter: 'ng', render: 'ñ', name: 'Nen', hints: [
    { type: 'sound', text: 'Ends words like "ring" and "song"' },
    { type: 'story', text: 'The nasal NG sound -- hum it: "nnnng"' },
  ]},
  { id: 'orenth',  letter: 'oo', render: 'ö', name: 'Orenth', hints: [
    { type: 'shape', text: 'A little window -- peek through and say "OOh"' },
    { type: 'sound', text: 'A small square -- OO as in "moon" and "spoon"' },
  ]},
  { id: 'shen',    letter: 'sh', render: 'ø', name: 'Shen', hints: [
    { type: 'shape', text: 'Two halves closing in -- SHh, be quiet' },
    { type: 'sound', text: 'Parentheses facing each other -- SH as in "she" and "ship"' },
  ]},
  { id: 'thesh',   letter: 'th', render: 'þ', name: 'Thesh', hints: [
    { type: 'sound', text: 'Starts "the," "think," and "that"' },
    { type: 'story', text: 'A T with extra flair -- the H adds breath to the T' },
  ]},
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
