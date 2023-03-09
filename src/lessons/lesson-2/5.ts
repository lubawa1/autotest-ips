class Car {
    private state: string = 'off'

    public tunrOn() {
        this.state = 'on'
    }

    public turnOff() {
        this.state = 'off'
    }

    public getState() {
        console.log('State car is', this.state)
    }
}

const car: Car = new Car()

car.getState()
car.tunrOn()
car.getState()