var midi, data;

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
      // window.input1 = input.value;
      // each time there is a midi message call the onMIDIMessage function
      input.value.onmidimessage = onMIDIMessage;
  }
}

function onMIDIFailure(error) {
  // when we get a failed response, run this code
  console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
  data = message.data;

  let eventDetail = {
    cmd: data[0] >> 4,
    channel: data[0] & 0xf,
    type: data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
    note: data[1],
    velocity: data[2]
  }

  if (eventDetail.type === 144 && eventDetail.velocity > 0) {
    window.dispatchEvent(new CustomEvent('midimessage', { detail: eventDetail }));
    // playNote(note);
  }

  // if (cmd != 15) {
  //   console.log(cmd, channel, type, note, velocity);
  // }

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
