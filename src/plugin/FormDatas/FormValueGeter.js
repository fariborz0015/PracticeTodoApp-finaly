class FormValueGetter {
    constructor(FormELM) {
        this.form = FormELM;
    }
    Data = {
        json: {},
        obj: {},
        str:"",
    }
    getValue() {
        let children = this.form.querySelectorAll('input');
        children=[...children,...this.form.querySelectorAll('select'),...this.form.querySelectorAll('textarea')]
        for (let child of children) {
            if (child.type !== "button" && child.tagName == "INPUT" || child.tagName == "SELECT" || child.tagName == "TEXTAREA") {
                this.Data.obj[child.name] = child.value;
                this.Data.str+=`${child.name} : ${child.value},`
            }
        }
        this.Data.json=JSON.stringify(this.Data.obj)
        
        return (this.Data)
    }

}

export default FormValueGetter