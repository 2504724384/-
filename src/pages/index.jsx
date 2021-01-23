import React, { useState } from 'react';
import { Button, Input, Form, Row, Col } from 'antd';
import styles from './index.less';

export default function IndexPage() {
  const [form] = Form.useForm();
  // 动态控制表单项，默认渲染两项，数组的元素无意义，只要长度为2即可
  const [list, setList] = useState(Array.from({ length: 2 }));

  const btnBindHandle = (index) => {
    if (index === 0) {
      // 将新增表单项置空
      form.resetFields([
        [`${list.length}`, 'anchor_addresses'],
        [`${list.length}`, 'anchor_names'],
      ]);
      setList(Array.from({ length: list.length + 1 }));
    } else {
      // 每次删除都是删除最后一项，手动反填
      const valuesList = {};
      for (let i = index + 1; i < list.length; i += 1) {
        valuesList[i - 1] = form.getFieldsValue([`${i}`])[i];
      }
      setList(Array.from({ length: list.length - 1 }));
      for (let i = index; i < list.length; i += 1) {
        form.setFieldsValue({
          [i]: valuesList[i],
        });
      }
    }
  };

  const renderMoreForm = () => {
    return list.map((_, index) => (
      <Row gutter={16} key={index}>
        <Col span={10}>
          <Form.Item
            key={`anchor_addresses_${index + 1}`}
            label={`锚定节点地址${index + 1}`}
            name={[`${index}`, 'anchor_addresses']}
            rules={[
              { required: true, message: `请输入锚定节点地址${index + 1}` },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            key={`anchor_names_${index + 1}`}
            label={`地址${index + 1}名称`}
            name={[`${index}`, 'anchor_names']}
            rules={[{ required: true, message: `请输入地址${index + 1}名称` }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Button onClick={() => btnBindHandle(index)} disabled={index === 1}>
          {index === 0 ? '增加' : '删除'}
        </Button>
      </Row>
    ));
  };

  const submitHandle = () => {
    console.log('表单填入的值:  ', form.getFieldsValue());
  };

  const resetHandle = () => {
    form.resetFields();
    console.log('表单已清空～');
  };
  return (
    <div className={styles.container}>
      <Form form={form}>{renderMoreForm()}</Form>
      <Button type="primary" className={styles.btn} onClick={submitHandle}>
        确定
      </Button>
      <Button className={styles.btn} onClick={resetHandle}>
        重置
      </Button>
    </div>
  );
}
