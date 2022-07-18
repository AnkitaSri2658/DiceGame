import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import App from "./App";

it("loading App", () => {
  render(<App />);
  const HeadingRollingDice = screen.getByText(/Rolling Dice/i);
  expect(HeadingRollingDice).toBeInTheDocument();
});
