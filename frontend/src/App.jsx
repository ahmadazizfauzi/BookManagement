import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageHome from "./pages/Home/PageHome";
import PageAddBook from "./pages/AddBook/PageAddBook";
import PageUpdateBook from "./pages/UpdateBook/PageUpdateBook";
import PageCategories from "./pages/Categories/PageCategories";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/addbook" element={<PageAddBook />} />
        <Route path="/updatebook/:id" element={<PageUpdateBook />} />
        <Route path="/categories" element={<PageCategories />} />
      </Routes>
    </Router>
  );
}

export default App;
