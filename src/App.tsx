import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DynamicPage from "./pages/download_page";

function HomePage() {
  return <h1></h1>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<DynamicPage />} />
      </Routes>
    </Router>
  );
}
