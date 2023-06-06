
import { DeleteOutlined } from "@ant-design/icons";
import { Form, Input, Button, message, Select } from "antd";
import axios from "axios";
import ls from "localstorage-slim";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Signale = () => {
    const [form] = Form.useForm();
    const token = ls.get("token", { decrypt: true });
    const user = JSON.parse(ls.get("user", { decrypt: true }));

    const [Datatype, setDataType] = useState();
    const { TextArea } = Input;

const history = useNavigate()
    const { productId } = useParams();
    const onFinish = async (values) => {
       console.log(productId)
        try {
            const data = {
                id_type: form.getFieldValue("type"),
                id_article: productId,
                id_user: user.id,
                complaint: form.getFieldValue("complaint"),
            };

            axios
                .post("http://localhost:8000/api/report", data)
                .then(response=>{
                    history("/")
                    message.success(response.data.message)
                }
                    
                );
        } catch (error) {
            message.error(error.data.message);
        }
    };




    const getType = async () => {
        await axios.get('http://localhost:8000/api/type')
            .then(response => {
                setDataType(response.data)
            }
            ).catch(error => { console.log(error) })
    }
    useEffect(() => {
        getType()
    }, []);

    return (
        <main>
            <section className="section">
                <div className='container'>
                    <div className="wrapper form">

                        <Form
                            form={form}
                            onFinish={onFinish}
                            encType="multipart/form-data"
                            action="http://localhost:8000/api/report"
                        >

                            <Form.Item
                                label="Type Of report"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: "Ce champs est obligatoire",
                                    },
                                ]}
                                style={{
                                    width: "60%",
                                    margin: "10% 20% 4% 20%",
                                    padding: "5px 10px 5px 10px",
                                    textAlign: "justify",
                                }}
                            >

                                <Select>
                                    {Datatype !== undefined &&
                                        Datatype.map((categorie) => (
                                            <Select.Option key={categorie.id_type} value={categorie.id_type}>
                                                {categorie.type}
                                            </Select.Option>
                                        ))}
                                </Select>

                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="complaint"
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
                                    rows={7}
                                    style={{ resize: "none" }}
                                    wrap="true"
                                    showCount
                                    minLength={250}
                                    placeholder="Saisir la Description de votre Article"
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
    )

}
export default Signale