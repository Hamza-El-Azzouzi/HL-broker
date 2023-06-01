import { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';


export default function ShowUsers() {
    const [users, setUsers] = useState([]); // Updated initial state to an empty array
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/users');
          setUsers(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des utilisateurs', error);
        }
      };
  
      fetchUsers();
    }, []);

  const columns = [
  
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Téléphone',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: 'Type de compte',
      dataIndex: 'account_type',
      key: 'account_type',
    }, 
     {
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
            <Table columns={columns} dataSource={users} />
           </div>
          </div>
        </div>
      </section>
    </main>
  );
}




