import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../stores/GameStore';
import StartGame from './StartGame';
import user from '@testing-library/user-event';

describe('StartGame component', () => {
    test('renders Start Game button', () => {
        render(<Provider store={store}><StartGame /></Provider>);
        const btnStartGame = screen.getByRole('button');
        expect(btnStartGame).toBeInTheDocument();
    });

    test.only('click handler is called', async () => {
        user.setup();
        const clickHandler = jest.fn();
        render(<Provider store={store}><StartGame /></Provider>);
        const startGameButton = screen.getByRole('button', { name: 'START GAME' });
        await user.click(startGameButton);
        expect(clickHandler.mock.calls.length).toEqual(1);
    });
});