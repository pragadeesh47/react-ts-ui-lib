// Button.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from '../../../ui/src/basic-components/Button';

describe('Button', () => {
    it('renders children', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders label when no children', () => {
        render(<Button label="Submit" />);
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}>Click</Button>);
        await userEvent.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when disabled prop is true', () => {
        render(<Button disabled>Click</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('is disabled when isPending is true', () => {
        render(<Button isPending>Loading</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('is highlighted when significance is highlighted', () => {
        render(<Button significance="highlighted">Highlighted</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-highlighted');
    });

    it('is hidden when noPrint is true', () => {
        render(<Button noPrint>Hidden</Button>);
        expect(screen.getByRole('button')).toHaveClass('no-print');
    });

    it('is isPending true', () => {
        render(<Button isPending>Loading</Button>);
        expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('is modern true', () => {
        render(<Button modern>Modern</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-modern');
    });

    it('is colorScheme primary', () => {
        render(<Button colorScheme="primary">Primary</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-primary');
    });

    it('is colorScheme success', () => {
        render(<Button colorScheme="success">Success</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-success');
    });
    
    
});