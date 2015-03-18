
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


export let bob = ({x: ex = 100,
                   y: wy = 200,
                   z: ze = 300}) => (mult) => (mult * (ex + wy + ze));


// export bob;
