import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export async function main() {
  const userData: Prisma.UserCreateInput[] = [
    {
      phone: "09120000000",
      passwordHash: await bcrypt.hash("password123", 10),
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: [
          {
            title: "Join the Prisma Discord",
            content: "https://pris.ly/discord",
            published: true,
          },
          {
            title: "Prisma on YouTube",
            content: "https://pris.ly/youtube",
          },
        ],
      },
    },
    {
      phone: "09120000001",
      passwordHash: await bcrypt.hash("password456", 10),
      name: "Bob",
      email: "bob@prisma.io",
      posts: {
        create: [
          {
            title: "Follow Prisma on Twitter",
            content: "https://www.twitter.com/prisma",
            published: true,
          },
        ],
      },
    },
  ];

  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
