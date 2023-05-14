import { Space, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Popconfirm, message } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';


// import { useParams } from 'react-router-dom';
export default function ShowArticle() {
  const [test, setTest] = useState()
  // const { id } = useParams();

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
  const cancel = (e) => {
    console.log(e);
    message.error(e);
  };
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
          {/* <Link to={`/HomeVendeur/DeleteArticle/${record.key}`}>Delete</Link> */}
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer ces données?"
            onConfirm={() =>  handleDelete(record.key)}
            okText="Oui"
            cancelText="Non"
          >
            <Button type="Link">Supprimer</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const FetchData = () => {
    axios.get('http://localhost:8000/api/article')
      .then(response => {
        setTest(response.data.data)
        // console.log()
      }
      )

  }


  useEffect(() => {
    FetchData()
  }, [])





  const data = test !== undefined ? (test.map(x => ({
    key: x.id_article,
    name_article: x.name_article,
    type: x.type,

  }))) : null

  if (!data) {

    (<div className="table">
      <Space size="large" className='Spinner'>
        <Spin size="large" />
      </Space>
    </div>)
  }
  return (

    <div className="table">
      <div className='AddBtn'>
        <Button type="primary" shape="round" size="large"><Link to="/HomeVendeur/AddArticle" className="bi bi-plus-circle"> Ajouter Une Article</Link></Button>
      </div>
      <Table columns={columns} dataSource={data} />



    </div>


  )
}
