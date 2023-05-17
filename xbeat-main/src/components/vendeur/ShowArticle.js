import { Space, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
// import { Switch } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import VendeurNav from './VendeurNav';
export default function ShowArticle() {
  const [test, setTest] = useState()
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
          <Link to={`/HomeVendeur/DeleteArticle/${record.key}`}>Dispnible</Link>
          <Link to={`/HomeVendeur/DeleteArticle/${record.key}`}>Delete</Link>
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
