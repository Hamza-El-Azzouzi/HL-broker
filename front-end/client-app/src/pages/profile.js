import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/partials/pages/profileUser.css";
import "../styles/partials/pages/profileUser.scss"
// import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Space, Spin, message } from 'antd';
import ls from 'localstorage-slim';
import {

    Button,

    Form,
    Input,

} from 'antd';
import {
    BsFacebook,
    BsYoutube,
    BsInstagram,
} from "react-icons/bs";


function ProfileUser() {
    const [form] = Form.useForm();
    const { id_user } = useParams();




    const token = ls.get('token', { decrypt: true });
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const [data, setData] = useState();
    let history = useNavigate();
    const getUser = () => {
        axios.get(`http://localhost:8000/api/profile/${id_user}`).then(response => {
            console.log(response)
            history(`/profile/${id_user}`)
            setData(response.data.user)
        }).catch(error => { console.log(error) })

    }





    const handleUpdate = (values) => {

        axios
            .put(`http://localhost:8000/api/update/${id_user}`, values)
            .then((response) => {
                history(`/profile/${id_user}`)
                message.success(response.data.message)
            })
            .catch((error) => {
                console.error(error);
            });
    };




    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        getUser()

        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                name: data.name,
                email: data.email,
                description: data.description,
                tel: data.tel,
                adresse: data.adresse,
                urlYtb: data.urlYtb,
                urlFb: data.urlFb,
                urlInsta: data.urlInsta,
                city: data.city,
                codezip: data.codezip,
                pays: data.pays
            });
        }

    })
    return isLoading || !data || data === undefined ? (
        <Space size="large" className='Spinner'>
            <Spin tip="Loading..." size="large">
                <div className="content" />
            </Spin>
        </Space>
    ) : (
        <main>
            {/* <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
            ></link> */}
            <section className="section">
                <div className="container">
                    <div className="wrapper">
                        <div className="profile py-4">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="cardinfo shadow-sm">

                                        <div className="card-header bg-transparent text-center">
                                            <div className="profile_img">
                                                <div className="profile-pic">
                                                    <label className="-label" htmlFor="file">
                                                        <span className="glyphicon glyphicon-camera"></span>
                                                        <span>Change Image</span>
                                                    </label>

                                                    <img src={`http://localhost:8000/avatar/${data.image}`} id="output" width="200" alt="tes" />

                                                </div>

                                            </div>
                                            <br />
                                            <br />
                                            <h3>{data && data.name}</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="pr-1">
                                                <p className="mb-0">
                                                    Email : {data && data.email}
                                                </p>
                                            </div>
                                            <div className="pr-1">
                                                <p className="mb-0">
                                                    Telephone : 0{data && data.tel}
                                                </p>
                                            </div>
                                            <div className="pr-1">
                                                <p className="mb-0">
                                                    Location : {data && data.city}
                                                </p>
                                            </div>

                                        </div>
                                        <br />
                                        <br />
                                        <div className="bbtn">
                                            <div className="btn-group">
                                                <a
                                                    href={`${data.urlFb}`}
                                                    className="fa fa-facebook"
                                                    target="_blank" rel="noreferrer"
                                                >
                                                    <BsFacebook />
                                                </a>
                                            </div>

                                            <div className="btn-group">
                                                <a
                                                    href={`${data.urlInsta}`}

                                                    className="fa fa-instagram"
                                                    target="_blank" rel="noreferrer"
                                                >
                                                    <BsInstagram />
                                                </a>
                                            </div>

                                            <div className="btn-group">
                                                <a
                                                    href={`${data.urlYtb}`}
                                                    className="fa fa-youtub"
                                                    target="_blank" rel="noreferrer"
                                                >
                                                    <BsYoutube />
                                                </a>
                                            </div>
                                        </div>
                                        <br />
                                        <br />

                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="cardform shadow-sm">
                                        <Form
                                            form={form}
                                            name="register"
                                            onFinish={handleUpdate}
                                            scrollToFirstError
                                        >
                                            <fieldset className="border p-2">
                                                <legend className="float-none w-auto p-2">Info</legend>
                                                <Form.Item
                                                    name="name"
                                                    label="Name"
                                                    initialValue={data.name}
                                                    style={{
                                                        padding: '10px 10px 5px 10px'
                                                    }}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="email"
                                                    label="E-mail"
                                                    initialValue={data.email}
                                                    style={{
                                                        padding: '10px 10px 5px 10px'
                                                    }}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="tel"
                                                    label="Phone Number"
                                                    initialValue={data.tel}
                                                    style={{
                                                        padding: '10px 10px 5px 10px'
                                                    }}
                                                >
                                                    <Input
                                                        addonBefore={'+212'}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                </Form.Item>
                                            </fieldset>
                                            <fieldset className="border p-2">
                                                <legend>Adresse</legend>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <Form.Item
                                                            name="adresse"
                                                            label="Adresse"
                                                            initialValue={data.adresse}
                                                            style={{
                                                                padding: '10px 10px 5px 10px'
                                                            }}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Form.Item
                                                            name="pays"
                                                            label="Pays"
                                                            initialValue={data.pays}
                                                            style={{
                                                                padding: '10px 10px 5px 10px'
                                                            }}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </div>

                                                </div>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <Form.Item
                                                            name="city"
                                                            label="City"
                                                            initialValue={data.city}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Form.Item
                                                            name="codezip"
                                                            label="Code zip"
                                                            initialValue={data.codezip}
                                                            style={{
                                                                padding: '10px 10px 5px 10px'
                                                            }}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </div>
                                                </div>

                                            </fieldset>
                                            <fieldset className="border p-2">
                                                <legend className="float-none w-auto p-2" >Reseau Sociaux</legend>
                                                <Form.Item
                                                    name="urlFb"
                                                    label="Lien Page Facebook"
                                                    initialValue={data.urlFb}
                                                    style={{
                                                        padding: '10px 10px 5px 10px'
                                                    }}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="urlInsta"
                                                    label="Lien Page Instagramme"
                                                    initialValue={data.urlInsta}
                                                    style={{
                                                        padding: '10px 10px 5px 10px'
                                                    }}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="urlYtb"
                                                    label="Lien du La Chaine Youtub"
                                                    initialValue={data.urlYtb}
                                                    style={{
                                                        padding: '10px 10px 5px 10px'
                                                    }}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </fieldset>
                                            <fieldset className="border p-2">
                                                <legend>Description</legend>
                                                <Form.Item
                                                    name="description"
                                                    label="Description"
                                                    initialValue={data.description}
                                                    style={{
                                                        padding: '10px 10px 5px 10px'
                                                    }}
                                                >
                                                    <Input.TextArea showCount maxLength={100} />
                                                </Form.Item>

                                            </fieldset>


                                            <Form.Item>
                                                <Button type="primary" htmlType="submit">
                                                    Register
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ProfileUser;








