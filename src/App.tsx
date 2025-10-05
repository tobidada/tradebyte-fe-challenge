import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router";
import Home from "./components/pages/Home";
import Repos from "./components/pages/Repos";
import PageContainer from "./components/PageContainer";

function App() {
  return (
    <>
      <Header />
      <PageContainer>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/:username/repos" element={<Repos />} />
        </Routes>
      </PageContainer>
      <Footer />
    </>
  );
}

export default App;
