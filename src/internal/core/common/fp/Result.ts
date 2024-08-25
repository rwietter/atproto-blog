export type Result<T, E = Error> =
	| { status: "Success"; value: T }
	| { status: "Failure"; error: E };

export const Success = <T>(value: T): Result<T> => ({
	status: "Success",
	value,
});

export const Failure = <E = Error>(error: E): Result<never, E> => ({
	status: "Failure",
	error,
});

export const isSuccess = <T, E>(
	result: Result<T, E>,
): result is { status: "Success"; value: T } => result.status === "Success";

export const isFailure = <T, E>(
	result: Result<T, E>,
): result is { status: "Failure"; error: E } => result.status === "Failure";

export const fold = <T, E, U>(
	result: Result<T, E>,
	onSuccess: (value: T) => U,
	onFailure: (error: E) => U,
): U => (isSuccess(result) ? onSuccess(result.value) : onFailure(result.error));

export const map = <T, U>(result: Result<T>, f: (value: T) => U): Result<U> =>
	isSuccess(result) ? Success(f(result.value)) : result;

export const flatMap = <T, E, U>(
	result: Result<T, E>,
	f: (value: T) => Result<U, E>,
): Result<U, E> => (isSuccess(result) ? f(result.value) : result);

export const getOrElse = <T, E>(result: Result<T, E>, defaultValue: T): T =>
	isSuccess(result) ? result.value : defaultValue;

export const toError = (err: unknown): Error =>
	err instanceof Error ? err : new Error(String(err));
