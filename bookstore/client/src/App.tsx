import "./App.css";
import BookList from "./pages/BooksCatalog";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
      </Routes>
    </Router>
  );
}

export default App;
