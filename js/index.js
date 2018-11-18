var youtubeAPIReady = false;
var padSection = document.querySelector('#padsSection');
var configSection = document.querySelector('#configSection');

function createConfigSelector() {
  const select = document.createElement('select');
  select.id = 'configSelect';
  select.addEventListener('change', updatePads, false);

  configs.forEach(function(config){
    var option =  document.createElement('option');
    option.value = config.name;
    option.innerText = config.name;
    select.appendChild(option);
  });

  configSection.innerHTML = '';
  configSection.appendChild(select);
}
createConfigSelector();

function updatePads(){
  var configSelect = document.querySelector('#configSelect');

  padSection.innerHTML = '';
  configsByName[configSelect.value].pads.forEach(function(padInfo){
    const padID = padInfo[0];
    const padKey = padInfo[1];
    createPad(padID, padKey);
  });
}

function createPad(id, key) {
  var pad = pads[id];
  var padName = `pad${id}`;
  var padKey = key || pad.key;

  var padEl = document.createElement('div');
  padEl.className = 'pad';

  var placeHolder = document.createElement('div');
  placeHolder.id = padName;

  padEl.appendChild(placeHolder);
  padSection.appendChild(padEl);

  var trigger = document.createElement('div');
  trigger.className = 'padTrigger';
  trigger.innerHTML = padName + ' ('+padKey+')';
  padEl.appendChild(trigger);

  trigger.addEventListener('mousedown', function(){
    playPad(id);
  });

  var player = pads[id].player = new YT.Player(padName, {
    height: '270',
    width: '300',
    videoId: pad.video,
    playerVars: {
      // 'autoplay': 1,
      controls: 0,
      rel: 0,
      disablekb: 1,
      enablejsapi: 1,
      iv_load_policy: 3,
      modestbranding: 1,
      showinfo: 0
    },
    events: {
      'onReady': function(){
        player.playVideo();
        setTimeout(function(){
          player.pauseVideo();
        }, 1000);
      },
      'onStateChange': function(){}
    }
  });

  window.addEventListener('keydown', function(e){
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == keyMappings[padKey]) {
      playPad(id);
    }
  });
}

function playPad(id) {
  window.clearTimeout(pads[id].timeout);

  pads[id].player.seekTo(pads[id].start);
  pads[id].player.playVideo();

  pads[id].timeout = window.setTimeout(function() {
    pads[id].player.pauseVideo();
    pads[id].player.seekTo(pads[id].start);
  }, pads[id].duration);
}

function onYouTubeIframeAPIReady() {
  console.log('onYouTubeIframeAPIReady');
  youtubeAPIReady = true;
  updatePads();
}
