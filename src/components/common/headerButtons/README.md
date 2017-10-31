


> 组件名称

```
<HeaderButton></HeaderButton>
```

> 参数

| 参数           | 说明         
| ------------- |-------------|
| length        | 显示已选择条数 
| goBack        | 点击X按钮和返回按钮的回调方法 |


> 调用展示
```
<HeaderButton
    length={selectData.length}
    goBack={this.headerBack.bind(this)}
>
    <Button onClick={this.headerBack.bind(this)}>
        <i className="iconfont icon-fanhui" />返回
    </Button>
    <Button onClick={this.onDelete.bind(this)}>
        <i className="iconfont icon-shanchu" />删除
    </Button>
    {selectData.length == 1 ? (
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