const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



rl.question('Enter the first number: ', (num1) => {
    rl.question('Enter the second number: ', (num2) => {
        rl.question('Enter the third number: ', (num3) => {
            const sum = Number(num1) + Number(num2) + Number(num3);
            console.log(`The sum is: ${sum}`);
            rl.close();
        });
    });
});


