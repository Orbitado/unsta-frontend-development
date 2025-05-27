import { Component } from 'react';

interface CounterState {
    count: number;
}

class Counter extends Component<object, CounterState> {
    constructor(props: object) {
        super(props);
        this.state = {
            count: 0
        };
    }

    increment = () => {
        this.setState((prevState) => ({
            count: prevState.count + 1
        }));
    }

    decrement = () => {
        this.setState((prevState) => ({
            count: prevState.count - 1
        }));
    }

    render() {
        return (
            <div className="counter-container">
                <h2>Contador con Componente de Clase</h2>
                <div className="counter-display">
                    <p>Contador: {this.state.count}</p>
                </div>
                <div className="counter-buttons">
                    <button onClick={this.increment}>Incrementar</button>
                    <button onClick={this.decrement}>Decrementar</button>
                </div>
            </div>
        );
    }
}

export default Counter; 