import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Select, Radio, InputNumber } from "antd";
import "../../styles/partials/components/AddForm.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import VendeurNav from "./VendeurNav";
import { DeleteOutlined } from "@ant-design/icons";
import ls from "localstorage-slim";

const { TextArea } = Input;

const AddArticle = () => {
    const [form] = Form.useForm();
    const [Images, setImages] = useState([]);
    const [DataCategorie, setDataCategorie] = useState();
    const [type, setType] = useState();
    let history = useNavigate();

    const handleFileUpload = async (event) => {
        setImages(event.target.files);
        console.log(Images);
    };

    const formData = new FormData();
    for (let i = 0; i < Images.length; i++) {
        formData.append("images[]", Images[i]);
    }
    // const token = sessionStorage.getItem('token');
    const token = ls.get("token", { decrypt: true });
    const user = JSON.parse(ls.get("user", { decrypt: true }));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const onFinish = async (values) => {
        console.log(formData);
        console.log(Images);
        try {
            const data = {
                id_categorie: form.getFieldValue("categorie"),
                id_user: user.id,
                images: Images,
                localisation:form.getFieldValue("localisation"),
                prix: form.getFieldValue("prix"),
                name_article: form.getFieldValue("name_article"),
                description: form.getFieldValue("description"),
                type: form.getFieldValue("type"),
                disponibilite: "true",
            };

            axios
                .post("http://localhost:8000/api/article", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(
                    history("/HomeVendeur"),
                    message.success("Article created successfully!")
                );
        } catch (error) {
            message.error(error.message);
        }
    };

    const getCategorie = async () => {
        await axios.get('http://localhost:8000/api/categorie')
            .then(response => {
                setDataCategorie(response.data)
            }
            ).catch(error => { console.log(error) })
    }
    useEffect(() => {
        getCategorie()
    }, []);
    return (
        <main>
            <section className="section">
                <div className="container">
                    <VendeurNav />

                    <div className="wrapper form">
                        <Link to="/HomeVendeur/Article">
                            <Button className="Btn Retour">Retour</Button>
                        </Link>
                        <Form
                            form={form}
                            onFinish={onFinish}
                            encType="multipart/form-data"
                            action="http://localhost:8000/api/article"
                        >
                            <Form.Item
                                label="Article Name"
                                name="name_article"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter article name",
                                    },
                                ]}
                                style={{
                                    width: "60%",
                                    margin: "0 20% 4% 20%",
                                    textAlign: "justify",
                                }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter description",
                                    },
                                    // { pattern: /^.{250,}$/, message: 'Minimum 250 characters' }
                                ]}
                                style={{
                                    width: "60%",
                                    margin: "0 20% 4% 20%",
                                    textAlign: "justify",
                                }}
                            >
                                <TextArea
                                    rows={4}
                                    style={{ resize: "none" }}
                                    wrap="true"
                                    showCount
                                    minLength={250}
                                    placeholder="Saisir la Description de votre Article"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Localisation"
                                name="localisation"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter article name",
                                    },
                                ]}
                                style={{
                                    width: "60%",
                                    margin: "0 20% 4% 20%",
                                    textAlign: "justify",
                                }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Type"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter type",
                                    },
                                ]}
                                style={{
                                    width: "60%",
                                    margin: "0 20% 4% 20%",
                                    textAlign: "justify",
                                }}
                            >
                                <Radio.Group
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <Radio value="Louer"> Louer </Radio>
                                    <Radio value="Vendre"> Vendre </Radio>
                                </Radio.Group>
                            </Form.Item>
                            {type === "Louer" ? (
                                <Form.Item
                                    label="Prix Par Jour"
                                    name="prix"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Ce champs est obligatoire",
                                        },
                                        {
                                            pattern: /^[0-9\s]+$/,
                                            message:
                                                "Le Prix Doit Etre En Numerique !",
                                        },
                                    ]}
                                    style={{
                                        width: "60%",
                                        margin: "0 20% 4% 20%",
                                        padding: "5px 10px 5px 10px",
                                        textAlign: "justify",
                                    }}
                                >
                                    <InputNumber
                                        addonAfter={"DH"}
                                        placeholder="10.000"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Ce champs est obligatoire",
                                            },
                                            {
                                                pattern: /^[0-9\s]+$/,
                                                message:
                                                    "Le Prix Doit Etre En Numerique !",
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            ) : (
                                <Form.Item
                                    label="Prix de Vente"
                                    name="prix"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Ce champs est obligatoire",
                                        },
                                    ]}
                                    style={{
                                        width: "70%",
                                        margin: "0 20% 4% 20%",
                                        padding: "5px 10px 5px 10px",
                                        textAlign: "justify",
                                    }}
                                >
                                    <InputNumber
                                        addonAfter={"DH"}
                                        placeholder="10.000"
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Ce champs est obligatoire",
                                            },
                                            {
                                                pattern: /^[0-9\s]+$/,
                                                message:
                                                    "Le Prix Doit Etre En Numerique !",
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            )}

                            <Form.Item
                                label="Categorie"
                                name="categorie"
                                rules={[
                                    {
                                        required: true,
                                        message: "Ce champs est obligatoire",
                                    },
                                ]}
                                style={{
                                    width: "60%",
                                    margin: "0 20% 4% 20%",
                                    padding: "5px 10px 5px 10px",
                                    textAlign: "justify",
                                }}
                            >

                                <Select>
                                    {DataCategorie !== undefined &&
                                        DataCategorie.map((categorie) => (
                                            <Select.Option key={categorie.id_categorie} value={categorie.id_categorie}>
                                                {categorie.name_categorie}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Images"
                                name="images"
                                style={{
                                    width: "60%",
                                    margin: "0 20% 4% 20%",
                                    textAlign: "justify",
                                }}
                            >
                                <input
                                    type="file"
                                    accept=".png,.jpg,.jpeg"
                                    name="images"
                                    onChange={handleFileUpload}
                                    multiple
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    htmlType="reset"
                                    type="primary"
                                    icon={<DeleteOutlined />}
                                    danger
                                    className="Btn rightBtn"
                                >
                                    Reset
                                </Button>
                                <Button
                                    htmlType="submit"
                                    className="Btn Enregistre"
                                >
                                    Enregistre
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AddArticle;

