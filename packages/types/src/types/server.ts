export type ICreateResolverParams = {
  db: any;
  broadcast: (payload: Record<string, any>) => void;
};
