import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/home/Home";
import Nabvar from "./components/navbar/Nabvar";
import { FirebaseProvider } from "./context/Firebase";
import AddReview from "./page/addreview/AddReview";
import EditReview from "./page/editReview/EditReview";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Nabvar />
        <FirebaseProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addreview" element={<AddReview />} />
            <Route path="/editreview" element={<EditReview />} />
          </Routes>
        </FirebaseProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
