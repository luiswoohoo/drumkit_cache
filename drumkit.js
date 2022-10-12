async function cacheSounds() {
  const soundsCache = await caches.open('soundsCache')
  const soundUrls = [
    '/sounds/boom.wav',
    '/sounds/clap.wav',
    '/sounds/hihat.wav',
    '/sounds/kick.wav',
    '/sounds/openhat.wav',
    '/sounds/ride.wav',
    '/sounds/snare.wav',
    '/sounds/tink.wav',
    '/sounds/tom.wav',
  ]

  soundsCache.addAll(soundUrls)
}

async function playSound(e) {
  // <audio data-key="KeyA" src="sounds/clap.wav"></audio>
  // <audio data-key="KeyS" src="sounds/hihat.wav"></audio>
  // <audio data-key="KeyD" src="sounds/kick.wav"></audio>
  // <audio data-key="KeyF" src="sounds/openhat.wav"></audio>
  // <audio data-key="KeyG" src="sounds/boom.wav"></audio>
  // <audio data-key="KeyH" src="sounds/ride.wav"></audio>
  // <audio data-key="KeyJ" src="sounds/snare.wav"></audio>
  // <audio data-key="KeyK" src="sounds/tom.wav"></audio>
  // <audio data-key="KeyL" src="sounds/tink.wav"></audio>
  let audio
  let key

  if (e.type === 'click') {
    audio = document.querySelector(`audio[data-key="${e.target.dataset.key}"]`)
    key = document.querySelector(`.key[data-key="${e.target.dataset.key}"]`)
  } else {
    // audio = document.querySelector(`audio[data-key="${e.code}"]`)
    const sound = await caches.open('soundsCache')
    console.log(`sounds cache: ${sound}`)
    audio = await sound.match('/sounds/clap.wav') // returns a response object (it's like doing a fetch call)

    const newAudio = new Audio(audio)

    console.log(`audio: ${audio}`)

    // audioRes = await audio.json()
    // console.log(`audio res: ${audioRes}`)

    // console.log(`audio url: ${audio}`)
    key = document.querySelector(`.key[data-key="${e.code}"]`)
  }
  console.log(`event: ${e}`)
  newAudio.play()
  // const audio = document.querySelector(`audio[data-key="${e.code}"]`)
  // const key = document.querySelector(`.key[data-key="${e.code}"]`)

  // if (!audio) return //stop function from running
  // audio.currentTime = 0 //start at beginning of audio file
  // // audio.url.play()
  // key.classList.add('playing')
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return
  this.classList.remove('playing')
}

const keys = document.querySelectorAll('.key')
for (const key of keys) {
  key.addEventListener('transitionend', removeTransition)
  key.addEventListener('click', playSound)
}
// This does same as the above for of loop
// keys.forEach(key => key.addEventListener('transitionend', removeTransition))

cacheSounds()
window.addEventListener('keydown', playSound)
