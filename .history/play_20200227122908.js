const person = {
  name: "Max",
  age: 29,
  greet() {
    console.log("Hi, I am " + this.name);
  }
};

const printName = ({ name }) => {
  console.log(name);
};
const { name, age } = person;
console.log(name, age);
printName(person);

const hobbies = ["sports", "cooking"];
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);
