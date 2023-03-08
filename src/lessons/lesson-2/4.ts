type Student = {
    name: string,
    age: number,
}

const studentsList: Student[] = [
    { name: 'Masha', age: 19 },
    { name: 'Pasha', age: 20 },
    { name: 'Sasha', age: 21 },
    { name: 'Masha', age: 19 }
]

for (const student of studentsList)
    console.log(student)