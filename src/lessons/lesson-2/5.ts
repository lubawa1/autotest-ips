class Car {
    state: string

    constructor(state: string) {
        this.state = state
    }

    tunrOn() {
        this.state = 'on'
    }
    turnOff() {
        this.state = 'off'
    }

    getState() {
        console.log(this.state)
    }
}

const car: Car = new Car('off')
car.getState()
car.tunrOn()
car.getState()