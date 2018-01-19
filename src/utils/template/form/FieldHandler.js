const handle = (changedFields) => {
    for (let fieldKey in changedFields) {
        let field = changedFields[fieldKey];
        if (field.value && field.value.mapper) {
            //参照、枚举类型
            let { value , ...others} = field;
            let mapper = value.mapper;
            let realValue = value.value;
            for (let readField in mapper) {
                let writeField = mapper[readField];
                changedFields[writeField] = { value: realValue[readField],...others};
            }
        }
        
    }
}

export default handle;