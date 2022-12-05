import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./AppContextProvider";
import { Details } from "./pages/Details";
import { Home } from "./pages/Home";

export const AppRoutes = () => {
    return (
        <Router>
           <AppContextProvider>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/details" element={<Details />} />
              </Routes>
            </AppContextProvider>
        </Router>
    )
}