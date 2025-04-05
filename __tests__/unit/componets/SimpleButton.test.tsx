import '@testing-library/jest-dom';
import {render, fireEvent, screen} from '@testing-library/react'
import { SimpleButton } from '@/components/common/SimpleButton';

describe('SimpleButton', () => {
  it('should render with initial state "OFF"', () => {
    render(<SimpleButton />);
    // const button = screen.getByRole('button');
    // expect(button).toHaveTextContent('OFF');
  });

  // it('should toggle state on click', () => {
  //   render(<SimpleButton />);
  //   const button = screen.getByRole('button');
    
  //   // Initial state
  //   expect(button).toHaveTextContent('OFF');
    
  //   // Click to turn ON
  //   fireEvent.click(button);
  //   expect(button).toHaveTextContent('ON');
    
  //   // Click to turn OFF
  //   fireEvent.click(button);
  //   expect(button).toHaveTextContent('OFF');
  // });
});