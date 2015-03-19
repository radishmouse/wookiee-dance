
// export default class Hello {
export class Hello {
    constructor(_whom) {
        console.log('creating a new hello!');
        this.whom = _whom;
    }

    do() {
        console.log(`Allo Allo punk-ass punks, ${this.whom}`);
    }
}


// you can't export a let var with babel.
// export bob;
// but you can export the entire let expression
// I'm not sure if there's any advantage to this, as I don't know where the scope ends for `bob`
export let bob = ({x: ex = 100,
                   y: wy = 200,
                   z: ze = 300}) => (mult) => (mult * (ex + wy + ze));


