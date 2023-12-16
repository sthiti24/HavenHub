const {PrismaClient} = require('@prisma/client')
// const prisma = new PrismaClient()
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
const prisma = new PrismaClient({ datasources: {  db: { url: `mongodb+srv://sthitipragyan24:${MONGODB_PASSWORD}@cluster1.1ax1dgo.mongodb.net/real-estate` } } });

module.exports = prisma