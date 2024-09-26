import CountryList from "./components/CountryList";
import CountryInfo from "./components/CountryInfo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:code" element={<CountryInfo />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
