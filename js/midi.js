var midi, data;
var kick;

// request MIDI access
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
      sysex: false
  }).then(onMIDISuccess, onMIDIFailure);
} else {
  console.log("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
  console.log('onMIDISuccess');

  // when we get a succesful response, run this code
  midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

  var inputs = midi.inputs.values();
  // loop over all available inputs and listen for any MIDI input
  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      window.input1 = input.value;

      // each time there is a midi message call the onMIDIMessage function
      input.value.onmidimessage = onMIDIMessage;
  }
}

function onMIDIFailure(error) {
  // when we get a failed response, run this code
  console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
  data = message.data,
  cmd = data[0] >> 4,
  channel = data[0] & 0xf,
  type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
  note = data[1],
  velocity = data[2];

  if (type === 144 && velocity > 0) {
    performance.mark('onMIDIMessage');
    console.log('onMIDIMessage', Date.now());
    kick.trigger(context.currentTime);
  }

  if (cmd != 15) {
    console.log(cmd, channel, type, note, velocity);
  }

  if (type === 144 && velocity > 0) {
    playNote(note);
  }



  // with pressure and tilt off
  // note off: 128, cmd: 8
  // note on: 144, cmd: 9
  // pressure / tilt on
  // pressure: 176, cmd 11:
  // bend: 224, cmd: 14

  // switch (type) {
  //   case 144: // noteOn message
  //     noteOn(note, velocity);
  //     break;
  //   case 128: // noteOff message
  //     noteOff(note, velocity);
  //     break;
  // }
}

// For testing the real timeness of the midi messages.
// Conclusion: Pretty instantanious to the browser.
// Lag seems be between the message and playing the video.
var context = new AudioContext;

function Kick(context) {
  this.context = context;
};

Kick.prototype.setup = function() {
  this.osc = this.context.createOscillator();
  this.gain = this.context.createGain();
  this.osc.connect(this.gain);
  this.gain.connect(this.context.destination)
};

Kick.prototype.trigger = function(time) {
  this.setup();

  this.osc.frequency.setValueAtTime(150, time);
  this.gain.gain.setValueAtTime(1, time);

  this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
  this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

  this.osc.start(time);

  this.osc.stop(time + 0.5);
};

kick = new Kick(context);
