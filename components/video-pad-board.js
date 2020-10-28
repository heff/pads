function getTemplate(src, start) {
  const template = document.createElement('template');

  template.innerHTML = `
  <style>
    :host {
    }

    .padcontainer {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      align-content: center;
      flex-wrap: wrap;
    }

    .padcontainer video-pad {
      position: relative;
      overflow: hidden;
    }

    .padcontainer.perform-mode video-pad {
      display: none;
      width: 400px;
      height: 400px;
    }

  </style>
  <div class="padcontainer">
    <slot></slot>
  </div>
  `;

  return template;
}

class VideoPadBoard extends HTMLElement {
  constructor() {
    super();

    var shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(getTemplate().content.cloneNode(true));
    this.padcontainer = this.shadowRoot.querySelector('.padcontainer');

    this.noteMap = {};
    this.keyMap = {};
  }

  connectedCallback() {
    this.midiListener = (e) => {
      console.log('note', e.detail.note);
      const pad = this.noteMap[e.detail.note];
      pad && pad.play();
    }
    window.addEventListener('midimessage', this.midiListener);

    this.keyListener = (e) => {
      const key = keyMappings[e.keyCode ? e.keyCode : e.which];
      const pad = this.keyMap[key];
      pad && pad.play();
    };
    window.addEventListener('keydown', this.keyListener);
  }

  disconnectedCallback() {
    window.removeEventListener('midimessage', this.midiListener);
    window.removeEventListener('keydown', this.keyListener);
  }

  loadBoardData(boardData) {
    this.padcontainer.innerHTML = '';

    // Triggering pads via MIDI or keys at the board level so there aren't
    // event listeners running for each pad
    this.noteMap = {};
    this.keyMap = {};

    boardData.pads.forEach((padData) => {
      const padTemplate = document.createElement('template');
      padTemplate.innerHTML = `
        <video-pad
          src="${padData.src}"
          start="${padData.start}"
          end="${padData.end}"
          key="${padData.key}"
          note="${padData.note}"
        ></video-pad>
      `;
      let pad = padTemplate.content.cloneNode(true).querySelector('video-pad');
      this.padcontainer.appendChild(pad);
      this.noteMap[padData.note] = pad;
      this.keyMap[padData.key] = pad;
    });
  }

  togglePerformMode() {
    this.padcontainer.classList.toggle('perform-mode');
  }
}

if (!window.customElements.get('video-pad-board')) {
  window.customElements.define('video-pad-board', VideoPadBoard);
  window.VideoPadBoard = VideoPadBoard;
}

export default VideoPadBoard;
