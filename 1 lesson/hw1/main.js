var obj = require('./test.js');


//task1
// var obj = new obj.Point(1,2);
// obj.print();


//task2
// var human = new obj.describeHuman();

// human.write('Alex\n', 'Norwey\n', 25)
// human.print();

//task3
// var fr1 = new obj.Fraction(24, 4);
// fr1.print();

// var fr2 = new obj.Fraction(24, 6);
// fr2.print();

// var calc = new obj.Calculations(fr1, fr2);

// console.log("Sum:", calc.Sum());
// console.log("Diff:", calc.Diff());
// console.log("Multi:", calc.Multi());
// console.log("Divis:", calc.Div());

//task4

var jorn = new obj.Journal();

jorn.add({ id: 0, fName: 'Ivan', lName: 'Ivanov', age: 55, group: 'Knp-221' });
jorn.add({ id: 1, fName: 'D', lName: 'S', age: 35, group: 'Knp-222' });
jorn.add({ id: 2, fName: 'G', lName: 'C', age: 52, group: 'Knp-241' });
jorn.add({ id: 3, fName: 'F', lName: 'V', age: 15, group: 'Knp-225' });
jorn.PrintStudents();

jorn.delete(2);
jorn.PrintStudents();

jorn.edit(1,{fName: 'sssD', lName: 'Sdd', age: 55, group: 'Knp-2222' })
jorn.PrintStudents();
