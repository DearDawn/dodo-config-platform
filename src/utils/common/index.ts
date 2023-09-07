export const waitTime = (timeout = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
