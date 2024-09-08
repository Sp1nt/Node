
//task1
// function Point(x,y)
// {
//     this.x=x;
//     this.y=y;
//     this.print = ()=>{
//         console.log('X = '+this.x+" Y = " + this.y);
//     }
// }

// function Check(a,b){
//     if(a.x == b.x){
//         console.log('Прямая параллельна оси Y (ординат).')
//     }
//     else if(a.y == b.y){
//         console.log('Прямая параллельна оси X (абсцисс).')
//     }
//     else (a.y == b.y){
//         console.log('Прямая не параллельна ни одной оси.')
//     }
// }

// module.exports = {
//     Point : Point,
//     Check : Check
// };

//task2
// function describeHuman(){
//     this.fName;
//     this.lName;
//     this.age;

//     this.write = (fName, lName, age) => {
//         this.fName = fName
//         this.lName = lName;
//         this.age = age
//     }

//     this.print = () => {
//         console.log(`full name: ${this.fName}last name: ${this.lName}age: ${this.age}`)
//     }
// }

// exports.describeHuman = describeHuman

//task3
// function Fraction(a, b) {
//     this.a = a;
//     this.b = b;

//     this.print = function() {
//         console.log(this.a + "/" + this.b);
//     };
// }

// function Calculations(X, Y) {
//     this.Sum = () => { return ((X.a / X.b) + (Y.a / Y.b)); }
//     this.Diff = () => { return ((X.a / X.b) - (Y.a / Y.b)); }
//     this.Multi = () => { return ((X.a / X.b) * (Y.a / Y.b)); }
//     this.Div = () => { return ((X.a / X.b) / (Y.a / Y.b)); }
// }

// module.exports = {
//     Fraction: Fraction,
//     Calculations: Calculations
// }

//task4

function Journal() {
    this.listofstudent = [];

    this.add = (student) => {
        let exists = this.listofstudent.some(itemStudent => itemStudent.id == student.id);

        if (!exists) {
            this.listofstudent.push(student);
            console.log(`Student added successfully`);
            return true;
        } else {
            console.log(`Student with ID: ${student.id} already exists!`);
            return false;
        }
    }

    this.delete = (id) => {
        if (id === undefined) {
            console.log(`Please provide student ID!`);
            return false;
        }

        const index = this.listofstudent.findIndex(itemStudent => itemStudent.id == id);

        if (index !== -1) {
            this.listofstudent.splice(index, 1);
            console.log(`Student with ID: ${id} deleted successfully`);
            return true;
        } else {
            console.log(`Student with ID: ${id} not found!`);
            return false;
        }
    }

    this.edit = (id, info) => {
        const index = this.listofstudent.findIndex(itemStudent => itemStudent.id == id);

        if (index !== -1) {
            this.listofstudent[index] = { ...this.listofstudent[index], ...info };
            console.log(`Student with ID: ${id} updated successfully`);
            return true;
        } else {
            console.log(`Student with ID: ${id} not found!`);
            return false;
        }
    }

    this.PrintStudents = () => {
        console.log(this.listofstudent);
    };
}

exports.Journal = Journal;