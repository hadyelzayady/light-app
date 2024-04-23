use crate::pages::home::Home;
use yew::prelude::*;

#[function_component(App)]
pub fn app() -> Html {
    html! { <main><Home/></main> }
}
