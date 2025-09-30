import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { Routes, Route } from "react-router";

function App() {

    return (
        <>
            <Header/>
            <Routes>
                <Route index element={<h1>Page 1</h1>} />
                <Route path="page-2" element={<h1>Page 2</h1>} />
                <Route path="page-3" element={<h1>Page 3</h1>} />
            </Routes>
            <Footer/>
        </>
    )
}

export default App
