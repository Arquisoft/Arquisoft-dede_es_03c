import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import LangState from '../lang';
import UserState from '../User';
import OpenState from '../OpenCart';

test('App (Home) renders properly', () => {
  localStorage.setItem('currentUser', "not logged");
  
  render(
    <React.StrictMode>
      <UserState>
        <LangState>
          <OpenState>
            <App />
          </OpenState>
        </LangState>
      </UserState>
    </React.StrictMode>,
  );

  let linkElement = screen.getAllByLabelText(/carouselImage1/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getAllByLabelText(/carouselImage2/i);
  expect(linkElement).toBeInTheDocument();
});