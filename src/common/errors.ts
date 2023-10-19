function errorFormatter(
  type: string,
  englishMessage: string,
  persianMessage: string,
  auxiliaryFields: Record<string, string> = {},
): {
  type: string;
  message_en: string;
  message_fa: string;
} {
  return {
    type,
    message_en: englishMessage,
    message_fa: persianMessage,
    ...auxiliaryFields,
  };
}

export const errorsTypes = {
  user: {
    USER_ALREADY_EXIST: errorFormatter('user.USER_ALREADY_EXIST', 'this user already exist', 'این کاربر وجود دارد'),
    USER_INVALID_CREDENTIAL: errorFormatter(
      'user.USER_INVALID_CREDENTIAL',
      'username or password are incorrect',
      'نام کاربری یا گذرواژه اشتباه است',
    ),
    USER_NOT_FOUND: errorFormatter('user.USER_NOT_FOUND', 'user not found', 'کاربر پیدا نشد'),
  },
  task: {
    TASK_NOT_FOUND: errorFormatter('task.TASK_NOT_FOUND', 'Task not found', 'تسک پیدا نشد'),
  },
};
