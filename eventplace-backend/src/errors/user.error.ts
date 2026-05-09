import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super(
      {
        message: 'Usuário já existe',
        error: 'USER_ALREADY_EXISTS',
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class InvalidUserCepException extends HttpException {
  constructor() {
    super(
      {
        message: 'CEP inválido',
        error: 'INVALID_CEP',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class UnauthorizedExceptionRoute extends HttpException {
  constructor() {
    super(
      {
        message: 'Não autorizado',
        error: 'UNAUTHORIZED',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super(
      {
        message: 'Email ou senha inválidos',
        error: 'USER_NOT_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
