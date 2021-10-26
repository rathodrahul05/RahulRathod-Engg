import { Provider } from 'react-redux';

import AppRouter from './components/Routes/AppRouter';
import store from './Redux/Store/ConfigureStore';

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
