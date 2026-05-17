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

export class EventAlreadyExistsException extends HttpException {
  constructor() {
    super(
      {
        message: 'Evento já existe',
        error: 'EVENT_ALREADY_EXISTS',
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class DateInvalidException extends HttpException {
  constructor() {
    super(
      {
        message: 'Data inválida',
        error: 'DATE_INVALID',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class EnoughTicket extends HttpException {
  constructor() {
    super(
      {
        message: 'Nao há tickets suficientes',
        error: 'ENOUGH_TICKET',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class NotExistTicket extends HttpException {
  constructor() {
    super(
      {
        message: 'Ticket não encontrado',
        error: 'NOT_EXIST_TICKET',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class EmailOrCodeInvalidException extends HttpException {
  constructor() {
    super(
      {
        message: 'Email ou Código inválidos',
        error: 'EMAIL_OR_CODE_INVALID',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class ActiveUserException extends HttpException {
  constructor() {
    super(
      {
        message: 'Usuário ativo',
        error: 'ACTIVE_USER',
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class InvalidEmailException extends HttpException {
  constructor() {
    super(
      {
        message: 'Email inválido',
        error: 'INVALID_EMAIL',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class EnoughAgeException extends HttpException {
  constructor() {
    super(
      {
        message: 'Idade insuficiente',
        error: 'ENOUGH_AGE',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class InvalidPasswordException extends HttpException {
  constructor() {
    super(
      {
        message: 'Senha inválida',
        error: 'INVALID_PASSWORD',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class NeededValidationException extends HttpException {
  constructor() {
    super(
      {
        message: 'Validação necessária',
        error: 'NEEDED_VALIDATION',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
