import { Provider } from "react-redux";
import "./App.css";
import AppRouter from "./components/AppRouter";
import store from "./Redux/Store/ConfigureStore";

function App() {
  store.subscribe(() => {
    console.log(store.getState());
  });

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
