struct SqlResult {
    headers: Vec<String>,
    data: Vec<Vec<String>>,
}
struct ApiError {
    status: u16,
}
pub async fn get_query_result(_sql: String) -> Result<SqlResult, ApiError> {
    // request_get::<SqlResult>(format!("/articles/{}", slug)).await
    todo!();
}

