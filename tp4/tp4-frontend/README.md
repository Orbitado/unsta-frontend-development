# TP4: Componentes de Clase en React

Este proyecto es el Trabajo Práctico N°4 para la materia "Desarrollo de Front End" de la UNSTA, cursado en el año 2025.

## Autor

**Leonardo Juan Pablo Valdez**  
Legajo: UIA70262  
[Mi sitio web](https://vleonardojuanpablo.com/)

## Descripción

Este proyecto implementa tres componentes de clase en React que demuestran diferentes funcionalidades:

1. **Componente Contador**: Un contador simple con botones para incrementar y decrementar un valor.
2. **Componente Reloj**: Un reloj que muestra la hora actual y puede iniciarse o detenerse mediante botones.
3. **Componente Predictor de Edad**: Un componente que realiza una petición AJAX a la API de Agify para predecir la edad basada en un nombre.

## Tecnologías Utilizadas

- React
- TypeScript
- Vite
- CSS puro para los estilos

## Requisitos del TP

Los requisitos específicos que se abordan en este trabajo práctico son:

- Implementación de componentes de clase
- Manejo de estado interno en componentes
- Comunicación entre componentes
- Gestión de eventos
- Peticiones AJAX utilizando fetch

## Instrucciones de Instalación

Para ejecutar este proyecto localmente:

```bash
# Clonar el repositorio (o descargar)
git clone https://github.com/Orbitado/unsta-frontend-development.git

# Navegar al directorio del proyecto
cd tp4-frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## Estructura del Proyecto

```
tp4-frontend/
├── src/
│   ├── components/
│   │   ├── Counter.tsx      # Componente Contador
│   │   ├── Clock.tsx        # Componente Reloj
│   │   └── AgePredictor.tsx # Componente Predictor de Edad
│   ├── App.tsx              # Componente principal
│   ├── App.css              # Estilos principales
│   ├── index.css            # Estilos globales
│   └── main.tsx             # Punto de entrada
├── public/                  # Archivos públicos
├── index.html               # HTML principal
└── package.json             # Dependencias y scripts
```

## Profesor

Ing. Marcos Rivero

## Fecha de Entrega

29 de Mayo de 2025
