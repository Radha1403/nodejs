const person = {
  name: "Max",
  age: 29,
  greet() {
    console.log("Hi, I am " + this.name);
  }
};

person.greet();

const hobbies = ["sports", "cooking"];
const copyHobbies = hobbies;
hobbies.push("programming");
console.log(copyHobbies);
