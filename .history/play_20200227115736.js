const person = {
  name: "Max",
  age: 29,
  greet() {
    console.log("Hi, I am " + this.name);
  }
};

person.greet();

const hobbies = ["sports", "cooking"];
// for (let hobby of hobbies) {
//   console.log(hobby);
// }

console.log(hobbies.map);
