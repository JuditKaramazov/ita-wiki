import {
  InvalidTokenError,
  MissingTokenError,
  NotFoundError,
  ZodValidationError,
} from '../errorSchemas'

// Responses for when the authMiddlware intervenes.

export const missingTokenResponse = {
  description: 'Missing token',
  content: {
    'application/json': {
      schema: MissingTokenError,
    },
  },
}

export const invalidTokenResponse = {
  description: 'Invalid token',
  content: {
    'application/json': {
      schema: InvalidTokenError,
    },
  },
}

export const userNotFoundResponse = {
  description: 'User not found',
  content: {
    'application/json': {
      schema: NotFoundError,
    },
  },
}

export const zodValidationErrorResponse = {
  description: 'Zod validation error',
  content: {
    'application/json': {
      schema: ZodValidationError,
    },
  },
}
