import { useState } from "react";
import MainPage from "@/components/MainPage";
import Dashboard from "@/components/Dashboard";


function App() {
  const [telaInicial, setDashboard] = useState(true);

  return telaInicial ? <MainPage aoAvancar={() => setDashboard(false)} /> : <Dashboard />;
}

export default App;
