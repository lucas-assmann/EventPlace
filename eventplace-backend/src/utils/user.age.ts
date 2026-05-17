import { Injectable } from '@nestjs/common';
import { User_age } from 'generated/prisma/enums';
import { DateInvalidException } from 'src/errors/user.error';

@Injectable()
export class UserAge {
  calculateAge(date: Date) {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 0) {
      throw new DateInvalidException();
    }

    return age;
  }

  getAge(date: Date): User_age {
    const age = this.calculateAge(date);
    if (age >= 18) return User_age.ADULT;
    else return User_age.MINOR;
  }
}
