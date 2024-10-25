export const USERNAME_REGEX = {
  CASE_A: /^[a-zA-Z0-9-_]{8,20}$/,
};

export const PASSWORD_REGEX = {
  // Minimum eight characters, at least one letter and one number:
  CASE_A: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  // Minimum eight characters, at least one letter, one number and one special character:
  CASE_B: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
  CASE_C: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  CASE_D: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  // Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  CASE_E: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
};

export const DATE_FORMAT_REGEX = {
  CASE_A: /\d{4}-\d{2}-\d{2}/,
};

export const MIME_TYPES = {
  PNG_AND_JPG: /image\/jpg|jpeg|png/,
};

export const EXTRACT_TEXT_BETWEEN_PARENTHESIS_OR_DOUBLE_QUOTES_REGEX = /[(\"]([^")]+)[\")]/gm;
