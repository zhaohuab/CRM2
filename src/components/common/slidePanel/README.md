> 组件方法
```
<SlidePanel>  内容  </SlidePanel>
```

> 使用方法

```
<SlidePanel
    viewState={this.state.viewState}
    onClose={this.slideHide.bind(this)}
>
    <div>内容</div>
</SlidePanel>
```

> 参数

| 参数           | 说明         |值类型|
| ------------- |-------------|-------------|
| viewState        | 显示滑动面板的显隐状态|boolean|
| goBack        | 点击返回按钮和返回按钮的回调方法 |function|