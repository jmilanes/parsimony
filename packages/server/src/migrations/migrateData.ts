import {
  updateActive,
  updateBehaviorDescDetails,
  updateBehaviorDetails,
  updateProgramViewType
} from "./migrationSpecs/migrationsSpecs";

const readline = require("readline");
require("dotenv").config();
const { MongoClient } = require("mongodb");

// Connect to MongoDB Atlas
async function connectToDatabase(prod: boolean, db?: string) {
  const uri = prod
    ? `mongodb+srv://joey_local:${process.env.LOCAL_MONGO_PROD}@${db}.mongodb.net/parsimony?retryWrites=true&w=majority`
    : "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await client.connect();
  return client;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export type MigrateDataProps = {
  collection: string;
  // Update Many with mong
  updateManyOps?: any;
  prod?: boolean;
};

const migrate = async ({
  collection,
  updateManyOps,
  prod = false
}: MigrateDataProps) => {
  let client;
  let schoolsCount;
  try {
    client = await connectToDatabase(prod, "parsimonyschools.f034n9b");

    const schoolDB = prod ? client.db() : client.db("parsimonySchools");

    const schoolDbConnections = Object.values<any>(
      await schoolDB.collection("schools").find({}).toArray()
    ).map((school) => school.dbConnection);

    schoolsCount = schoolDbConnections.length;

    console.log("COUNT", schoolsCount);
    console.log("CONNECTIONS", schoolDbConnections);

    for (const schoolDbConnection of schoolDbConnections) {
      const db = prod
        ? (await connectToDatabase(prod, schoolDbConnection)).db()
        : await client.db(schoolDbConnection);

      await db.collection(collection).updateMany({}, updateManyOps);
    }
  } finally {
    console.log(
      `${collection} collection has been updated in ${schoolsCount} Schools`
    );
    client.close();
    process.exit(0);
  }
};

// Run the script
async function migrateToAllSchools(props: MigrateDataProps) {
  if (props.prod) {
    rl.question(
      "This is going to PRODUCTION? If so type: PRODUCTION: ",
      async (answer: string) => {
        // Close the readline interface
        rl.close();
        // Check the user's answer
        if (answer === "PRODUCTION") {
          console.log("Continuing the process...");
          await migrate(props);
        } else {
          console.log("Stopping the process...");
          process.exit(0); // Exit the process with a success code
        }
      }
    );
    return;
  }
  await migrate(props);
}

// Execute the script
migrateToAllSchools(updateBehaviorDescDetails);
