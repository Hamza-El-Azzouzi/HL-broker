import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import {
    Button,
    Form,
    Radio,
    Input,
    Select,
    Upload,
} from 'antd';
import '../style/AddForm.css'
import TextArea from 'antd/es/input/TextArea';
export default function AddArticle() {
    const [type, setType] = useState()
    return (
        <div className='form'>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: '600px',
                }}
            >
                <Form.Item label="titre">
                    <Input type='text' />
                </Form.Item>
                <Form.Item label="Description">
                    <TextArea />
                </Form.Item>
                <Form.Item label="Radio">
                    <Radio.Group
                        onChange={(e) => { setType(e.target.value) }}>
                        <Radio value="Louer"> Louer </Radio>
                        <Radio value="Vendre"> Vendre </Radio>
                    </Radio.Group>
                </Form.Item>
                {type === "Louer" ?
                    <Form.Item label="Prix Par Jour">
                        <Input type='text' />
                    </Form.Item> :
                    <Form.Item label="Prix de Vente">
                        <Input type='text' />
                    </Form.Item>
                }
                <Form.Item label="Categorie">
                    <Select
                        defaultValue="----choisi une categorie---------"
                       

                        options={[
                            { value: '----choisi une categorie---------', label: '----choisi une categorie---------', disabled: true },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'jack', label: 'Jack' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList" >
                    <Upload multiple
                        listType='picture'
                        action={"http://localhost:3000/"}
                        showUploadList={{
                            showRemoveIcon: true

                        }}
                        className="upload-list-inline"
                        accept='.png,.jpeg'
                        beforeUpload={(file) => {
                            console.log(file)
                            return false
                        }}

                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Button">
                    <Button>Button</Button>
                </Form.Item>
            </Form>
        </div >
    )

}