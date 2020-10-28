function getTemplate(src, start) {
  const template = document.createElement('template');

  let videoElPrefix = '';
  if (src.indexOf('youtube.com') > 0) {
    videoElPrefix = 'youtube-';
  }

  template.innerHTML = `
  <style>
    :host {
    }

    .container {
      position: relative;
      width: 200px;
      height: 200px;

      /* width:20vw;
      height:20vw; */
      /* min-width: 150px;
      min-height: 150px;
      max-height: 500px;
      max-width: 500px; */
    }

    .videoEl {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .trigger {
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      text-align: center;
      border: 4px solid #fff;
      color: #fff;
      background-color: #009;
      font-weight: bold;
      font-size: 30px;
      line-height: 100%;
      padding: 20px;
      text-transform: uppercase;
      user-select: none;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  </style>
  <div class="container">
    <${videoElPrefix}video
      class="videoEl"
      src="${src}"
      initialTime=${start}
    ></${videoElPrefix}video>
    <div class="trigger"></div>
  </div>
  `;

  return template;
}

class VideoPad extends HTMLElement {
  constructor() {
    super();

    this.src = this.getAttribute('src');
    this.key = this.getAttribute('key');
    this.start = this.getAttribute('start');
    this.end = this.getAttribute('end');

    var shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(getTemplate(this.src, this.start).content.cloneNode(true));

    this.trigger = this.shadowRoot.querySelector('.trigger');
    this.trigger.innerHTML = this.key;

    this.videoEl = this.shadowRoot.querySelector('.videoEl');

    this.addEventListener('mousedown', e => {
      this.play(e);
    });
  }

  connectedCallback() {
    const videoEl = this.videoEl;

    const primeVideo = () => {
      videoEl.play();
      setTimeout(() => {
        videoEl.pause();
        this.play();
      }, 1000);
    };

    if (videoEl.readyState <= 0) {
      this.videoEl.addEventListener('loadedmetadata', primeVideo);
    } else {
      primeVideo();
    }

    // this.keyListener = function(e){
    //   var key = e.keyCode ? e.keyCode : e.which;
    //
    //   if (keyMappings[this.key] === key) {
    //     this.play(e);
    //   }
    // }.bind(this);
    // window.addEventListener('keydown', this.keyListener);
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.keyListener);
  }

  play() {
    window.clearTimeout(this.playTimeout);
    this.videoEl.currentTime = this.start;
    this.videoEl.play();

    this.style.display = 'block';

    this.playTimeout = window.setTimeout(function() {
      this.videoEl.pause();
      this.videoEl.currentTime = this.start;
      this.videoEl.volume = 1;
      this.style.display = '';
    }.bind(this), (this.end - this.start)*1000);
  }
}

if (!window.customElements.get('video-pad')) {
  window.customElements.define('video-pad', VideoPad);
  window.VideoPad = VideoPad;
}

export default VideoPad;
