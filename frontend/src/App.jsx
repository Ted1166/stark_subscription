import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Subscription_channel from "./pages/Subscription_channel";

import { Not_found } from "./pages/Not_found";
import MantineLayout from "./layouts/MantineLayout";
import AppProvider from './providers/AppProvider';
import AddPackage from './pages/AddPackage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppProvider>
          <MantineLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/subscription_channel" element={<Subscription_channel />} />
              <Route path="/add-package" element={<AddPackage />} />
              <Route path="*" element={<Not_found />} />
            </Routes>
          </MantineLayout>
        </AppProvider>
      </BrowserRouter>
    </div >
  );
}

export default App;
