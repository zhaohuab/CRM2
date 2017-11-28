const handle = (changedFields) => {
    for (let fieldKey in changedFields) {
        let field = changedFields[fieldKey];
        debugger
        if (field.value && field.value.mapper) {
            //参照、枚举类型

            let { mapper, value } = field.value;
            for (let readField in mapper) {
                let writeField = mapper[readField];
                changedFields[writeField] = { value: value[readField] };
            }
        }
        
    }
}

export default handle;