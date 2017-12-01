const transToFields = (values)=>{
    let result = {};
    for(let field in values) {
        result[field] = {
            value : values[field],
        }
    }
    return result;
}

const transToValues = (fields) => {
    let result = {};
    for(let field in fields) {
        result[field] = fields[field];
    }
    return result;
}

export  {
    transToFields,
    transToValues
}