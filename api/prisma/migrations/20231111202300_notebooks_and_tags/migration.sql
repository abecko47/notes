-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "notebookId" UUID;

-- CreateTable
CREATE TABLE "Notebook" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "userId" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "userId" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "NotesAndTags" (
    "noteId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "NotesAndTags_pkey" PRIMARY KEY ("noteId","tagId")
);

-- CreateTable
CREATE TABLE "NotebooksAndTags" (
    "notebookId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "NotebooksAndTags_pkey" PRIMARY KEY ("notebookId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notebook_id_key" ON "Notebook"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_id_key" ON "Tag"("id");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_notebookId_fkey" FOREIGN KEY ("notebookId") REFERENCES "Notebook"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notebook" ADD CONSTRAINT "Notebook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotesAndTags" ADD CONSTRAINT "NotesAndTags_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotesAndTags" ADD CONSTRAINT "NotesAndTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotebooksAndTags" ADD CONSTRAINT "NotebooksAndTags_notebookId_fkey" FOREIGN KEY ("notebookId") REFERENCES "Notebook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotebooksAndTags" ADD CONSTRAINT "NotebooksAndTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
