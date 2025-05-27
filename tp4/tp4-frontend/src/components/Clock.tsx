import { Component } from 'react';

interface ClockState {
    time: string;
    timerID: number | null;
}

class Clock extends Component<object, ClockState> {
    constructor(props: object) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString(),
            timerID: null
        };
    }

    startClock = () => {
        if (this.state.timerID === null) {
            const id = window.setInterval(() => {
                this.setState({
                    time: new Date().toLocaleTimeString()
                });
            }, 1000);

            this.setState({
                timerID: id
            });
        }
    }

    stopClock = () => {
        if (this.state.timerID !== null) {
            window.clearInterval(this.state.timerID);
            this.setState({
                timerID: null
            });
        }
    }

    componentWillUnmount() {
        if (this.state.timerID !== null) {
            window.clearInterval(this.state.timerID);
        }
    }

    render() {
        return (
            <div className="clock-container">
                <h2>Reloj con Componente de Clase</h2>
                <div className="clock-display">
                    <p>Hora actual: {this.state.time}</p>
                </div>
                <div className="clock-buttons">
                    <button onClick={this.startClock}>Iniciar Reloj</button>
                    <button onClick={this.stopClock}>Detener Reloj</button>
                </div>
            </div>
        );
    }
}

export default Clock; 