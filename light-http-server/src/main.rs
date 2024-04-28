use light_http_server::{
    common::{
        http_version::{self, HttpVersion},
        status::HttpStatus,
    },
    ThreadPool,
};
use std::{
    collections::HashMap,
    io::{BufRead, BufReader, Write},
    net::{TcpListener, TcpStream},
    str::FromStr,
    thread,
    time::Duration,
};

#[derive(Debug)]
enum HttpMethod {
    //Post { body: String },
    GET,
}
#[derive(Debug)]
enum ReasonPhrase {
    HTTP1_1,
    HTTP2,
}
#[derive(Debug)]
enum StatusCode {
    Ok,
    BadRequest = 400,
}
#[derive(Debug)]
struct HttpRequestHeaders {
    headers: HashMap<String, String>,
}

#[derive(Debug)]
struct HttpRequest {
    method: HttpMethod,
    uri: String,
    version: http_version::HttpVersion,
    headers: Option<HttpRequestHeaders>,
    body: Option<Vec<String>>,
}
struct HttpResponse {
    http_version: http_version::HttpVersion,
    status_code: HttpStatus,
    reason_phrase: ReasonPhrase,
    headers: Option<HttpRequestHeaders>,
    message_body: Option<String>,
}
impl FromStr for HttpMethod {
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            //"POST" => Ok(HttpMethod::Post {
            //    body: String::new(),
            //}),
            "GET" => Ok(HttpMethod::GET),
            _ => Err(()),
        }
    }

    type Err = ();
}

impl ToString for StatusCode {
    fn to_string(&self) -> String {
        match self {
            StatusCode::Ok => "200 ok".to_string(),
            StatusCode::BadRequest => "400 BadRequest".to_string(),
        }
    }
}

impl ToString for HttpResponse {
    // TODO: Implement Zero Copy instead to write directly into network card buffer
    fn to_string(&self) -> String {
        let mut response = String::new();
        response.push_str(&self.http_version.to_string());
        response.push(' ');
        response.push_str(&self.status_code.to_string());
        response.push_str("\r\n");
        response.push_str(&self.headers.as_ref().unwrap().to_string());
        response.push_str("\r\n");
        response.push_str(self.message_body.as_ref().unwrap());
        response
    }
}

impl ToString for HttpRequestHeaders {
    fn to_string(&self) -> String {
        let mut headers = String::new();
        self.headers.clone().into_iter().for_each(|(k, v)| {
            headers.push_str(&format!("{}: {}\r\n", k, v));
        });
        headers.push_str("\r\n");

        headers
    }
}

fn main() {
    let listner = TcpListener::bind("127.0.0.1:7878").unwrap();
    let pool = ThreadPool::build(2);
    // thread pool with event loop
    for stream in listner.incoming() {
        let stream = stream.unwrap();
        pool.as_ref().unwrap().execute(|| {
            println!("{:?}", thread::current().id());
            handle_connection(stream);
        });
    }
}

fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&mut stream);
    let lines = buf_reader.lines();
    let header_lines: Vec<String> = lines
        .map(|l| l.unwrap())
        .take_while(|l| !l.is_empty())
        .collect();
    //println!("{:?}", lines);
    let _sep = header_lines.iter().position(|l| l.starts_with("\r\n\r\n"));
    let method_line = header_lines.first();
    let mut values = method_line.unwrap().split_whitespace();
    let method = HttpMethod::from_str(values.next().unwrap());
    let uri = values.next().unwrap();
    let http_version = HttpVersion::from_str(values.next().unwrap());
    let request = HttpRequest {
        uri: uri.to_string(),
        method: method.unwrap(),
        version: http_version.unwrap(),
        headers: Default::default(),
        body: Default::default(), //Some(header_lines[sep.unwrap() + 1..].to_vec()),
    };
    let response = HttpResponse {
        http_version: request.version,
        status_code: HttpStatus::OK,
        reason_phrase: ReasonPhrase::HTTP1_1,
        headers: Some(HttpRequestHeaders {
            headers: HashMap::from([("date".to_string(), chrono::Local::now().to_string())]),
        }),
        message_body: Some("hhhh".to_string()),
    };
    if method_line.unwrap().contains(&"/sleep".to_string()) {
        thread::sleep(Duration::from_secs(5));
    }
    stream.write_all(response.to_string().as_bytes()).unwrap();

    //println!("{:?}", request);
}
