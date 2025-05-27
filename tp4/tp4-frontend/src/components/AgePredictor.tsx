import { Component } from 'react';

interface AgePredictorState {
    name: string;
    age: number | null;
    loading: boolean;
    error: string | null;
}

class AgePredictor extends Component<object, AgePredictorState> {
    constructor(props: object) {
        super(props);
        this.state = {
            name: 'Leonardo Juan Pablo',
            age: null,
            loading: false,
            error: null
        };
    }

    fetchAge = async () => {
        this.setState({ loading: true, error: null });

        try {
            const response = await fetch(`https://api.agify.io/?name=${this.state.name}`);

            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }

            const data = await response.json();

            this.setState({
                age: data.age,
                loading: false
            });
        } catch {
            this.setState({
                error: 'Error al obtener los datos',
                loading: false
            });
        }
    }

    componentDidMount() {
        this.fetchAge();
    }

    render() {
        const { name, age, loading, error } = this.state;

        return (
            <div className="age-predictor-container">
                <h2>Predictor de Edad con API</h2>
                <p>Nombre: {name}</p>

                {loading && <p>Cargando...</p>}

                {error && <p className="error">{error}</p>}

                {!loading && !error && age !== null && (
                    <p>Edad predicha: {age} años</p>
                )}

                <button onClick={this.fetchAge}>Actualizar Predicción</button>
            </div>
        );
    }
}

export default AgePredictor; 