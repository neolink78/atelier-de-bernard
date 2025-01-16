-- CreateTable
CREATE TABLE "library" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" VARCHAR(255),
    "picture" TEXT NOT NULL,
    "imageID" TEXT NOT NULL,
    "technique" VARCHAR(255),
    "category" VARCHAR(255),

    CONSTRAINT "library_pkey" PRIMARY KEY ("id")
);
