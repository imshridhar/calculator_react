import React, { useReducer } from 'react';

const initialState = {
    currentInput: '0',
    operator: null,
    previousInput: null
};

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_INPUT':
            return {
                ...state,
                currentInput: state.currentInput === '0' ? action.payload : state.currentInput + action.payload
            };
        case 'CLEAR':
            return initialState;
        case 'CHOOSE_OPERATOR':
            return {
                ...state,
                operator: action.payload,
                previousInput: state.currentInput,
                currentInput: '0'
            };
        case 'CALCULATE':
            let result;
            switch (state.operator) {
                case '+':
                    result = parseFloat(state.previousInput) + parseFloat(state.currentInput);
                    break;
                case '-':
                    result = parseFloat(state.previousInput) - parseFloat(state.currentInput);
                    break;
                case '*':
                    result = parseFloat(state.previousInput) * parseFloat(state.currentInput);
                    break;
                case '/':
                    result = parseFloat(state.previousInput) / parseFloat(state.currentInput);
                    break;
                default:
                    return state;
            }
            return {
                ...state,
                operator: null,
                previousInput: null,
                currentInput: String(result)
            };
        default:
            return state;
    }
}

const Calculator = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleButtonClick = (value) => {
        if (!isNaN(value) || value === '.') {
            dispatch({ type: 'ADD_INPUT', payload: value });
        } else if (value === 'C') {
            dispatch({ type: 'CLEAR' });
        } else if (['+', '-', '*', '/'].includes(value)) {
            dispatch({ type: 'CHOOSE_OPERATOR', payload: value });
        } else if (value === '=') {
            dispatch({ type: 'CALCULATE' });
        }
    };

    return (
        <div className="calculator">
            <div className="display">{state.currentInput}</div>
            <div className="buttons">
                {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '0', '.', '=', '/'].map((button) => (
                    <button key={button} onClick={() => handleButtonClick(button)}>
                        {button} 
                    </button>
                ))}
                <button onClick={() => handleButtonClick('C')}>C</button>
            </div>
        </div>
    );
};

export default Calculator;
