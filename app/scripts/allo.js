
export default class Hello {
    constructor(_whom) {
        console.log('creating a new hello!');
        this.whom = _whom;
    }

    do() {
        console.log(`Allo Allo punk-ass punks, ${this.whom}`);
    }
}
