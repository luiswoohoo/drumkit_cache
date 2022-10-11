function playSound(e) {
  let audio
  let key

  if (e.type === 'click') {
    audio = document.querySelector(`audio[data-key="${e.target.dataset.key}"]`)
    key = document.querySelector(`.key[data-key="${e.target.dataset.key}"]`)
  } else {
    audio = document.querySelector(`audio[data-key="${e.code}"]`)
    key = document.querySelector(`.key[data-key="${e.code}"]`)
  }
  // console.log(e)

  // const audio = document.querySelector(`audio[data-key="${e.code}"]`)
  // const key = document.querySelector(`.key[data-key="${e.code}"]`)

  if (!audio) return //stop function from running
  audio.currentTime = 0 //start at beginning of audio file
  audio.play()
  key.classList.add('playing')
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



async function cacheSounds() {
  const soundsCache = await caches.open('soundsCache')
  const soundUrls = [
    'sounds/boom.wav',
    'sounds/clap.wav',
    'sounds/hihat.wav',
    'sounds/kick.wav',
    'sounds/openhat.wav',
    'sounds/ride.wav',
    'sounds/snare.wav',
    'sounds/tink.wav',
    'sounds/tom.wav',
  ]

  soundsCache.addAll(soundUrls)
}



cacheSounds()
window.addEventListener('keydown', playSound)