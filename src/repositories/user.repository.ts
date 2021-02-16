import { IEditUser } from "../app/common/interfaces/IEditUser.model";
import { ISignUp } from "../app/common/interfaces/ISignUp.model";
import { IUserDto } from "../app/common/schemas/IUser.dto";

// Mock a DB layer
class UserRepository {
    private users: IUserDto[] = [];

    public async signUpUser(data: ISignUp): Promise<IUserDto | null> {
        const user = Object.assign({}, data, {
            id: this.users.length + 1,
            bitcoinAmount: 0,
            usdBalance: 0,
            createdAt: Date.now(),
            updatedAt: null,
          });
        this.users.push(user);
        return user;
    }

    public async getUserById(id: string): Promise<IUserDto | null> {
        return this.users.find((user) => user.id == id);
    }

    public async editUserById(id: string, data: IEditUser): Promise<IUserDto | null> {
        const userIndex = this.users.findIndex((user) => user.id == id);
        if (userIndex === -1) {
            return null;
        }
        
        this.users[userIndex] = Object.assign(this.users[userIndex], {
            name: data.name ? data.name : this.users[userIndex].name,
            email: data.email ? data.email : this.users[userIndex].email
        }, {
            updatedAt: Date.now(),
        });

        return this.users[userIndex];
    }
}

export default UserRepository;