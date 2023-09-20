import React, { useReducer } from 'react';

// Тип стану компонента
type State = {
  isRequestInProgress: boolean;
  requestStep: 'start' | 'pending' | 'finished' | 'idle';
};

// Типи дій, які можна виконати над станом
type Action =
  | { type: 'START_REQUEST' }
  | { type: 'PENDING_REQUEST' }
  | { type: 'FINISH_REQUEST' }
  | { type: 'RESET_REQUEST' };

// Початковий стан компонента
const initialState: State = {
  isRequestInProgress: false,
  requestStep: 'idle',
};

// Редуктор, який змінює стан відповідно до дій
function requestReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START_REQUEST':
      return { ...state, isRequestInProgress: true, requestStep: 'start' };
    case 'PENDING_REQUEST':
      return { ...state, isRequestInProgress: true, requestStep: 'pending' };
    case 'FINISH_REQUEST':
      return { ...state, isRequestInProgress: false, requestStep: 'finished' };
    case 'RESET_REQUEST':
      return { ...state, isRequestInProgress: false, requestStep: 'idle' };
    default:
      return state;
  }
}

export function RequestComponent() {
  // Використовуємо useReducer для керування станом
  const [requestState, requestDispatch] = useReducer(
    requestReducer,
    initialState
  );

  // Функція для початку запиту
  const startRequest = () => {
    requestDispatch({ type: 'START_REQUEST' });

    // Імітуємо запит до сервера
    setTimeout(() => {
      requestDispatch({ type: 'PENDING_REQUEST' });

      // Імітуємо отримання відповіді від сервера
      setTimeout(() => {
        requestDispatch({ type: 'FINISH_REQUEST' });
      }, 2000);
    }, 2000);
  };

  // Функція для скидання запиту
  const resetRequest = () => {
    requestDispatch({ type: 'RESET_REQUEST' });
  };

  return (
    <div>
      <button onClick={startRequest}>Почати запит</button>
      <button onClick={resetRequest}>Скинути запит</button>
      <p>Стан запиту: {requestState.requestStep}</p>
    </div>
  );
}

export default RequestComponent;
