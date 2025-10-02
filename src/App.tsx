import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { Routes, Route } from "react-router";
import Home from "./components/pages/Home.tsx";
import Repos from "./components/pages/Repos.tsx";
import PageContainer from "./components/PageContainer.tsx";

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
