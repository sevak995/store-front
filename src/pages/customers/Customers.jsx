import { Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import { useSelector } from 'react-redux';
import { getAllBills } from '../../redux/cartItemsSlice';

const Customers = () => {
  const dispatch = useDispatch();
  const billsData = useSelector((state) => state.cartItems.billsData);

  useEffect(() => {
    dispatch(getAllBills());
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
    },
    {
      title: 'Contact Number',
      dataIndex: 'customerPhone',
    },
    {
      title: 'Customer Address',
      dataIndex: 'customerAddress',
    },
  ];

  return (
    <Layout>
      <h2>All Customers </h2>
      <Table
        dataSource={billsData}
        columns={columns}
        bordered
        rowKey={(record) => record._id}
      />
    </Layout>
  );
};

export default Customers;
