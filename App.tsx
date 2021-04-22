import React, { useState, useEffect } from "react";
import { Database } from "./src/database";
import { Navigation } from "./src/Navigation";

export default function App() {
  useEffect(() => {
    new Database();
  }, []);

  return <Navigation />;
}
