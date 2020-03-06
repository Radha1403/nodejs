const name = "max";
let age = 29;
const hasHobbies = true;

age = 30;

const summarizeuser => (userName, userAge, userHasHobby) {
  return (
    "Name is " +
    userName +
    ", age is " +
    userAge +
    ", and the user has Hobbies : " +
    userHasHobby
  
});

console.log(summarizeuser(name, age, hasHobbies));
