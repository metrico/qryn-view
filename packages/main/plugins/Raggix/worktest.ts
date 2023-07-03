/* eslint-disable no-restricted-globals */

self.onmessage = (e: MessageEvent<string>) => {
  const data = e
    self.postMessage(JSON.stringify(data));
  
}

export {};