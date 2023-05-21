import { Space, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
// import { Switch } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Spin, message, Popconfirm } from 'antd';
import VendeurNav from './VendeurNav';
export default function ShowArticle() {
  const [test, setTest] = useState()

  const handleDelete = async (id) => {
    axios.delete(`http://localhost:8000/api/article/${id}`)
      .then((response) => {
        message.success('Les données ont été supprimées avec succès.');
        window.location.reload(true)
      })
      .catch((error) => {
        message.error('Une erreur est survenue lors de la suppression des données.');
      });
  };

  const handleModifier = async (id) => {
    axios.put(`http://localhost:8000/api/disponible/${id}`)
      .then((response) => {
        message.success('Les données ont été modifer avec succès.');
        window.location.reload(true)
      })
      .catch((error) => {
        message.error('Une erreur est survenue lors de la Modification des données.');
      });
  };

  let text = ""
  const token = sessionStorage.getItem('token');
  const user =JSON.parse(sessionStorage.getItem('user'));
  const columns = [
    {
      title: 'Id',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name_article',
      key: 'name_article',
    },

    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'id_article',
      render: (_, record) => (
        <Space size="middle">

          <Link to={`/HomeVendeur/UpadateArticle/${record.key}`}>Update</Link>
          <Popconfirm
            title="Êtes-vous sûr de vouloir Modifier ce données?"
            onConfirm={() => handleModifier(record.key)}
            okText="Oui"
            cancelText="Non"
          >
            {record.disponibilite === "false" ? ( <Button type="link">{"disponible"}</Button> ) : (<Button type="link">{"Indiponible"}</Button>)}
           
          </Popconfirm>


          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer ces données?"
            onConfirm={() => handleDelete(record.key)}
            okText="Oui"
            cancelText="Non"
          >
            <Button type="link">Supprimer</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const FetchData = () => {
    axios.get(`http://localhost:8000/api/getArticle/${user.id}`)
      .then(response => {
        setTest(response.data.data)
        // console.log()
      }
      )

  }


  useEffect(() => {
    FetchData()
    console.log(test)
  }, [])





  const data = test !== undefined ? (
    test.map(x => ({
    key: x.id_article,
    disponibilite:x.disponibilite,
    name_article: x.name_article,
    type: x.type,

  }))) : (null)

  if (!data) {

    (<div className="table">
      <Space size="large" className='Spinner'>
        <Spin size="large" />
      </Space>
    </div>)
  }
  return (
    <main>
      <section className="section">
        <div className='container'>
          <VendeurNav />
          <div className='wrapper'>
            <div className="table">
              <div className='AddBtn'>
                <Button type="primary" shape="round" size="large"><Link to="/HomeVendeur/AddArticle" className="bi bi-plus-circle"> Ajouter Une Article</Link></Button>
              </div>
              <Table columns={columns} dataSource={data} />
            </div>
          </div>


        </div>
      </section>
    </main>

  )
}
