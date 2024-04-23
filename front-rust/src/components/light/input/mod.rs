use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct InputProps {
    class: Option<String>,
}

#[function_component(Input)]
pub fn input(InputProps { class }: &InputProps) -> Html {
    html! {
        <input class={classes!("input", class)} type="text"/>
    }
}
