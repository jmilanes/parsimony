const User = `type User {
    id: ID!
    updated_at: Date
    created_at: Date
    schoolId: String
    timeZone: String
    roles: [String]
    type: String
    documents: [String]
    password: String
    email: String
    firstName: String
    lastName: String
    dateOfBirth: Date
    phone: String
    contacts: [ID]
    clients: [ID]
    programs: [ID]
    actionItems: [ID]
    threadDisplayName: String
    avatar: String
    color: String
  }`;

export default User;
