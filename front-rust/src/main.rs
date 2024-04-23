mod app;
mod components;
mod pages;
mod utils;
mod hooks;
mod services;
use app::App;

fn main() {
    wasm_logger::init(wasm_logger::Config::default());
    yew::Renderer::<App>::new().render();
}
