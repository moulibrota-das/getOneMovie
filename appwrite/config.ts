import { Client, Account, ID } from "appwrite";

const config = {
  appwriteUrl: String(process.env.NEXT_APPWRITE_PUBLIC_URL),
  appwriteProjectId: String(process.env.NEXT_APPWRITE_PROJECT_ID),
};

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64c283e1924146f17062");

export const account = new Account(client);

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

export class AppwriteService {
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        this.loginUserAccount({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginUserAccount({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error) {}

    return false;
  }

  async getCurrentUser() {
    try {
      return account.get();
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      throw error;
    }
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;
