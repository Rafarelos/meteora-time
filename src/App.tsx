import { useState } from "react";
import MainPage from "@/components/pages/MainPage";
import Dashboard from "@/components/pages/Dashboard";


function App() {
  const [telaInicial, setDashboard] = useState(true);

  return telaInicial ? <MainPage aoAvancar={() => setDashboard(false)} /> : <Dashboard />;
}

export default App;
