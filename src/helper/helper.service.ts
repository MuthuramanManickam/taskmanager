import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;


@Injectable()
export class HelperService {
    constructor() { }


    generatePassword() {
        const length = 8; // Minimum length of the password
        const pattern = /^(?=.*)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      
        let password = '';
      
        while (!pattern.test(password) || password.length < length) {
          password = '';
          for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
          }
        }
      
        return password;
    }


    hashPassword(password : string): Promise<string> {
        return bcrypt.hash(password, saltOrRounds);;
    }
    
    isPasswordMatch(password : string, dbPassword : string): Promise<boolean> {
        return bcrypt.compare(password, dbPassword);
    }
    
}   