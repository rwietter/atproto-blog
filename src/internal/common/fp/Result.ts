export type Result<T, E = Error> =
	| { status: "Ok"; value: T }
	| { status: "Err"; error: E };

export const Ok = <T>(value: T): Result<T> => ({
	status: "Ok",
	value,
});

export const Err = <E = Error>(error: E): Result<never, E> => ({
	status: "Err",
	error,
});

export const isOk = <T, E>(
	result: Result<T, E>,
): result is { status: "Ok"; value: T } => result.status === "Ok";

export const isErr = <T, E>(
	result: Result<T, E>,
): result is { status: "Err"; error: E } => result.status === "Err";

export const fold = <T, E, U>(
	result: Result<T, E>,
	onOk: (value: T) => U,
	onErr: (error: E) => U,
): U => (isOk(result) ? onOk(result.value) : onErr(result.error));

export const map = <T, U>(result: Result<T>, f: (value: T) => U): Result<U> =>
	isOk(result) ? Ok(f(result.value)) : result;

export const flatMap = <T, E, U>(
	result: Result<T, E>,
	f: (value: T) => Result<U, E>,
): Result<U, E> => (isOk(result) ? f(result.value) : result);

export const getOrElse = <T, E>(result: Result<T, E>, defaultValue: T): T =>
	isOk(result) ? result.value : defaultValue;

export const toError = (err: unknown): Error =>
	err instanceof Error ? err : new Error(String(err));
