import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const mockOnHandleSearch = jest.fn();
  const mockOnClearSearch = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should render the search bar', () => {
    render(<SearchBar onHandleSearch={mockOnHandleSearch} onClearSearch={mockOnClearSearch} />);
    expect(screen.getByPlaceholderText('Type yout keyword...')).toBeInTheDocument();
  });

  test('should call onHandleSearch after typing a keyword and waiting for debounce', async () => {
    render(<SearchBar onHandleSearch={mockOnHandleSearch} onClearSearch={mockOnClearSearch} />);

    fireEvent.change(screen.getByPlaceholderText('Type yout keyword...'), { target: { value: 'test' } });

    jest.advanceTimersByTime(1000);

    await waitFor(() => expect(mockOnHandleSearch).toHaveBeenCalledWith('test'));
  });

  test('should call onClearSearch when input is cleared', async () => {
    render(<SearchBar onHandleSearch={mockOnHandleSearch} onClearSearch={mockOnClearSearch} />);

    fireEvent.change(screen.getByPlaceholderText('Type yout keyword...'), { target: { value: 'test' } });

    jest.advanceTimersByTime(1000);

    await waitFor(() => expect(mockOnHandleSearch).toHaveBeenCalledWith('test'));

    fireEvent.change(screen.getByPlaceholderText('Type yout keyword...'), { target: { value: '' } });

    jest.advanceTimersByTime(1000);

    await waitFor(() => expect(mockOnClearSearch).toHaveBeenCalled());
  });
});
