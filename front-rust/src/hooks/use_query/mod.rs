use yew::hook;

pub struct UseQueryResult<T>{
    loading: bool,
    data: T,
}

#[hook]
pub fn use_query<TResponse, TRequest>(_url: &str, _body: Option<&TRequest>) -> UseQueryResult<TResponse> {
    todo!()
}
