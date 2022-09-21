export function startTimer(duration) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

// window.onload = function () {
//   var fiveMinutes = 60 * 5,
//     display = document.querySelector("#time");
//   startTimer(fiveMinutes, display);
// };

// function gradingStudents(grades) {
//   let finalGrades = grades.map((grade) => {
//     return grade >= 38 && grade % 5 >= 3 ? grade - (grade % 5) + 5 : grade;
//   });
//   return finalGrades;
// }

// function countingValleys(steps, path) {
//   let strArr = path.split("");
//   let count = 0;
//   let result = 0;
//   for (let step = 0; step < steps; step++) {
//     if (count == 0 && strArr[step].toLowerCase() == "d") {
//       count -= 1;
//       result += 1;
//     } else if (strArr[step].toLowerCase() == "d") {
//       count -= 1;
//     } else {
//       count += 1;
//     }
//   }
//   return result;
// }

// function sockMerchant(n, ar) {
// var res = 0;
// ar.sort();
// for (let i = 0; i < n; i++) {
//   if (ar[i] == ar[i + 1]) {
//     i++;
//     res++;
//   }
// }
// return res;
// }
