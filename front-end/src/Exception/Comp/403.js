import { Button, Result } from 'antd';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import '../Style/404.css'
export default function NotAuthorized(){

    return(
        <Result
        status="403"
        title="403"
        className='Exception'
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Link to='/'><Button type="primary">Back Home</Button></Link>}
      />
    )
}