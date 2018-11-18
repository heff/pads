var configs = [
  {
    name: 'middledub',
    pads: [
      [8, 's'],
      [6, 'u'],
      [7, 'i'],
      [9, 't'],
      [10, 'c'],
      [11, 'v'],
      [12, 'w'],
      [13, 'x'],
      [14, 'y'],
      [15, 'z'],
      [16, 'a'],
      [17, 'b'],
    ]
  },
  {
    name: 'memedrums',
    pads: [
      [0, 'space'],
      [1, 's'],
      [2, 't'],
      [3, 'b'],
      [4, 'd'],
      [5, 'r'],
    ]
  },
];

var configsByName = {};
configs.forEach(function(config){
  configsByName[config.name] = config;
});
