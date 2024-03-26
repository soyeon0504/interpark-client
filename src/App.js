import "./styles/common.css";
import Header from "./components/Header";
import Visual from "./components/Visual";
import Recommend from "./components/Recommend";
import Tour from "./components/Tour";
import Ticket from "./components/Ticket";
import Live from "./components/Live";
import Book from "./components/Book";
import Event from "./components/Event";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="wrap">
      <Header />
      <div className="main">
        <Visual />
        <Recommend />
        <Tour />
        <Ticket />
        <Live />
        <Book />
        <Event />
      </div>
      <Footer />
    </div>
  );
}

export default App;
