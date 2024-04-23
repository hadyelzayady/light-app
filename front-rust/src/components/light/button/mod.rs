use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct ButtonProps {
    #[prop_or(AttrValue::from("button"))]
    pub class: AttrValue,
    #[prop_or(AttrValue::from("Submit"))]
    pub value: AttrValue,
    #[prop_or(false)]
    pub disabled: bool,
    #[prop_or_default]
    pub onclick: Callback<MouseEvent>,
}

#[function_component(Button)]
pub fn button(props: &ButtonProps) -> Html {
    html! {
        <button disabled={props.disabled} onclick={props.onclick.clone()}  class={classes!("button", props.class.to_string())} type="button">{props.value.clone()}</button>
    }
}
