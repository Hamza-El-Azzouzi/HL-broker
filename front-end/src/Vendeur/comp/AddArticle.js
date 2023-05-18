import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import '../style/AddForm.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const { TextArea } = Input;

const AddArticle = () => {

    const [form] = Form.useForm();
    const [Images, setImages] = useState([]);
    const [DataCategorie, setDataCategorie] = useState()
    let history = useHistory();

    const handleFileUpload = async (event) => {
        setImages(event.target.files)
        console.log(Images);
    };

    const formData = new FormData();
    for (let i = 0; i < Images.length; i++) {
        formData.append('images[]', Images[i]);
    }

    const onFinish = async (values) => {
        console.log(formData)
        console.log(Images)
        try {
            const data = {
                'id_categorie': form.getFieldValue('categorie'),
                'id_user': 1,
                'images': Images,
                'prix': form.getFieldValue('prix'),
                'name_article': form.getFieldValue('name_article'),
                'description': form.getFieldValue('description'),
                'type': form.getFieldValue('type'),
                'disponibilite': 'true'
            }


            axios.post('http://localhost:8000/api/article', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(
                history.push('/HomeVendeur'),
                message.success('Article created successfully!')
                
                
            )
        } catch (error) {
            message.error(error.message);
        }
    };
    const GetCategorieData = () => {
        axios.get('http://localhost:8000/api/categorie')
            .then(response => {
                setDataCategorie(response.data.data)
            }
            )
    }

    useEffect(() => {

        GetCategorieData()

    }, [])
    return (
        <div className='form'>
            <Form form={form}
                onFinish={onFinish}
                encType='multipart/form-data'
                action='http://localhost:8000/api/article'>
                <Form.Item
                    label="Article Name"
                    name="name_article"
                    rules={[{ required: true, message: 'Please enter article name' }]} >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter description' }]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="prix"
                    rules={[{ required: true, message: 'Please enter price' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Type"
                    name="type"
                    rules={[{ required: true, message: 'Please enter type' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Availability"
                    name="disponibilite"
                    rules={[{ required: true, message: 'Please enter availability' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Categorie"
                    name="categorie"
                    rules={[
                        { required: true, message: 'Ce champs est obligatoire' }
                    ]}
                    style={{
                        padding: '5px 10px 5px 10px'
                    }}>
                    <Select>
                        {DataCategorie !== undefined ? (DataCategorie.map(x => (
                            <Select.Option value={x.id_categorie} key={x.id_categorie} selcted >{x.name_categorie}</Select.Option>
                        ))) : null}
                    </Select>
                </Form.Item>
                <Form.Item label="Images" name='images'>
                    <input type='file' accept='.png,.jpg,.jpeg' name='images' onChange={handleFileUpload} multiple />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddArticle;
