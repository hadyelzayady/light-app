#[derive(Debug)]
pub struct HttpRequest {
    method: HttpMethod,
    uri: String,
    version: HttpVersion,
    headers: Option<HttpRequestHeaders>,
    body: Option<Vec<String>>,
}

#[derive(Debug)]
struct HttpRequestHeaders {
    headers: HashMap<String, String>,
}
