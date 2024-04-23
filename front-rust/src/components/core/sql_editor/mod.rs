use crate::components::light::button::Button;
use crate::components::light::text_box::TextBox;
use yew::html;
use gloo_net::http::Request;
use log::info;
use serde::Deserialize;
use wasm_bindgen::JsCast;
use wasm_bindgen_futures::JsFuture;
use web_sys::HtmlInputElement;
use yew::prelude::*;
#[derive(Properties, PartialEq)]
pub struct SqlEditorProps {
    #[prop_or_default]
    class: AttrValue,
}

#[derive(Deserialize, Debug)]
struct SqsQueueResource {
    _id: String,
    name: String,
}

#[derive(Deserialize, Debug)]
struct FibResultResource {
    result: i32,
}

#[function_component(SqlEditor)]
pub fn sql_editor(_props: &SqlEditorProps) -> Html {
    let fib_input = use_state(|| 0);
    let fib_result = use_state(|| 0);
    let input_value = (*fib_input).clone();

    let onclick = self.link.callback(|_| Msg::Clicked);
    let handle_click = {
        let fib_result = fib_result.clone();
        Callback::from(move |_v: MouseEvent| {
            let fibResult: FibResultResource =
                Request::get(format!("http://localhost:4000/api/fib/{}", input_value).as_str())
                    .send()
                    .unwrap()
                    .json()
                    .await
                    .unwrap();
            info!("{:?}", fibResult);
        })
    };

    let on_change = Callback::from(move |v: Event| {
        let target = v.target().unwrap();
        let fib_input = fib_input.clone();
        let _ = Callback::from(move |_: i32| fib_input.set(*fib_input + 1));
    });

    html! {
        <div>
            <TextBox onchange={on_change} class="sqlEditor"/>
            <Button onclick={handle_click} disabled={false} class="submitQuery" value="Submit Query"/>
            <div>{"Result:"} {*fib_result}</div>

        </div>
    }
}
