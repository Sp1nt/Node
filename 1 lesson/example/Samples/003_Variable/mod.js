//Переменные обьявленные внутри модуля, являются локальными для модуля
var x = 10;

function Sum(a,b)
{
    return a+b;
}

function Minus(a,b)
{
    return a-b;
}

function Multi(a,b)
{
    return a*b;
}

function Divis(a,b)
{
    return a/b;
}

function calc(){

    console.log(`Сумма = ${Sum(1, 2)}`);

    console.log(`Сумма = ${Minus(5, 2)}`);

    console.log(`Сумма = ${Multi(3, 2)}`);

    console.log(`Сумма = ${Divis(6, 3)}`);

};


exports.calc=calc;
