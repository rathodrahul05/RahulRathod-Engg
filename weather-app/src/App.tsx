import { Provider } from "react-redux";
import "./App.css";
import AppRouter from "./components/AppRouter";
import FormComponent from "./components/FormComponent";
import store from "./Redux/Store/ConfigureStore";

function App() {
  store.subscribe(() => {
    console.log(store.getState());
  });
  // let country={
  //   capital:'',flag:{png:'',svg:''},latlng:[0,1],population:0
  // }

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
