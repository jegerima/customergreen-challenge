export const queries = {
  login: `SELECT u.id, u.email, u.password, u.profileId FROM user AS u WHERE u.email=?;`,
  createUserProfile: `INSERT into user_profile (name, address) VALUES (?,?);`,
  createUser: `INSERT into user (email, password, profileId) VALUES (?,?,?);`,
  getUserById: `SELECT up.name, u.email, up.address FROM user AS u 
                INNER JOIN user_profile AS up ON u.profileId=up.id
                WHERE u.id=?;`,
};
