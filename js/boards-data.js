// Migrating to board-data.js and combining with pad-data
var boardsData = [
  {
    name: 'Charlie',
    pads: [
      {
        name: 'Charlie Bit Me: Laugh',
        src: 'https://www.youtube.com/embed/_OBlgSz8sSM',
        start: 21.35,
        end: 22.00,
        key: 'n',
        note: 46
      },
    ]
  },
  {
    name: 'Meme Drums',
    pads: [
      {
        src: 'https://www.youtube.com/embed/HPPj6viIBmU',
        start: 99.310,
        end: 99.510,
        key: '2',
        note: 38
      },
      {
        src: 'https://www.youtube.com/embed/oKI-tD0L18A',
        start: 3.050,
        end: 3.600,
        key: 'y',
        note: 48
      },
      {
        src: 'https://www.youtube.com/embed/bEghu90QJH4',
        start: 242.25,
        end: 242.55,
        key: 'u',
        note: 47
      },
      {
        name: 'Danny Goes to the Dentist: "Dont"',
        src: 'https://www.youtube.com/embed/txqiwrbYGrs',
        start: 81.800,
        end: 82.300,
        key: 'i',
        note: 43
      },
      {
        src: 'https://www.youtube.com/embed/Tky59ZD0oNg',
        start: 1.5,
        end: 2.35,
        key: 'm',
        note: 37
      },
      {
        name: 'Charlie Bit Me: Laugh',
        src: 'https://www.youtube.com/embed/_OBlgSz8sSM',
        start: 21.35,
        end: 22.00,
        key: 'n',
        note: 46
      },
      {
        src: 'https://www.youtube.com/embed/CsGYh8AacgY',
        start: 187.7,
        end: 188.3,
        key: 'space',
        note: 57
      },
      {
        src: 'https://www.youtube.com/embed/zRu8Wudq9_c',
        start: 1.11,
        end: 1.450,
        key: '5',
        note: 42
      },
      {
        name: "Afro Ninja Fall",
        src: 'https://www.youtube.com/embed/BEtIoGQxqQs',
        start: 7,
        end: 7.218,
        key: '6',
        note: 49
      },
      {
        name: 'Peanut Butter Jelly Time - "bat"',
        src: 'https://www.youtube.com/embed/s8MDNFaGfT4',
        start: 23.92,
        end: 24.11,
        key: '8',
        note: 44
      },
      {
        name: 'All Your Base - "base"',
        src: 'https://www.youtube.com/embed/jQE66WA2s-A',
        start: 19.4,
        end: 19.6,
        key: '9',
        note: 34
      },
      {
        name: 'Numa Numa - Squeak',
        src: 'https://www.youtube.com/embed/KmtzQCSh6xk',
        start: 55.7,
        end: 55.95,
        key: '0',
        note: 51
      },
      {
        name: 'Shoes - "Shoes"',
        src: 'https://www.youtube.com/embed/wCF3ywukQYA',
        start: 78,
        end: 78.4,
        key: 'c',
        note: 36
      },
    ]
  },
  {
    name: 'MiddleDub',
    pads: [
      {
        name: 'Lead-in',
        src: 'https://www.youtube.com/embed/z_SQO3vv3p8',
        start: 6.4,
        end: 9.4,
        key: 's',
        note: 49
      },
      {
        name: 'Get out of the refrigerator!',
        src: 'https://www.youtube.com/embed/z_SQO3vv3p8',
        start: 18.5,
        end: 20.7,
        key: 'u',
        note: 52
      },
      {
        src: 'https://www.youtube.com/embed/z_SQO3vv3p8',
        start: 20.9,
        end: 21.65,
        key: 'i',
        note: 45
      },
      {
        src: 'https://www.youtube.com/embed/z_SQO3vv3p8',
        start: 21.48,
        end: 21.73,
        key: 't',
        note: 36,
      },
      {
        src: 'https://www.youtube.com/embed/z_SQO3vv3p8',
        start: 22.32,
        end: 23.12,
        key: 'c',
        note: 40,
      },
      {
        src: 'https://www.youtube.com/embed/z_SQO3vv3p8',
        start: 23.1,
        end: 23.725,
        key: 'v',
        note: 38
      },
      {
        src: 'https://www.youtube.com/embed/z_SQO3vv3p8',
        start: 24.07,
        end: 24.320,
        key: 'w',
        note: 42,
      },
      {
        src: 'https://www.youtube.com/embed/z_SQO3vv3p8',
        start: 24.95,
        end: 25.220,
        key: 'x',
        note: 46,
      },
      {
        src: 'https://www.youtube.com/embed/z_SQO3vv3p8',
        start: 25.20,
        end: 25.550,
        key: 'y',
        note: 48,
      },
      {
        src: 'https://www.youtube.com/embed/z_SQO3vv3p8',
        start: 26.35,
        end: 26.7,
        key: 'z',
        note: 51,
      },
      {
        src: 'https://www.youtube.com/embed/z_SQO3vv3p8',
        start: 38.8,
        end: 39.3,
        key: 'a',
        note: 37,
      },
      {
        name: 'Dubstep\'s for pussies',
        src: 'https://www.youtube.com/embed/K4XY9v7SdFs',
        start: 8.3,
        end: 9.7,
        key: 'b',
        note: 57,
      },
    ]
  },
  {
    name: 'test2',
    pads: [
      {
        src: 'https://www.youtube.com/embed/HPPj6viIBmU',
        start: 99.310,
        end: 99.510,
        key: '2',
        note: 40
      },
      {
        src: 'https://storage.googleapis.com/muxdemofiles/mux-video-intro.mp4',
        start: 4.05,
        end: 4.3,
        key: '3',
        note: 5
      }
    ]
  }
];

export default boardsData;
