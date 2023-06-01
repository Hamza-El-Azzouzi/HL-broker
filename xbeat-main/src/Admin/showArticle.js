import { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

export default function ShowArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles', error);
      }
    };

    fetchArticles();
  }, []);

  const columns = [
    {
      title: 'ID Article',
      dataIndex: 'id_article',
      key: 'id_article',
    },
    {
      title: 'Category Name',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'ID User',
      dataIndex: 'id_user',
      key: 'id_user',
    },
    {
        title: 'Nome_vendeur',
        dataIndex: 'Nome_vendeur',
        key: 'Nome_vendeur',
      },
    {
      title: 'Nom Article',
      dataIndex: 'name_article',
      key: 'name_article',
    },
   
    {
      title: 'Prix',
      dataIndex: 'prix',
      key: 'prix',
    },
   
    {
      title: 'Localisation',
      dataIndex: 'localisation',
      key: 'localisation',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },  {
        title: 'Action',
        dataIndex: '/',
        key: '/',
      },
  ];

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="wrapper">
            <div className="table">
    <Table columns={columns} dataSource={articles} />
    </div>
    </div>
  </div>
</section>
</main>
  );
}
