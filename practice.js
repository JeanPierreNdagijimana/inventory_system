// import User from "./models/User";

// // this is a function that expects a callback function as the argument
// function parentFunction(func2) {
//   // this is a function invocation, it will run the function that was passed in
//   func2();
// }

// // this is the callback function that was passed in
// function childFunction() {
//   console.log("I am a callback function");
// }

// // when we invoke parentFunction, we pass in childFunction as an argument
// parentFunction(childFunction);

// class ExampleClass {
//   constructor() {
//     this.name = "Example";
//   }

//   // This is a method
//   sayName() {
//     console.log(this.name);
//   }
// }

// // This is an instance of the ExampleClass
// const example = new ExampleClass();
// example.sayName();

// User.findAll().then((users) => {
//   res.render("users", {
//     users,
//   });
// });

// // num1 and num2 are parameters
// function add(num1, num2) {
//   return num1 + num2;
// }

// // 1 and 2 are arguments
// add(1, 2);

const students = [
  {
    name: "Chris Miller",
    subject: "History",
    info: "Failed last exam",
    score: 59,
  },
  {
    name: "Courtney Seward",
    subject: "History",
    info: "Has completed all homework",
    score: 91,
  },
  {
    name: "Garrett Ward",
    subject: "History",
    info: "Wonderful at helping other students",
    score: 88,
  },
];

// using for loop
// for (let i = 0; i < students.length; i++) {
//   console.log(i);
//   console.log(`Name: ${students[i].name}`); // students[0].name
//   console.log(`Subject: ${students[i].subject}`); // students[0].subject
//   console.log(`Info: ${students[i].info}`); // students[0].info
//   console.log(`Score: ${students[i].score}`); // students[0].score
//   console.log(" ");
// }

// using forEach
// students.forEach((student, index) => {
//   console.log(index);
//   console.log(`Name: ${student.name}`);
//   console.log(`Subject: ${student.subject}`);
//   console.log(`Info: ${student.info}`);
//   console.log(`Score: ${student.score}`);
//   console.log(" ");
// });

// console.log(students.entries());

// // using for...of : gives us the value of the element
// for (const student of students) {
//   console.log(`Name: ${student.name}`);
//   console.log(`Subject: ${student.subject}`);
//   console.log(`Info: ${student.info}`);
//   console.log(`Score: ${student.score}`);
//   console.log(" ");
// }

// // using for...in : gives us the index of the element
// for (const index in students) {
//   console.log(index);
//   console.log(`Name: ${students[index].name}`);
//   console.log(`Subject: ${students[index].subject}`);
//   console.log(`Info: ${students[index].info}`);
//   console.log(`Score: ${students[index].score}`);
//   console.log(" ");
// }

// // using map: similar to forEach, but returns a new array
// students.map((student, index) => {
//   console.log(index);
//   console.log(`Name: ${student.name}`);
//   console.log(`Subject: ${student.subject}`);
//   console.log(`Info: ${student.info}`);
//   console.log(`Score: ${student.score}`);
//   console.log(" ");
// });

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log("nums: ", nums);
console.log("");

const nums2 = nums.map((num) => {
  return num + 2;
});

console.log("Map:");
console.log("nums: ", nums);
console.log("nums2: ", nums2);
console.log("");

// using filter: returns a new array with only the elements that pass the test
const nums3 = nums.filter((num) => {
  return num % 2 === 0;
});

console.log("Filter:");
console.log("nums: ", nums);
console.log("nums3: ", nums3);
console.log("");

// using re
