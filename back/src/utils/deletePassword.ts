import { IUser } from "user";

/**
 *
 * @param user
 * @param isRandomUser (randomUser 체크용 파라미터)
 * @returns
 */

// export const deletePassword = (user: IUser, isRandomUser?: boolean) => {
//   let userData = user;
//   if (!isRandomUser) {
//     userData = (user as any)._doc;
//   }
//   const filteredKeys = Object.keys(userData).filter(
//     (key) => key !== "password"
//   );

//   const userWithoutPassword: any = {};
//   filteredKeys.map((key: keyof IUser) => {
//     userWithoutPassword[key] = userData[key];
//   });

//   return userWithoutPassword;
// };

// export const deletePassword = (user: IUser, isRandomUser?: boolean) => {
//   let userData = user;
//   if (!isRandomUser) {
//     userData = (user as any)._doc;
//   }

//   const userWithoutPassword = Object.entries(userData).reduce(
//     (acc: any, [key, value]) => {
//       if (key !== "password") acc[key] = value;
//       return acc;
//     },
//     {}
//   );

//   return userWithoutPassword;
// };

export const deletePassword = (user: IUser, isRandomUser?: boolean) => {
  let userData = user;
  if (!isRandomUser) {
    userData = (user as any)._doc;
  }

  const { password: pwd, ...userWithoutPassword } = userData;

  return userWithoutPassword;
};
