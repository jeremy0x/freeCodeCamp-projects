import React from 'react'

class Timer extends React.Component {
	constructor() {
		super()

		this.state = {
			isSession: true,
			timerSecond: 0,
			intervalId: 0
		}

		this.playTimer = this.playTimer.bind(this)
		this.decreaseTimer = this.decreaseTimer.bind(this)
		this.stopTimer = this.stopTimer.bind(this)
		this.resetTimer = this.resetTimer.bind(this)
	}

	playTimer() {
		let intervalId = setInterval(this.decreaseTimer, 1000)
		this.props.onPlayStopTimer(true);
		this.setState({
			intervalId: intervalId
		})
	}

	decreaseTimer() {
		switch(this.state.timerSecond) {
			case 0:
				if(this.props.timerMinute === 0) {
					if(this.state.isSession) {
						this.setState({
							isSession: false
						})
						this.props.toggleInterval(this.state.isSession)
					} else {
						this.setState({
							isSession: true
						})
						this.props.toggleInterval(this.state.isSession)
					}
				} else {
					this.props.updateTimerMinute()
					this.setState({
						timerSecond: 59
					})
				}
				break;
			default:
				this.setState((prevState) => {
					return {
						timerSecond: prevState.timerSecond - 1
					}
				})
		}
	}

	stopTimer() {
		clearInterval(this.state.intervalId)
		this.props.onPlayStopTimer(false)
	}

	resetTimer() {
		this.stopTimer()
		this.props.resetTimer()
		this.props.onPlayStopTimer(false)
		this.setState({
			timerSecond: 0,
			isSession: true
		})
	}

	render() {
		return (
			<section>
				<section className='timer-container'>
					<h4 id="timer-label">{this.state.isSession === true ? 'Session' : 'Break'}</h4>
					<section id="time-left">
						<span className='timer'>{this.props.timerMinute}</span>
						<span className='timer'>:</span>
						<span className='timer'>
									{
										this.state.timerSecond === '0' 
										? '00' 
										: this.state.timerSecond < '10' 
										? '0' + this.state.timerSecond 
										: this.state.timerSecond
									}
						</span>
					</section>
				</section>
				<section className="timer-actions">
					<button disabled={this.props.isPlay === true ? "disabled" : ""} onClick={this.playTimer} id="start_stop">Play</button>
					<button onClick={this.stopTimer} id="start_stop">Stop</button>
					<button onClick={this.resetTimer} id="reset">Reset</button>
				</section>
			</section>
		)
	}
}

export default Timer
