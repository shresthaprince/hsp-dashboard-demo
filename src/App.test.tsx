import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Health Sensor Platform text", () => {
  render(<App />);
  const textElement = screen.getByText(/Health Sensor Platform/i);
  expect(textElement).toBeInTheDocument();
});
