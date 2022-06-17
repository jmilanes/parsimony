import { ICreateResolverParams } from "@parsimony/types";

export default ({ db, broadcast }: ICreateResolverParams) => ({
  Mutation: {
    createThread: async (_: any, { payload }: { payload: any }) => {
      const thread = new db.models.Thread({
        ...payload,
        messages: [payload.message]
      });
      await thread.save();
      // TODO: Ignore if the user who sent it
      broadcast(
        JSON.stringify({
          subscribers: thread.subscribers,
          type: "CHAT"
        })
      );
      return thread;
    }
  },
  Query: {
    threads: async () => await db.models.Thread.find({})
  }
});
