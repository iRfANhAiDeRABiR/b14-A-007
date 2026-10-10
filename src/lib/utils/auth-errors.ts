export interface SignInFormValues {
  email: string;
  password: string;
}

export interface SignInFormErrors {
  email?: string;
  password?: string;
}

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpFormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface AuthErrorLike {
  code?: string;
  message?: string;
  status?: number;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmailInput(email: string): string {
  return email.trim().toLowerCase();
}

export function validateSignInInput(values: SignInFormValues): {
  isValid: boolean;
  errors: SignInFormErrors;
  firstErrorMessage?: string;
} {
  const errors: SignInFormErrors = {};
  const normalizedEmail = normalizeEmailInput(values.email);

  if (!normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail)) {
    errors.email = "অনুগ্রহ করে একটি সঠিক ইমেইল লিখুন।";
  }

  if (!values.password) {
    errors.password = "পাসওয়ার্ড লিখুন।";
  }

  const firstErrorMessage = errors.email || errors.password;

  return {
    isValid: !firstErrorMessage,
    errors,
    firstErrorMessage,
  };
}

export function validateSignUpInput(values: SignUpFormValues): {
  isValid: boolean;
  errors: SignUpFormErrors;
  firstErrorMessage?: string;
} {
  const errors: SignUpFormErrors = {};
  const trimmedName = values.name.trim();
  const normalizedEmail = normalizeEmailInput(values.email);

  if (!trimmedName) {
    errors.name = "অনুগ্রহ করে আপনার সম্পূর্ণ নাম লিখুন।";
  } else if (trimmedName.length > 80) {
    errors.name = "নাম সর্বোচ্চ ৮০ অক্ষরের মধ্যে হতে হবে।";
  }

  if (!normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail)) {
    errors.email = "অনুগ্রহ করে একটি সঠিক ইমেইল লিখুন।";
  }

  if (!values.password) {
    errors.password = "পাসওয়ার্ড লিখুন।";
  } else if (values.password.length < 8) {
    errors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  } else if (values.password.length > 128) {
    errors.password = "পাসওয়ার্ড সর্বোচ্চ ১২৮ অক্ষরের হতে পারে।";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "পাসওয়ার্ড নিশ্চিত করুন।";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "দুটি পাসওয়ার্ড মিলছে না।";
  }

  const firstErrorMessage =
    errors.name ||
    errors.email ||
    errors.password ||
    errors.confirmPassword;

  return {
    isValid: !firstErrorMessage,
    errors,
    firstErrorMessage,
  };
}

export function getSignInErrorMessage(
  error: AuthErrorLike | null | undefined
): string {
  if (!error) {
    return "সাইন ইন করা যাচ্ছে না। আবার চেষ্টা করুন।";
  }

  const code = (error.code || "").toUpperCase();
  const message = (error.message || "").toLowerCase();

  if (
    code === "INVALID_EMAIL_OR_PASSWORD" ||
    code === "USER_NOT_FOUND" ||
    code === "INVALID_PASSWORD" ||
    code === "INVALID_CREDENTIALS" ||
    error.status === 401 ||
    message.includes("invalid email or password") ||
    message.includes("invalid password") ||
    message.includes("user not found")
  ) {
    return "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।";
  }

  if (code === "INVALID_EMAIL" || message.includes("invalid email")) {
    return "অনুগ্রহ করে একটি সঠিক ইমেইল লিখুন।";
  }

  if (code === "TOO_MANY_REQUESTS" || error.status === 429) {
    return "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।";
  }

  return "সাইন ইন করা যাচ্ছে না। আবার চেষ্টা করুন।";
}

export function getSignUpErrorMessage(
  error: AuthErrorLike | null | undefined
): string {
  if (!error) {
    return "অ্যাকাউন্ট তৈরি করা যাচ্ছে না। আবার চেষ্টা করুন।";
  }

  const code = (error.code || "").toUpperCase();
  const message = (error.message || "").toLowerCase();

  if (
    code === "USER_ALREADY_EXISTS" ||
    code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL" ||
    code === "EMAIL_ALREADY_IN_USE" ||
    message.includes("already exists") ||
    message.includes("already in use")
  ) {
    return "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে।";
  }

  if (code === "PASSWORD_TOO_SHORT" || message.includes("password too short")) {
    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  }

  if (code === "PASSWORD_TOO_LONG" || message.includes("password too long")) {
    return "পাসওয়ার্ড সর্বোচ্চ ১২৮ অক্ষরের হতে পারে।";
  }

  if (code === "INVALID_EMAIL" || message.includes("invalid email")) {
    return "অনুগ্রহ করে একটি সঠিক ইমেইল লিখুন।";
  }

  return "অ্যাকাউন্ট তৈরি করা যাচ্ছে না। আবার চেষ্টা করুন।";
}

export function getSocialAuthErrorMessage(
  provider: "google" | "github"
): string {
  const providerName = provider === "google" ? "Google" : "GitHub";
  return `${providerName} দিয়ে সাইন ইন করা যাচ্ছে না। আবার চেষ্টা করুন।`;
}

