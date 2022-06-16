export default (db: any) => ({
  Mutation: {
    createThread: async (_: any, { payload }: { payload: any }) => {
      const thread = new db.models.Thread({
        ...payload,
        messages: [payload.message]
      });
      await thread.save();
      thread.subscribers.forEach((subscriber: string) => {
        console.log(`NOTIFY: ${subscriber}`);
      });
      return thread;
    }
  },
  Query: {
    threads: async () => await db.models.Thread.find({})
  }
});
