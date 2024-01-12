const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");

const createUsers = async () => {
  console.log(`Creating Users...`);
  const password = "123";
  const data = Array.from({ length: 5 }).map(() => ({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: password,
    isAdmin: false,
  }));
  await prisma.user.createMany({
    data,
  });
};

const createCategories = async () => {
	console.log('Creating Categories...')
	await prisma.category.createMany({
		data: [
			{
				type: "auto"
			},
			{
				type: 'books'
			},
			{
				type: 'clothes'
			},
			{
				type: 'collectibles'
			},
			{
				type: 'electronics'
			},
			{
				type: 'furniture'
			},
			{
				type: 'games'
			},
			{
				type: 'jewelry'
			},
			{
				type: 'kitchen'
			},
			{
				type: 'sports'
			},
			{
				type: 'toys'
			},
		]
	})
}

const createProducts = async () => {
  console.log(`Creating Products...`);
  const data = Array.from({ length: 20 }).map(() => ({
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.urlPicsumPhotos(),
    price: faker.commerce.price(),
	categoryId: faker.helpers.arrayElement([1,2,3,4,5,6,7,8,9,10,11])
  }));
  await prisma.products.createMany({
    data,
  });
};

const createAuctions = async () => {
  console.log("Creating Auctions...");
  await prisma.auctions.createMany({
    data: [
      {
        currentBidPrice: "500.00",
        incrementPricePerBid: "5.00",
        productId: 1,
        bidStartTime: "2023-01-08T00:00:00.500Z",
        bidEndTime: "2023-01-15T23:59:59.500Z",
      },
      {
        currentBidPrice: "200.00",
        incrementPricePerBid: "5.00",
        productId: 2,
        bidStartTime: "2023-01-09T00:00:00.500Z",
        bidEndTime: "2023-01-16T23:59:59.500Z",
      },
      {
        currentBidPrice: "50.00",
        incrementPricePerBid: "5.00",
        productId: 3,
        bidStartTime: "2023-01-10T00:00:00.500Z",
        bidEndTime: "2023-01-17T23:59:59.500Z",
      },
      {
        currentBidPrice: "100.00",
        incrementPricePerBid: "5.00",
        productId: 4,
        bidStartTime: "2023-01-11T00:00:00.500Z",
        bidEndTime: "2023-01-18T23:59:59.500Z",
      },
      {
        currentBidPrice: "300.00",
        incrementPricePerBid: "5.00",
        productId: 5,
        bidStartTime: "2023-01-13T00:00:00.500Z",
        bidEndTime: "2023-01-20T23:59:59.500Z",
      },
    ],
  });
};

const main = async () => {
  await createUsers();
  await createCategories();
  await createProducts();
  await createAuctions();
};

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log(`Finished!!!`);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });