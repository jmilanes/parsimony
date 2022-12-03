export const envIs = (env: "prod" | "test" | "dev"): boolean => {
  const map = {
    prod: process.env.NODE_ENV === "production",
    test: process.env.NODE_ENV === "test",
    dev: process.env.NODE_ENV === "development"
  };

  return map[env];
};
