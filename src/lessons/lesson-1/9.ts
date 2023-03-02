let legal = function () {
    let myAge: number = 19
    const access: string = 'Страница доступна'
    const notAccess: string = 'Страница не доступна'
    if (myAge >= 18)
        console.log(access)
    else
        console.log(notAccess)
}

legal()