import { Provider } from 'react-redux';
import store from './Store/ConfigureStore';
import AppRouter from './components/Routes/AppRouter';

function App() {
  store.subscribe(() => {
    console.log(store.getState());
  });
  return (
    <div className="App">
      <Provider store={store}>
        <AppRouter/>
     
     </Provider>
    </div>
  );
}

export default App;
