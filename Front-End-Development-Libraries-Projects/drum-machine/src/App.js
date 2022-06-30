import "./App.scss"
import { useState, useEffect } from 'react'

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
]

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
]

const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit"
}

const soundGroup = {
  heaterKit: bankOne,
  smoothPianoKit: bankTwo
}

const DrumPadsComponent = ({
                              play,
                              sound: { keyTrigger, url, id, keyCode }
                            }) => {

  const handleKeyDown = (event) => {
    if(event.keyCode === keyCode) {
      play(keyTrigger, id)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
  })

  return (
    <button
      key={keyTrigger}
      className='drum-pad'
      id={id}
      onClick={() => play(keyTrigger, id)}
    >
      <audio
        className='clip'
        id={keyTrigger}
        src={url}
      />
      {keyTrigger}
    </button>
  )
}

const DrumControls = ({
                        powerSwitch,
                        power,
                        switchBank,
                        volume,
                        handleVolumeChange,
                        soundNameDisplay
                      }) => {
  return (
    <>
      <>Power</>
      <br />
      <label className="switch flipped">
        <input type="checkbox" onChange={powerSwitch} />
        <span className="slider"></span>
      </label>
      <h2 id="display">{soundNameDisplay}</h2>
      <h2 id="display">Volume: {Math.round(volume * 100)}%</h2>
      <input
        max="1"
        min="0"
        step="0.01"
        type="range"
        value={volume}
        onChange={handleVolumeChange}
      />
      <br />
      <>Bank</>
      <br />
      <label className="switch">
        <input type="checkbox" onChange={switchBank} />
        <span className="slider"></span>
      </label>
    </>
  )
}

const DrumPads = ({ power, play, sounds}) => {
  return power
          ? sounds.map((sound) => <DrumPadsComponent play={play} sound={sound} />)
          : sounds.map((sound) => <DrumPadsComponent play={play} sound={{...sound, url:"#"}} />)
}

function App() {

  const [power, setPower] = useState(true)
  const [volume, setVolume] = useState(1)
  const [soundName, setSoundName] = useState("")
  const [soundType, setSoundType] = useState("heaterKit")
  const [sounds, setSounds] = useState(soundGroup[soundType])

  const powerSwitch = () => {
    setPower(!power)
  }

  const handleVolumeChange = (event) => {
    setVolume(event.target.value)
  }

  const switchBank = () => {
    setSoundName("")
    if(soundType === "heaterKit") {
      setSoundType("smoothPianoKit")
      setSounds(soundGroup.smoothPianoKit)
    } else {
      setSoundType("heaterKit")
      setSounds(soundGroup.heaterKit)
    }
  }

  const play = (soundKey, soundId) => {
    setSoundName(soundId)
    const audio = document.getElementById(soundKey)
    audio.currentTime = 0
    audio.play()
  }

  const setSoundVolume = () => {
    const audios = sounds.map(sound =>  document.getElementById(sound.keyTrigger))
    audios.forEach(audio => {
      if(audio) {
        audio.volume = volume
      }
    })
  }

  return (
    <div id="root">
      <div id='drum-machine' className="inner-container">
        {setSoundVolume()}
        <div className='pad-bank'>
          <DrumPads play={play} sounds={sounds} power={power} />
        </div>
        <div className='controls-container'>
          <DrumControls
            powerSwitch={powerSwitch}
            power={power}
            volume={volume}
            handleVolumeChange={handleVolumeChange}
            soundNameDisplay={soundName || soundsName[soundType]}
            switchBank={switchBank}
          />
        </div>
      </div>
    </div>
  )
}

export default App
