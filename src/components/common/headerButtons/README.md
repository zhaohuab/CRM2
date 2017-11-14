


> 组件名称

```
<HeaderButton></HeaderButton>
```

> 参数

| 参数           | 说明         | 值类型
| ------------- |-------------|-------------|
| length        | 显示已选择条数 |number|
| goBack        | 点击X按钮和返回按钮的回调方法 |function|


> 调用展示
```
 <HeaderButton
        length={selectedRowKeys.length}
        goBack={this.headerBack.bind(this)}
    >
        <Button onClick={this.onDelete.bind(this)}>
            <i className="iconfont icon-shanchu" />删除
        </Button>
        {selectedRowKeys.length == 1 ? (
            <Button onClick={this.onEdit.bind(this)}>
                <i className="iconfont icon-bianji" />编辑
            </Button>
        ) : (
            ""
        )}
        <Button>刷新</Button>
</HeaderButton>

```

> 说明
- selectData.length是否显示编辑按钮
- 不用管样式，直接在
```<HeaderButton> 中</HeaderButton>加<Button></Button>即可```