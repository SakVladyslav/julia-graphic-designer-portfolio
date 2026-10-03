import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import SkipLink from "./components/SkipLink/SkipLink";

import LandingPage from "./pages/home/LandingPage";

export default function App() {
  return (
    <div className="container">
      <SkipLink />
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}
