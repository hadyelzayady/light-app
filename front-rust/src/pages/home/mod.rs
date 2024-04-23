use crate::components::core::sql_editor::SqlEditor;
use yew::prelude::*;

#[function_component(Home)]
pub fn home() -> Html {
    html! {
        <div class="sqsEditorContainer">
            <SqlEditor />
        </div>
    }
}
