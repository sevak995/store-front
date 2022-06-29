import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LayoutApp from "../../components/Layout";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { getProducts } from "../../redux/cartItemsSlice";
import { useSelector } from "react-redux";
import { deleteProduct } from "../../redux/cartItemsSlice";
import { showLoading, hideLoading } from "../../redux/cartItemsSlice";

const Products = () => {
  const dispatch = useDispatch();
  const [popModal, setPopModal] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  const { productData } = useSelector((state) => state.cartItems);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handlerDelete = async (record) => {
    try {
      dispatch(deleteProduct(record));
      message.success("Product Deleted Successfully!");
      dispatch(getProducts());
      setPopModal(false);
    } catch (error) {
      message.error("Error!");
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => {
        return (
          <img src={record.image} alt={record.title} height={60} width={60} />
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <DeleteOutlined
            className="cart-action"
            onClick={() => handlerDelete(record)}
          />
          <EditOutlined
            className="cart-edit"
            onClick={() => {
              setEditProduct(record);
              setPopModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  const handlerSubmit = async (value) => {
    if (!editProduct) {
      try {
        dispatch(showLoading());
        const res = await axios.post("/api/products/addproducts", value);
        message.success("Product Added Successfully!");
        dispatch(getProducts());
        setPopModal(false);
        dispatch(hideLoading());
      } catch (error) {
        dispatch(hideLoading());
        message.error("Error!");
      }
    } else {
      try {
        dispatch(showLoading());
        await axios.put("/api/products/updateproducts", {
          ...value,
          productId: editProduct._id,
        });
        message.success("Product Updated Successfully!");
        dispatch(getProducts());
        setPopModal(false);
        dispatch(hideLoading());
      } catch (error) {
        dispatch(hideLoading());
        message.error("Error!");
      }
    }
  };

  return (
    <LayoutApp>
      <h2>All Products </h2>
      <Button className="add-new" onClick={() => setPopModal(true)}>
        Add New
      </Button>
      <Table
        dataSource={productData}
        columns={columns}
        bordered
        pagination={{ position: ["topLeft", "bottomRight"], pageSize: 5 }}
        rowKey={(record) => record._id}
        // pagination={false}
      />

      {popModal && (
        <Modal
          title={`${editProduct !== null ? "Edit Product" : "Add New Product"}`}
          visible={popModal}
          onCancel={() => {
            setEditProduct(false);
            setPopModal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editProduct}
            onFinish={handlerSubmit}
          >
            <FormItem name="name" label="Name">
              <Input />
            </FormItem>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="Fiction">Fiction</Select.Option>
                <Select.Option value="Historical">Historical</Select.Option>
                <Select.Option value="Dictionaries">Dictionaries</Select.Option>
              </Select>
            </Form.Item>
            <FormItem name="price" label="Price">
              <Input />
            </FormItem>
            <FormItem name="image" label="Image URL">
              <Input />
            </FormItem>
            <div className="form-btn-add">
              <Button htmlType="submit" className="add-new">
                Add
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </LayoutApp>
  );
};

export default Products;
