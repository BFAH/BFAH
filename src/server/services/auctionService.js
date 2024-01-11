const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const AuctionService = {
    getAllAuctionProducts: async () => {
        try {
            const allAuctionProducts = await prisma.bigfancydb.findMany();
            return allAuctionProducts;
        } catch (error) {
            console.error('ERROR - Could Not Fetch All Auction Products', error);
            throw error;
        }
    },
};

module.exports = AuctionService;