const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.Genre.createMany({
        data: [
            { id: 1, name: "Action" },
            { id: 2, name: "Adventure" },
            { id: 3, name: "RPG" },
            { id: 4, name: "Simulation" },
            { id: 5, name: "Sport" },
            { id: 6, name: "MMORPG" }
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });