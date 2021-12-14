const add = document.getElementById("add-clause");
const clear = document.getElementById("clear-clause");
const solve = document.getElementById("solve");
const input = document.getElementById("input-clause");
const litNum = document.getElementById("literal-num");
const litPrint = document.getElementById("literal-print");
const displayClauses = document.getElementById("print-clauses");
const dispSat = document.getElementById("sat-result");
const printResult = document.getElementById("print-result");
const example = document.getElementById("example");
let literals = [];
let clauses = [];

add.onclick = () => {
  let data = input.value;
  if (
    !data.match(/[0-9|A-Z|*]/g) && // match numbers, uppercase letters, and operator
    !data.match(/[a-z][a-z]+/g) && // match more than 1 lowercase letter
    !data.match(/('([^a-z]|$))/g) && // match wrong use of not operator
    !data.match(/(^\s*\+|\+\s*$|\+\++|\+\s\+)/g) // match wrong use of or operator
  ) {
    data = data.replace(/(\s*\+\s*)/g, " + ");
    clauses.push(data);
    let lits = data.replace(/[^a-z]/g, "");
    lits = lits.split("");
    literals.push(...lits);
    literals = [...new Set(literals)];
    litNum.innerText = literals.length;
    litPrint.innerText = literals.join(",");
    input.value = "";
    printClauses();
  } else {
    alert("wrong input!");
  }
};

clear.onclick = () => {
  clearAll();
};

solve.onclick = () => {
  printResult.innerHTML = "";
  let tmpcls = [];
  clauses.forEach((e) => tmpcls.push(e.replace(/(\s*\+\s*)/g, ",").split(",")));
  if (dpll(tmpcls)) {
    dispSat.innerText = "Satisfiable";
    addDisplay("Satisfiable");
  } else {
    dispSat.innerText = "Not Satisfiable";
    addDisplay("Not Satisfiable");
  }
};

example.onclick = () => {
  clearAll();
  clauses = [
    `a + 'b + c + 'd`,
    `c + e + 'd`,
    `'a + a + b + 'c + 'd`,
    `e + f + g`,
    `k + l + m + n + o + p + 'd`,
    `k + 'l + 'm + n + 'o + p + 'd + s + 't`,
    `e + f + 'g + 'f`,
    `b + 'v + g + 'd + o`,
    `'o + p + + 'd + s + 't + e`,
    `m + n + o + p + 'd + r + s + t`,
    `'m + n + 'o + p' + 'd + q + r + s`,
  ];
  printClauses();
};

function printClauses() {
  displayClauses.innerHTML = "";
  clauses.forEach((e, i) => {
    displayClauses.innerHTML += `<li class="collection-item">${e}</li>`;
  });
}

function dpll(F, l = null) {
  let lprev = l;
  if (l) addDisplay(`Make ${l}=true.`);
  if (l) F = F.filter((e) => !e.includes(l));
  let templit = [];
  F.forEach((e) => templit.push(...e));
  templit = [...new Set(templit)];
  if (F.length === 0) return true;
  if (l) {
    let ll = l.includes(`'`) ? l.replace(`'`, "") : `'${l}`;
    console.log("ll", ll);
    F.forEach((e, i) => {
      e = e.filter((el) => !el.includes(ll));
      F[i] = e;
    });
  }
  let res = "F = ";
  F.forEach((e) => (res += `(${e.join(" + ")})`));
  addDisplay(res);
  if (F.findIndex((e) => e.length == 0) > -1) return false;
  let indexunit = F.findIndex((e) => e.length == 1);
  if (indexunit > -1) {
    l = F[indexunit][0];
  } else {
    let pure = null;
    templit.forEach((e) => {
      if (e.includes(`'`)) {
        if (!templit.includes(e.replace(`'`, "")) && pure == null) pure = e;
      } else {
        if (!templit.includes(`'${e}`) && pure == null) pure = e;
      }
    });
    l = pure;
  }
  if (l === lprev) l = templit[0];
  addDisplay(`Choose ${l}.`);
  if (dpll(F, l)) return true;
  addDisplay(`BACKTRACK: ${l}`);
  if (l.includes(`'`)) l = l.replace(`'`, "");
  else l = `'${l}`;
  return dpll(F, l);
}
// Function dpll(F, literal){
//   Remove clauses containing literal.
//   If (F has no clauses) return true
//   Shorten clauses containing ‘literal.
//   If (F has empty clauses) return false
//   If (F contains unit or pure L) return dpll(F, L)
//   Choose l in F
//   If(dpll(F, ‘l)) return true
//   return dpll(F, l)
//   }

function addDisplay(data) {
  printResult.innerHTML += `<li class="collection-item">${data}</li>`;
}

function clearAll() {
  literals = [];
  clauses = [];
  litNum.innerText = 0;
  litPrint.innerText = "";
  displayClauses.innerHTML = "";
  printResult.innerHTML = "";
}
