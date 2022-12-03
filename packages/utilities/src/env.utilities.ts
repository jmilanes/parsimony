export const envIs = (env: "prod" | "test" | "dev"): boolean => {
  const map = {
    prod: process.env.NODE_ENV === "production",
    test: process.env.NODE_ENV === "test",
    dev: process.env.NODE_ENV === "development"
  };
  console.log(
    "🚀 ~ file: env.utilities.ts ~ line 6 ~ envIs ~ process.env.NODE_ENV",
    process.env.NODE_ENV
  );

  return map[env];
};
