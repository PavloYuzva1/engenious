import * as dotenv from 'dotenv';

dotenv.config();

export const testsConfig = {
  baseUrl: `${process.env.BASE_URL}`,
  testUser: {
    email: `${process.env.TESTS_EMAIL}`,
    password: `${process.env.TESTS_PASSWORD}`,
  },
};
