export interface GenericRequest<T> {
  type: T;
}
export interface GenericSuccess<T, V> {
  type: T;
  payload: V;
}
export interface GenericFail<T, V> {
  type: T;
  payload: V;
}
