//this is a pub/sub pattern for custom events in react

const subscribe = (eventName, listener) => {
  document.addEventListener(eventName, listener);
};

const unsubscribe = (eventName, listener) => {
  document.removeEventListener(eventName, listener);
};

const publish = (eventName, data) => {
  document.dispatchEvent(new CustomEvent(eventName, { detail: data }));
};

export { subscribe, unsubscribe, publish };
