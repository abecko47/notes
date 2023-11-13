import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultUser = await prisma.user.create({
    data: {
      username: 'default',
      password: 'qwerty12345',
    },
  });

  const tag1 = await prisma.tag.create({
    data: {
      userId: defaultUser.id,
      name: 'important',
    },
  });

  const tag2 = await prisma.tag.create({
    data: {
      userId: defaultUser.id,
      name: 'misc',
    },
  });

  const note1 = await prisma.note.create({
    data: {
      name: 'Random Thoughts',
      content:
        'Just jotting down some random thoughts that crossed my mind today.',
      userId: defaultUser.id,
    },
  });

  const note2 = await prisma.note.create({
    data: {
      name: 'Task List',
      content:
        'Need to do laundry, buy groceries, and finish that report for work.',
      userId: defaultUser.id,
    },
  });

  const notebook = await prisma.notebook.create({
    data: {
      name: 'Personal Journal',
      userId: defaultUser.id,
    },
  });

  const attachedToNotebookNote = await prisma.note.create({
    data: {
      name: 'Memorable Moments',
      content:
        'Today, I had a great conversation with an old friend and enjoyed a beautiful sunset. Grateful for these simple yet precious moments.',
      userId: defaultUser.id,
      notebookId: notebook.id,
    },
  });

  const noteAndTag1 = await prisma.notesAndTags.create({
    data: {
      noteId: note1.id,
      tagId: tag2.id,
    },
  });

  const noteAndTag2 = await prisma.notesAndTags.create({
    data: {
      noteId: note2.id,
      tagId: tag1.id,
    },
  });

  const noteAndTag3 = await prisma.notesAndTags.create({
    data: {
      noteId: attachedToNotebookNote.id,
      tagId: tag1.id,
    },
  });

  const noteAndTag4 = await prisma.notesAndTags.create({
    data: {
      noteId: attachedToNotebookNote.id,
      tagId: tag2.id,
    },
  });

  const notebookAndTag = await prisma.notebooksAndTags.create({
    data: {
      notebookId: notebook.id,
      tagId: tag1.id,
    },
  });

  console.log({
    defaultUser,
    note1,
    note2,
    attachedToNotebookNote,
    tag1,
    tag2,
    notebook,
    noteAndTag1,
    noteAndTag2,
    noteAndTag3,
    noteAndTag4,
    notebookAndTag,
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
