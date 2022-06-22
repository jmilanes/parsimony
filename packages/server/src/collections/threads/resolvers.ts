import { ICreateResolverParams } from "@parsimony/types";

export default ({ db, broadcast }: ICreateResolverParams) => ({
  Mutation: {
    createThread: async (_: any, { payload }: { payload: any }) => {
      // TODO: Get direct mongo code out of the resolvers
      // ** This should be createCollection("thread", payload)
      // ** Make a simple object mock version to test that stays aligned or find a way to mock mongo :D
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
