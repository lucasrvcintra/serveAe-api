/*
  Warnings:

  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `category` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDENTE', 'EM_PREPARO', 'ENTREGUE');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PRATO_PRINCIPAL', 'ENTRADA', 'BEBIDA', 'SOBREMESA');

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDENTE';

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;
