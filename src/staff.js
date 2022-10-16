import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import axios from 'axios';

const staff = [];
const grades = ['HCA (Care assistant)', 'RGN (Nurse)', 'SW (Support Worker)']

for (let i = 0; staff.length < 10; i++) {
  let newPerson = {
    name: faker.name.fullName(),
    image: faker.image.avatar(),
    daysAvaliable: [new Date(), new Date('2023-01-01T00:00:00.000Z')],
    grade: grades[Math.floor(Math.random()*3)]
  }
  staff.push(newPerson);
}
console.log(staff);
export default staff;
