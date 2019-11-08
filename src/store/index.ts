import { createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer'

const createStoreWithMdware = applyMiddleware(
            thunkMiddleware
        )(createStore);

const store = createStoreWithMdware(reducer);
export default store;