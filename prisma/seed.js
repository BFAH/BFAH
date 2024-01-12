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

const createProducts = async () => {
  console.log(`Creating Products...`);
  const data = Array.from({ length: 20 }).map(() => ({
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.urlPicsumPhotos(),
    price: faker.commerce.price(),
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

//   userAuctions: {
// 	create: [
// 	  {
// 		isActive: true,
// 		userId: 1,
// 		auctionId: 5,
// 	  },
// 	],
// 	create: [
// 	  {
// 		isActive: true,
// 		userId: 2,
// 		auctionId: 3,
// 	  },
// 	],
// 	create: [
// 	  {
// 		isActive: true,
// 		userId: 3,
// 		auctionId: 1,
// 	  },
// 	],
// 	create: [
// 	  {
// 		isActive: true,
// 		userId: 4,
// 		auctionId: 2,
// 	  },
// 	],
// 	create: [
// 	  {
// 		isActive: true,
// 		userId: 5,
// 		auctionId: 1,
// 	  },
// 	],
//   },
//   auctions: {
// 	create: [
// 	  {
// 		currentBidPrice: 500,
// 		productId: 1,
// 		bidStartTime: "2024-01-08",
// 		bidEndTime: "2024-01-15",
// 	  },
// 	],
// 	create: [
// 	  {
// 		  currentBidPrice: 200,
// 		  productId: 2,
// 		  bidStartTime: "2024-01-09",
// 		  bidEndTime: "2024-01-16",
// 	  },
// 	],
// 	create: [
// 	  {
// 		  currentBidPrice: 50,
// 		  productId: 3,
// 		  bidStartTime: "2024-01-10",
// 		  bidEndTime: "2024-01-17",
// 	  },
// 	],
// 	create: [
// 	  {
// 		  currentBidPrice: 100,
// 		  productId: 4,
// 		  bidStartTime: "2024-01-11",
// 		  bidEndTime: "2024-01-18",
// 	  },
// 	],
// 	create: [
// 	  {
// 		  currentBidPrice: 300,
// 		  productId: 5,
// 		  bidStartTime: "2024-01-13",
// 		  bidEndTime: "2024-01-20",
// 	  },
// 	],
//   },
