import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/dashboard";
import Page404 from "./pages/404";
import Quiz from "./pages/quiz";
function R() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Dashboard />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}
export default R;
