import { Button, Form, Input, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../../redux/cartItemsSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (value) => {
    try {
      dispatch(showLoading);
      const res = await axios.post('/api/users/login', value);
      dispatch(hideLoading);
      message.success('User Login Successfully!');
      localStorage.setItem('auth', JSON.stringify(res.data));
      navigate('/');
    } catch (error) {
      dispatch(hideLoading);
      message.error('Error!');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      localStorage.getItem('auth');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="form">
      <h2>BOOK STORE</h2>
      <p>Login</p>
      <div className="form-group">
        <Form layout="vertical" onFinish={handlerSubmit}>
          <FormItem name="userId" label="User ID">
            <Input />
          </FormItem>
          <FormItem name="password" label="Password">
            <Input type="password" />
          </FormItem>
          <div className="form-btn-add">
            <Button htmlType="submit" className="add-new">
              Login
            </Button>
            <Link className="form-other" to="/register">
              Register Here!
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
