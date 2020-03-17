const logger = store => next => action => {
  console.log("Middleware triggered:", action);
  next(action);
  console.log('The new state:', store.getState())
}

export default logger