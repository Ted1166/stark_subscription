import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Subscription_channel from "./pages/Subscription_channel";

import { Not_found } from "./pages/Not_found";
import History from "./pages/History";
import MantineLayout from "./layouts/MantineLayout";
import AppProvider from './providers/AppProvider';
import AddPackage from './pages/AddPackage';
import Profile from "./pages/Profile";

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
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Not_found />} />
            </Routes>
          </MantineLayout>
        </AppProvider>
      </BrowserRouter>
    </div >
  );
}

export default App;
