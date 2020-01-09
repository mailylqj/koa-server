import * as React from 'react';
import {Button, Input, Modal} from 'antd';

const { useState } = React;

function handleChange(value) {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
}

const WordCount = () => {
    const [open, setOpen] = useState(false);
    const [text, onChange] = useState('');
    return (
        <>
            <Modal title="Basic Modal" visible={open} onOk={()=>setOpen(false)} onCancel={()=>setOpen(false)} >
                <p>{open.toString()}</p>
                <Input onChange={onChange} defaultValue={text}/>
            </Modal>
            <Button type="primary" onClick={()=>setOpen(true)}> Open Modal </Button>
        </>
    );
};
 
class BasicUse extends React.Component<IProps, IState> {
    constructor(props:any) {
        super(props);
    }
 
    render() {
        return (
            <div>
                <h2>基本用法</h2>
                <WordCount/>
            </div>
        )
    }
}
export default BasicUse;