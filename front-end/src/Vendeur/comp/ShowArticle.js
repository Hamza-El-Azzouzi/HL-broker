import { Space, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import {Switch} from 'antd';
// import { useState } from 'react';

export default function ShowArticle() {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a href='/'>{text}</a>,
    },

    {
      title: 'Type',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Disponibilter',
      render: (_, record) => (
        <Space size="middle" >
            <Switch defaultChecked/>
        </Space>
      ),
      key: 'address',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to='/HomeVendeur/UpadateArticle'>Update</Link>
          <Link to='/HomeVendeur/DeleteArticle'>Delete</Link>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    // {
    //   key: '1',
    //   name: 'John Brown',
    //   age: 32,
    //   address: 'New York No. 1 Lake Park',
    //   tags: ['nice', 'developer'],
    // },
    // {
    //   key: '1',
    //   name: 'John Brown',
    //   age: 32,
    //   address: 'New York No. 1 Lake Park',
    //   tags: ['nice', 'developer'],
    // },
    // {
    //   key: '1',
    //   name: 'John Brown',
    //   age: 32,
    //   address: 'New York No. 1 Lake Park',
    //   tags: ['nice', 'developer'],
    // },
    //  {
    //   key: '1',
    //   name: 'John Brown',
    //   age: 32,
    //   address: 'New York No. 1 Lake Park',
    //   tags: ['nice', 'developer'],
    // },
    // {
    //   key: '1',
    //   name: 'John Brown',
    //   age: 32,
    //   address: 'New York No. 1 Lake Park',
    //   tags: ['nice', 'developer'],
    // },
    //  {
    //   key: '1',
    //   name: 'John Brown',
    //   age: 32,
    //   address: 'New York No. 1 Lake Park',
    //   tags: ['nice', 'developer'],
    // },
    // {
    //   key: '1',
    //   name: 'John Brown',
    //   age: 32,
    //   address: 'New York No. 1 Lake Park',
    //   tags: ['nice', 'developer'],
    // },
    //  {
    //   key: '1',
    //   name: 'John Brown',
    //   age: 32,
    //   address: 'New York No. 1 Lake Park',
    //   tags: ['nice', 'developer'],
    // },
    //  {
    //   key: '1',
    //   name: 'John Brown',
    //   age: 32,
    //   address: 'New York No. 1 Lake Park',
    //   tags: ['nice', 'developer'],
    // },
    //  {
    //   key: '1',
    //   name: 'John Brown',
    //   age: 32,
    //   address: 'New York No. 1 Lake Park',
    //   tags: ['nice', 'developer'],
    // },
    {
      key: '2',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '3',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '4',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },

    {
      key: '5',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '6',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '7',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    }
  ];
  return (
   
      <div className="table">
        <div className='AddBtn'>
          <Button type="primary" shape="round" size="large"><Link to="/HomeVendeur/AddArticle" className="bi bi-plus-circle"> Ajouter Une Article</Link></Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>


  )
}
