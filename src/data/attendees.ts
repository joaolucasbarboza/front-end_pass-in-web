import { faker } from '@faker-js/faker';

export const attendees = Array.from({ length: 200 }).map(() => {
    return {
        id: faker.number.hex({ min: 1000, max: 20000}),
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        createAt: faker.date.recent({ days: 30 }),
        checkedInAt: faker.date.recent({ days: 7 }),
    }
} )