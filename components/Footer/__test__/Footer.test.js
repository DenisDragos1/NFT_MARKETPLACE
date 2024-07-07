import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component", () => {
  it("should render the footer component", () => {
    render(<Footer />);
    expect(screen.getByText(/NFTALE/i)).toBeInTheDocument();
  });
});
