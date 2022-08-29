// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

let coffeeMachine = {
    water: 400,
    milk: 540,
    beans: 120,
    dcups: 9,
    money: 550,
    state() {
    console.log(`The coffee machine has:
${this.water} ml of water
${this.milk} ml of milk
${this.beans} g of coffee beans
${this.dcups} disposable cups
$${this.money} of money`);
},
    prepare(coffee) {
        this.water = coffeeMachine.water - coffee.water;
        this.milk = coffeeMachine.milk - coffee.milk;
        this.beans = coffeeMachine.beans - coffee.beans;
        this.dcups = coffeeMachine.dcups - 1;
        this.money = coffeeMachine.money + coffee.money;
    },
    fillin(water, milk, beans, cups) {
        coffeeMachine.water = coffeeMachine.water + water;
        coffeeMachine.milk = coffeeMachine.milk + milk;
        coffeeMachine.beans = coffeeMachine.beans + beans;
        coffeeMachine.dcups = coffeeMachine.dcups + cups;
    }
};
let espresso = {
    water: 250,
    milk: 0,
    beans: 16,
    money: 4
}
let latte = {
    water: 350,
    milk: 75,
    beans: 20,
    money: 7
}
let cappuccino = {
    water: 200,
    milk: 100,
    beans: 12,
    money: 6
}

let action;
do {
    action = input('Write action (buy, fill, take, remaining, exit):\n');
    switch(action) {
        case 'buy':
            buy();
            break;
        case 'fill':
            fill();
            break;
        case 'take':
            take();
            break;
        case 'remaining':
            coffeeMachine.state();
            break;
    }
} while (action != 'exit');

function buy() {
    let typeOfCoffee = coffeeType();
    if (typeOfCoffee != 'back') {
        if (checkResources(typeOfCoffee)) {
            coffeeMachine.prepare(typeOfCoffee);
        }
    }

}

function coffeeType() {
    let coffeeType = input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, ' +
        'back - to main menu:\n');
    switch (coffeeType) {
        case '1':
            return espresso;
            break;
        case '2':
            return latte;
            break;
        case '3':
            return cappuccino;
            break;
        case 'back':
            return 'back';
            break;
    }
}

function checkResources(coffee) {
    let notEnough = [];
    if (coffeeMachine.water < coffee.water) {
        notEnough.push('water');
    }
    if (coffeeMachine.milk < coffee.milk) {
        notEnough.push('milk');
    }
    if (coffeeMachine.beans < coffee.beans) {
        notEnough.push('coffee beans');
    }
    if (coffeeMachine.dcups < 1) {
        notEnough.push('disposable cups');
    }
    if (notEnough.length > 0) {
        console.log(`Sorry, not enough ${notEnough}!`)
        return false;
    } else {
        console.log(`I have enough resources, making you a coffee!`)
        return true;
    }
}

function fill() {
    let water = Number(input('Write how many ml of water you want to add:\n'));
    let milk = Number(input('Write how many ml of milk you want to add:\n'));
    let beans = Number(input('Write how many grams of coffee beans you want to add:\n'));
    let cups = Number(input('Write how many disposable coffee cups you want to add:\n'));
    coffeeMachine.fillin(water, milk, beans, cups);
}

function take() {
    console.log(`I gave you $${coffeeMachine.money}`);
    coffeeMachine.money = 0;
}