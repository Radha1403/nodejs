const name = "max";
let age = 29;
const hasHobbies = true;

age = 30;

const summarizeuser = (userName, userAge, userHasHobby) => {
  return (
    "Name is " +
    userName +
    ", age is " +
    userAge +
    ", and the user has Hobbies : " +
    userHasHobby
  );
};

const add = (a, b) => a + b;
const addOne = a => a + 1;
console.log(add(2, 3));
console.log(addOne(2));
console.log(summarizeuser(name, age, hasHobbies));
