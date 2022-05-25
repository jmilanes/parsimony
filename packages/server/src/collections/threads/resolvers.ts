export default (db: any) => ({
  Mutation: {
    createThread: async (_: any, { payload }: { payload: any }) => {
      const thread = new db.models.Thread({
        ...payload,
        messages: [payload.message]
      });
      await thread.save();
      return thread;
    }
  },
  Query: {
    threads: async () => await db.models.Thread.find({})
  }
});
