export default (db: any) => ({
  Mutation: {
    createThread: async (_: any, { name }: { name: string }) => {
      const thread = new db.models.Thread({ name });
      await thread.save();
      return thread;
    }
  },
  Query: {
    threads: async () => await db.models.Thread.find({})
  }
});
