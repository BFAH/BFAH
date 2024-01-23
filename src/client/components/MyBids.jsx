const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const myBids = async (userId) => {
  try {
    const userBids = await prisma.auctions.findMany({
      where: {
        userId: userId,
        currentBidUserId: userId,
        isActive: true,
      },
      include: {
        user: true,
        products: true,
      },
    });
  } catch (error) {
    console.error("ERROR - Could Not Fetch User Bids", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = myBids;

// Example: Displaying bids for user with ID 1
// myBids(1);
