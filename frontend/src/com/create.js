import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, DatePicker, Select, InputNumber } from 'antd';
import moment from 'moment';

const { Option } = Select;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  inputType,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {inputType === 'date' ? (
          <DatePicker
            ref={inputRef}
            format="YYYY-MM-DD"
            onChange={() => save()}
          />
        ) : inputType === 'select' ? (
          <Select ref={inputRef} onBlur={save} onPressEnter={save}>
            <Option value="胸">胸</Option>
            <Option value="背">背</Option>
            <Option value="腿">腿</Option>
            <Option value="肩">肩</Option>
            <Option value="休息">休息</Option>
          </Select>
        ) : (
          <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} min={0} />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const App = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      date: moment('2023-01-01'),
      protein: '50',
      carbs: '200',
      fat: '70',
      workout: '胸',
      cardio: '30',
      weight: '70',
    },
    {
      key: '1',
      date: moment('2023-01-02'),
      protein: '60',
      carbs: '220',
      fat: '80',
      workout: '背',
      cardio: '20',
      weight: '71',
    },
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: '日期',
      dataIndex: 'date',
      width: '15%',
      editable: true,
      inputType: 'date',
      render: (text) => (text ? moment(text).format('YYYY-MM-DD') : ''),
    },
    {
      title: '蛋白質 (g)',
      dataIndex: 'protein',
      width: '10%',
      editable: true,
    },
    {
      title: '碳水化合物 (g)',
      dataIndex: 'carbs',
      width: '10%',
      editable: true,
    },
    {
      title: '脂肪 (g)',
      dataIndex: 'fat',
      width: '10%',
      editable: true,
    },
    {
      title: '今天練什麽',
      dataIndex: 'workout',
      width: '15%',
      editable: true,
      inputType: 'select',
    },
    {
      title: '今日有氧 (mins)',
      dataIndex: 'cardio',
      width: '15%',
      editable: true,
    },
    {
      title: '體重 (kg)',
      dataIndex: 'weight',
      width: '10%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const lastRow = dataSource[dataSource.length - 1] || {
      date: moment(),
      protein: '',
      carbs: '',
      fat: '',
      workout: '',
      cardio: '',
      weight: '',
    };

    const newData = {
      key: count,
      date: moment(), // 使用今天的日期
      protein: lastRow.protein,
      carbs: lastRow.carbs,
      fat: lastRow.fat,
      workout: lastRow.workout,
      cardio: lastRow.cardio,
      weight: lastRow.weight,
    };

    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        inputType: col.inputType,
      }),
    };
  });

  return (
    <div style={{ width: '60%', margin: '0 auto', paddingBottom: '20px', paddingTop: '20px' }}>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default App;
