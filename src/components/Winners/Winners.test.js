import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Winners from './Winners';


describe('Winners', () => {
    test.skip('Winners text renders', () => {
        render(<Winners />);
        const winnersText = screen.getByText(/Winners/i);
        expect(winnersText).toBeInTheDocument();
    });

});