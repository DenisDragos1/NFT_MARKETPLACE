import React from "react";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; // pentru a extinde așteptările jest-dom

import Button from "../Button";

describe("Button Component", () => {
  it("renders button correctly", () => {
    const mockHandleClick = jest.fn(); // Mock pentru funcția handleClick

    // Renderizează componenta
    const { getByText } = render(
      <Button
        btnName="Click Me"
        handleClick={mockHandleClick}
        icon={<span>Icon</span>}
        classStyle="custom-class"
      />
    );

    // Verifică dacă butonul este renderizat corect
    const buttonElement = getByText(/Click Me/);
    expect(buttonElement).toBeInTheDocument();

    // Simulează click pe buton
    fireEvent.click(buttonElement);

    // Verifică dacă funcția handleClick a fost apelată corect
    expect(mockHandleClick).toHaveBeenCalled();
  });

  // Teste suplimentare pentru alte funcționalități ale componentei Button pot fi adăugate aici
});
