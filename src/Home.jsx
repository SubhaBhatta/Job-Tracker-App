import React from "react";
import Dashboard from "./Dashboard";

const storedUser = JSON.parse(localStorage.getItem(formData.name));

const App = () => {
  return <Dashboard user={storedUser} />;
};

export default App;
