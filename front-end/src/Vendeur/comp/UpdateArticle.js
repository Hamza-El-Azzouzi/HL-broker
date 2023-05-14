import { DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useParams, useHistory } from 'react-router-dom';
import {
    Button,
    Form,
    Radio,
    Input,
    Select,
    InputNumber,
    message
} from 'antd';

import { Space, Spin , Alert} from 'antd';
import axios from 'axios';
import '../style/AddForm.css'
// import TextArea from 'antd/es/input/TextArea';
export default function UpadateArticle() {

    const [form] = Form.useForm();
    const [DataCategorie, setDataCategorie] = useState()
    const [type, setType] = useState()
    
    const [result, setResult] = useState(null)
    const { id } = useParams();
    // const fileTst = []


    let history = useHistory();

    const GetArticleData = () => {
        axios.get(`http://localhost:8000/api/article/${id}/edit`)
            .then(response => {
                setResult(response.data)
            }
            )
    }
    const GetCategorieData = () => {
        axios.get('http://localhost:8000/api/categorie')
            .then(response => {
                setDataCategorie(response.data.data)
            }
            )
    }
    useEffect(() => {
        GetArticleData()
        GetCategorieData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleSubmit = (values) => {
  
        // console.log(data)
        axios.put(`http://localhost:8000/api/article/${id}`, values)
            .then(
          
                     history.push('/HomeVendeur/Article'),
                      message.success('Article updtaed successfully!')

            
            ).catch(error => {
                message.error(error)
            });
            console.log(values)

    };
    

    useEffect(() => {
        if (result) {
            form.setFieldsValue({
                titre: result[0].name_article,
                prix: result[0].prix,
                description: result[0].description,
                type: result[0].type,
                categorie:result[0].id_categorie


            });
        }
    }, [result, form]);
    const { TextArea } = Input;
    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };
    if (!result) {
        return (
            <div className='form'>
                <Space size="large" className='Spinner'>
                    <Spin size="large" />
                </Space>
            </div>
        );
    }
    return (
        <div className='form'>

            <Link to='/HomeVendeur'>
                <Button htmlType="submit" className='Btn Retour'>Retour</Button>
            </Link>
            <Alert
                message="Warning"
                description="Noter bien que vous avez ne peut pas chnger les images si voulez-vous supprimer l'artcile et re-cree"
                type="warning"
                style={{ width:"700px",
                          margin:"20px 0 0 120px"   }}
                showIcon
                closable
            />

            <Form
                form={form}
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
                }}
                onFinish={handleSubmit}>
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
                        placeholder='Titre' name='titre' />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"

                    rules={[
                        { required: true, message: 'Ce champs est obligatoire' }
                    ]}
                    style={{
                        padding: '5px 10px 5px 10px'
                    }}>
                    <TextArea
                        showCount
                        name='description'
                        minLength={250}
                        style={{
                            height: 100,
                            resize: 'none',
                        }}
                        onChange={onChange}
                        placeholder="Saisir la Description de votre Article"
                    />
                </Form.Item>
                <Form.Item
                    label="l'Article Pour "
                    name="type"
                    rules={[
                        { required: true, message: 'Ce champs est obligatoire' }
                    ]}
                    style={{
                        padding: '5px 10px 5px 10px'
                    }}>
                    <Radio.Group onChange={(e) => setType(e.target.value)}>
                        {result[0].type === 'Louer'  ? (
                            <>
                                <Radio value="Louer" checked > Louer </Radio>
                                <Radio value="Vendre" > Vendre </Radio>
                            </>

                        ) : (
                            <>
                                <Radio value="Louer" > Louer </Radio>
                                <Radio value="Vendre" checked> Vendre </Radio>
                            </>

                        )}
                    </Radio.Group>
                </Form.Item>
                {type === "Louer" ?
                    <Form.Item
                        style={{
                            padding: '5px 10px 5px 10px'
                        }}
                        label="Prix Par Jour"
                        name="prix"
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
                        name="prix"
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
                    name="categorie"
                    rules={[
                        { required: true, message: 'Ce champs est obligatoire' }
                    ]}
                    style={{
                        padding: '5px 10px 5px 10px'
                    }}
                    initialValue={result[0].id_categorie}>
                    <Select
                        defaultValue ={result[0].id_categorie}>
                        {DataCategorie !== undefined ? (DataCategorie.map(x => (
                            x.id_categorie === result[0].id_categorie ? (
                                <Select.Option value={x.id_categorie} key={x.id_categorie} selcted >{x.name_categorie}</Select.Option>
                            ) : (
                                <Select.Option value={x.id_categorie} key={x.id_categorie} >{x.name_categorie}</Select.Option>
                            )))) : (null)}
                    </Select>
                </Form.Item>
                {/* <Form.Item label="image"

                    rules={[
                        { required: true, message: 'Ce champs est obligatoire' }
                    ]}
                    style={{
                        padding: '5px 10px 5px 10px'
                    }}
                    name='image'>
                    <div>
                        <label htmlFor="images">Select Images:</label>
                        <input type="file" id="images" name="images" accept='.png,.jpeg' multiple onChange={handleChange} />
                    </div>
                </Form.Item> */}
                <Button htmlType="reset" type='primary' icon={<DeleteOutlined />} danger className='Btn rightBtn'>Reset</Button>
                <Button htmlType="submit" className='Btn Enregistre'>Enregistre</Button>
            </Form>
        </div >
    )

}