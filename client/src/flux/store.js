import { CategoryOptions, Languages } from './constants';

import Constants from './constants';
import Dispatcher from './dispatcher';
import { EventEmitter } from 'events';

let _store = {
  menuVisible: false,
  user: null,
  avatarUrl: null,
  categoryOptions: CategoryOptions(),
  languages: Languages()
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      default:
    }
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getCategoryOptions() {
    return _store.categoryOptions;
  }

  getLanguages() {
    return _store.languages;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
