const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const createUsers = async () => {
	console.log(`Creating Users...`)
	const password = "123";
	const SALT_ROUNDS = 5;
	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
	const data = Array.from({ length: 5 }).map(() => (
		{
			email: faker.internet.email(),
            username: faker.internet.userName(),
			password: hashedPassword,
			isAdmin: false,
		}))
	await prisma.user.createMany({
		data
	})
}

const main = async() => {
    await createUsers()
}

main()
	.then(async () => {
		await prisma.$disconnect()
		console.log(`Finished!!!`)
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})