import { PrismaClient, } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()
// async function main() {
//   const salt = await bcrypt.genSalt();
//   const hashedPassword = await bcrypt.hash("admin", salt);
//   await prisma.user.upsert({
//     where: {
//       user_name: 'admin',
//     },
//     update: {},
//     create: {
//       user_name: 'admin',
//       password: hashedPassword,
//       salt_password: salt,
//       permission: user_permission.admin,
//     },
//   })
//   await prisma.deviceSetting.upsert({
//     where: {
//       id: 1,
//     },
//     update: {},
//     create: {
//       send_time_rate: 30,
//       first_threshold_limit: 2,
//       second_threshold_limit: 4,
//     }
//   })
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
