import React,{useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./Quiz";
import ResultsPage from "./ResultsPage";
import UserInfo from "./UserInfo";

function AppRouter() {
    
    const [marks, setMarks] = useState(0);
    const [MCqs, setMCqs] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserInfo />} />
        <Route path="/quiz-test" element={<Quiz marks={marks} setMarks={setMarks} MCqs={MCqs} setMCqs={setMCqs} />} />
        <Route path="results" element={<ResultsPage marks={marks} setMarks={setMarks} MCqs={MCqs} setMCqs={setMCqs} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
