import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const defaultUser = await prisma.user.create({
        data: {
            username: "default",
            password: "qwerty12345",
        },
    });

    const defaultNote = await prisma.note.create({
        data: {
            name: "First note",
            content: "First note content",
            userId: defaultUser.id
        }
    });

    console.log({defaultUser, defaultNote});
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });