use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct TextBoxProps {
    #[prop_or_default]
    pub class: AttrValue,
    pub onchange: Callback<Event>,
}

#[function_component(TextBox)]
pub fn text_box(props: &TextBoxProps) -> Html {
    html! {
        <textarea onchange={props.onchange.clone()} class={classes!("textBox", props.class.to_string())} type="text"></textarea>
    }
}
