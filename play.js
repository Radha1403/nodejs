const fetchData = callBack => {
  setTimeout(() => {
    callBack("done");
  }, 1500);
};

setTimeout(() => {
  console.log("Timer is done!");
}, 1);

console.log("hello");
console.log("hii");
