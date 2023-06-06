
import { Card } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import '../../../assets/css/complaint.css'
const Complaint = () => {
    const [dataComplain, setDataComaplian] = useState()
    useEffect(() => {
        axios.get('http://localhost:8000/api/report').then(response => {
            setDataComaplian(response.data)
        }).catch(error => console.log(error))
    }, [])
    return (
        <>
            {dataComplain && dataComplain.map(x =>
                <Card
                    title={x.type}
                    bordered={false}
                    className='cardComplaint'
                    style={{
                        width: 300,
                        marginTop: '5%'
                    }}
                >
                    <div className='complaint' >
                        Annonce :  {x.id_article}
                        <br />
                        User :  {x.email}
                        <div>
                            Complaint : {x.complaint}
                        </div>
                    </div>


                </Card>
            )}
            {/* <Card
    title="Card title"
    bordered={false}
    style={{
      width: 300,
      marginTop:'10%'
    }}
  >
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card> */}
        </>
    )

}
export default Complaint