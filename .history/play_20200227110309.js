var name = "max";
var age = 29;
var hasHobbies = true;

function summarizeuser(userName, userAge, userHasHobby) {
  return (
    "Name is " +
    userName +
    ", age is " +
    userAge +
    ", and the user has Hobbies : " +
    userHasHobby
  );
}

console.log(summarizeuser(name, age, hasHobbies));
