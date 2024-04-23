pub fn classes(args: &[&str]) -> String {
    let mut classes_value = String::new();
    for ele in args.iter() {
        if !ele.is_empty() {
            classes_value.push_str(" ");
            classes_value.push_str(ele)
        }
    }
    return classes_value;
}
