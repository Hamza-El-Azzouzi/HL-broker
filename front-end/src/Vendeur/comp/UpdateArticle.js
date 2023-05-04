import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import {
    Button,
    Form,
    Radio,
    Input,
    Select,
    Upload,
    InputNumber,
} from 'antd';

import '../style/AddForm.css'
// import TextArea from 'antd/es/input/TextArea';
export default function UpadateArticle() {
    const [type, setType] = useState()
    const fileList = [
        {
          uid: '-1',
          name: 'test.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]      
    const handlSubmit = () => {
        console.log(fileList)
        console.log("validate")

    }
    const { TextArea } = Input;
    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };

    return (
        <div className='form'>
  
                <Link to='/HomeVendeur/Dashboard'>
                    <Button htmlType="submit" className='Btn Retour'>Retour</Button>
                </Link>


            <Form
                onSubmit={handlSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}

                layout="horizontal"
                style={{
                    Width: '1000px',
                    padding: '20px 50px 0 50px'
                }}>
                <Form.Item
                    label="titre"
                    name="titre"
                    style={{
                        padding: '10px 10px 5px 10px'
                    }}
                    rules={[
                        { required: true, message: 'Ce champs est obligatoire' },
                        { pattern: /^[a-zA-Z\s]+$/, message: 'Le Titre Doit Etre En Alphabetique !' }
                    ]}>
                    <Input type='text'
                        placeholder='Titre' />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="Description"

                    rules={[
                        { required: true, message: 'Ce champs est obligatoire' },
                        { pattern: /^.{250,}$/, message: 'Field must be at least 250 characters long!' }
                    ]}
                    style={{
                        padding: '5px 10px 5px 10px'
                    }}>
                    <TextArea
                        showCount
                        minLength={250}
                        style={{
                            height: 100,
                            resize: 'none',
                        }}
                        onChange={onChange}
                        placeholder="Saisir la Description de votre Article" />
                </Form.Item>
                <Form.Item
                    label="l'Article Pour "
                    name="Radio"
                    rules={[
                        { required: true, message: 'Ce champs est obligatoire' }
                    ]}
                    style={{
                        padding: '5px 10px 5px 10px'
                    }}>
                    <Radio.Group
                        onChange={(e) => { setType(e.target.value) }}>
                        <Radio value="Louer"> Louer </Radio>

                        <Radio value="Vendre"> Vendre </Radio>
                    </Radio.Group>
                </Form.Item>
                {type === "Louer" ?
                    <Form.Item
                        style={{
                            padding: '5px 10px 5px 10px'
                        }}
                        label="Prix Par Jour"
                        name="PrixLouer"
                        rules={[
                            { required: true, message: 'Ce champs est obligatoire' },
                            { pattern: /^[0-9\s]+$/, message: 'Le Prix Doit Etre En Numerique !' }
                        ]}>
                        <InputNumber
                            addonAfter={'DH'}
                            placeholder='10.000'
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            rules={[
                                { required: true, message: 'Ce champs est obligatoire' },
                                { pattern: /^[0-9\s]+$/, message: 'Le Prix Doit Etre En Numerique !' }
                            ]}
                        />
                    </Form.Item> :
                    <Form.Item
                        label="Prix de Vente"
                        name="PrixVente"
                        rules={[
                            { required: true, message: 'Ce champs est obligatoire' }
                        ]}>
                        <InputNumber
                            addonAfter={'DH'}
                            placeholder='10.000'
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            rules={[
                                { required: true, message: 'Ce champs est obligatoire' },
                                { pattern: /^[0-9\s]+$/, message: 'Le Prix Doit Etre En Numerique !' }
                            ]}
                            style={{
                                padding: '5px 10px 5px 10px'
                            }}

                        />
                    </Form.Item>
                }
                <Form.Item
                    label="Categorie"
                    name="Categorie"
                    rules={[
                        { required: true, message: 'Ce champs est obligatoire' }
                    ]}
                    style={{
                        padding: '5px 10px 5px 10px'
                    }}>
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
                <Form.Item
                    label="Upload"
                    name="Upload"
                    rules={[
                        { required: true, message: 'Ce champs est obligatoire' }
                    ]}
                    style={{
                        padding: '5px 10px 5px 10px'
                    }}>
                    <Upload
                        multiple
                        listType='picture'
                        action={"http://localhost:3000/"}
                        showUploadList={{
                            showRemoveIcon: true
                        }}
                        fileList={fileList}
                        beforeUpload={(file) => {
                            console.log(file)

                            return false
                        }}
                        className="upload-list-inline"
                        accept='.png,.jpeg'>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>

                <Button htmlType="reset" type='primary' icon={<DeleteOutlined />} danger className='Btn rightBtn'>Reset</Button>
                <Button htmlType="submit" className='Btn Enregistre'>Enregistre</Button>


            </Form>
        </div >
    )

}