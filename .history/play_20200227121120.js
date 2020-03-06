const person = {
  name: "Max",
  age: 29,
  greet() {
    console.log("Hi, I am " + this.name);
  }
};

person.greet();

const hobbies = ["sports", "cooking"];
const numbers = [2, 3, 4];
// for (let hobby of hobbies) {
//   console.log(hobby);
// }

const sum = (sum, num) => sum + num;

console.log(numbers.values().next());
console.log(hobbies.map(hobby => "Hobby: " + hobby));

console.log(hobbies);
