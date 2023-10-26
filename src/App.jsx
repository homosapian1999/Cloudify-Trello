import { ToastContainer } from "react-toastify";
import CreateCard from "./components/CreateCard";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <CreateCard />
    </div>
  );
};

export default App;
