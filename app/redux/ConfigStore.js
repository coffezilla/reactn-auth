import { createStore } from 'redux';
import User from './ducks/User';

export const store = createStore(User);
