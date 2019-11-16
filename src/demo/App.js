import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import Slider from 'react-input-slider'

import './reset.css'
import './defaults.css'
import './range.css'
import './App.css'

import ReactPlayer from '../ReactPlayer'
import Duration from './Duration'

const MULTIPLE_SOURCES = [
  {
    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    type: 'video/mp4'
  },
  {
    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv',
    type: 'video/ogv'
  },
  {
    src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm',
    type: 'video/webm'
  }
]

class App extends Component {
  state = {
    url: null,
    pip: false,
    playing: true,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false })
  }

  // handleToggleLoop = () => {
  //   this.setState({ loop: !this.state.loop })
  // }

  // handleVolumeChange = e => {
  //   this.setState({ volume: parseFloat(e.target.value) })
  // }

  // handleToggleMuted = () => {
  //   this.setState({ muted: !this.state.muted })
  // }

  handlePlay = () => {
    this.setState({ playing: true })
  }

  handlePause = () => {
    this.setState({ playing: false })
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e) })
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e))
  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  // handleEnded = () => {
  //   console.log('onEnded')
  //   this.setState({ playing: this.state.loop })
  // }

  handleDuration = duration => {
    this.setState({ duration })
  }

  renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>
  }

  ref = player => {
    this.player = player
  }

  render () {
    const { url, playing, controls, played, loaded, duration } = this.state

    return (
      <div className='app'
        style={{
          height: '100vh',
          backgroundColor: '#222'
        }}
      >
        <section 
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '5%',
            padding: '32px',
            border: '1px solid white'
          }}>
          <h1>Player</h1>
          <div className='player-wrapper'
            style={{
              height: 0,
              width: '500px',
            }}
          >
            <ReactPlayer
              ref={this.ref}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              playing={playing}
              controls={false}
              onPlay={this.handlePlay}
              onPause={this.handlePause}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >

            <div>
            <Duration seconds={duration * played} />
              <Slider
                axis='x'
                xstep={0.01}
                xmin={0}
                xmax={1}
                x={played}
                onChange={({ x }) => {
                  this.handleSeekChange(x)
                }}
                onMouseDown={() => {
                  this.handleSeekMouseDown()
                }}
                styles={{
                  track: {
                    width: '100%',
                    height: '40px',
                  },
                  thumb: {
                    height: '40px',
                    borderRadius: 0,
                    border: 'none',
                    boxShadow: '0',
                    backgroundColor: 'violet'
                  },
                  active: {
                    backgroundColor: 'skyblue'
                  }
                }}
              />
              <Duration seconds={duration} />
            </div>
          
            <button onClick={this.handleStop}>Stop</button>
            <button onClick={this.handlePlayPause}>
              {playing ? 'Pause' : 'Play'}
            </button>

          </div>

        </section>
        <section className='section' 
          style={{
            width: '500px',
            height: 'auto',
            border: '1px solid grey'
          }}>
          <h1>PlayList</h1>
          <div
            onClick={() => {
              this.load(
                'https://www.youtube.com/watch?v=iH0kfH04U68'
              )
            }}
            style={{
              width: '300px',
              height: '50px',
              cursor: 'pointer'
            }}
          >
            Song
          </div>
          
          <div
            onClick={() => {
              this.load(
                'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3'
              )
            }}
            style={{
              width: '300px',
              height: '50px',
              cursor: 'pointer'
            }}
          >
            Song
          </div>
          
          <div
            onClick={() => {
              this.load(
                'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3'
              )
            }}
            style={{
              width: '300px',
              height: '50px',
              cursor: 'pointer'
            }}
          >
            Song
          </div>
          
          <div
            onClick={() => {
              this.load(
                'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3'
              )
            }}
            style={{
              width: '300px',
              height: '50px',
              cursor: 'pointer'
            }}
          >
            Song
          </div>
          
          <div
            onClick={() => {
              this.load(
                'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3'
              )
            }}
            style={{
              width: '300px',
              height: '50px',
              cursor: 'pointer'
            }}
          >
            Song
          </div>
          
          
        </section>

      </div>
    )
  }
}

export default hot(module)(App)
