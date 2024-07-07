// Loader.test.js

import React from "react";
import { render } from "@testing-library/react";
import Loader from "../Loader";

// Mock pentru imagine
jest.mock("next/image", () => {
  return ({ src, alt, ...rest }) => {
    return <img src={src} alt={alt} {...rest} />;
  };
});

describe("Loader Component", () => {
  it("renders Loader component correctly", () => {
    const { getByAltText } = render(<Loader />);

    // Verificăm dacă imaginea loader-ului este prezentă
    expect(getByAltText("loader")).toBeInTheDocument();
  });
});
