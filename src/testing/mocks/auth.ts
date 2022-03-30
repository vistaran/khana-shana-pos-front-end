import { User } from '@modules/auth/models';
export { User };

export class MockUser implements User {
    id = 'TEST_ID';
    first_name = 'TEST_FIRST_NAME';
    lastname = 'TEST_LAST_NAME';
    username = 'TEST_USERNAME';
    email = 'TEST_EMAIL';
}
