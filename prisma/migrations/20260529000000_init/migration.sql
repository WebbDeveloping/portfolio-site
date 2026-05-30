-- Portfolio tables live in a dedicated schema so this project can share
-- a Postgres database with other apps without touching their public tables.

CREATE SCHEMA IF NOT EXISTS "portfolio";

-- CreateTable
CREATE TABLE "portfolio"."Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "client" TEXT NOT NULL DEFAULT '',
    "clientLogo" TEXT NOT NULL DEFAULT '',
    "servicesRendered" TEXT NOT NULL DEFAULT '',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "mainImage" TEXT NOT NULL DEFAULT '',
    "largeDesktopImg" TEXT NOT NULL DEFAULT '',
    "standardDesktopImg" TEXT NOT NULL DEFAULT '',
    "tabletImg" TEXT NOT NULL DEFAULT '',
    "mobileImg" TEXT NOT NULL DEFAULT '',
    "additionalPhotos" JSONB NOT NULL DEFAULT '[]',
    "projectOverview" TEXT NOT NULL DEFAULT '',
    "projectContribution" TEXT NOT NULL DEFAULT '',
    "clientFeedback" TEXT NOT NULL DEFAULT '',
    "finalThought" TEXT NOT NULL DEFAULT '',
    "services" JSONB NOT NULL DEFAULT '[]',
    "liveLink" TEXT NOT NULL DEFAULT '',
    "platformLogo" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio"."Post" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postBody" TEXT NOT NULL DEFAULT '',
    "postSummary" TEXT NOT NULL DEFAULT '',
    "mainImage" TEXT NOT NULL DEFAULT '',
    "thumbnailImage" TEXT NOT NULL DEFAULT '',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio"."Video" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "featuredImage" TEXT NOT NULL DEFAULT '',
    "youtubeUrl" TEXT NOT NULL DEFAULT '',
    "featuredVideo" BOOLEAN NOT NULL DEFAULT false,
    "mainFeature" BOOLEAN NOT NULL DEFAULT false,
    "publishedOn" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio"."DevProject" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "stack" JSONB NOT NULL DEFAULT '[]',
    "githubUrl" TEXT,
    "liveUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "heroImage" TEXT,
    "accentColor" TEXT,
    "year" TEXT,
    "problem" TEXT,
    "solution" TEXT,
    "features" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DevProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio"."Service" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "icon" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '',
    "projects" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "portfolio"."Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "portfolio"."Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Video_slug_key" ON "portfolio"."Video"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DevProject_slug_key" ON "portfolio"."DevProject"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "portfolio"."Service"("slug");
