import React ,{ useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './style/NavBar.css';
import './style/Footer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Space, Spin } from 'antd';
import reportWebVitals from './reportWebVitals';

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return isLoading ? (
    <Space size="large" 
    className='Spinner'
    >
       <Spin size="large" />
  </Space>
  ) : (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
ReactDOM.createRoot(document.getElementById('root')).render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
