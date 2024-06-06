import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, DatePicker, Select, InputNumber, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { reactLocalStorage } from 'reactjs-localstorage';

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

  const handleDateChange = (date) => {
    form.setFieldsValue({ [dataIndex]: date });
    save();
  };

  const handleDateClick = () => {
    form.setFieldsValue({ [dataIndex]: null });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
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
            onClick={handleDateClick}
            onChange={handleDateChange}
          />
        ) : inputType === 'select' ? (
          <Select ref={inputRef} onBlur={save}>
            <Option value={0}>胸</Option>
            <Option value={1}>背</Option>
            <Option value={2}>腿</Option>
            <Option value={3}>肩</Option>
            <Option value={4}>休息</Option>
            <Option value={5}>其它</Option>
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
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);

  const fetchRecords = async () => {
    const conId = reactLocalStorage.get('Con_ID'); // 从本地存储获取 Con_ID
    if (conId) {
      try {
        const response = await axios.get(`http://localhost/backend/get_records.php?Con_ID=${conId}`);
        const records = response.data.map((record) => ({
          key: record.Record_ID,  // 这里使用 Record_ID 作为 key
          date: moment(record.Date),
          protein: record.Protein,
          carbs: record.Carb,
          fat: record.Fat,
          workout: record.Sports,
          cardio: record.Aero,
          weight: record.Weight,
        }));
        setDataSource(records);
        setCount(records.length);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    
    const conId = reactLocalStorage.get('Con_ID'); // 从本地存储获取 Con_ID
    
    try {
      await axios.post('http://localhost/backend/delete_record.php', {
        Con_ID: conId,
        key: key
      });
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const handleAdd = () => {
    const lastRow = dataSource[dataSource.length - 1] || {
      date: moment(),
      protein: 0,
      carbs: 0,
      fat: 0,
      workout: 0,
      cardio: 0,
      weight: 0,
    };
  
    const newData = {
      key: count + 1,
      date: moment(), // 使用今天的日期
      protein: lastRow.protein,
      carbs: lastRow.carbs,
      fat: lastRow.fat,
      workout: lastRow.workout,
      cardio: lastRow.cardio,
      weight: lastRow.weight,
      isNew: true, // 标志为新行
    };
  
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  
  const handleSave = async (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  
    const conId = reactLocalStorage.get('Con_ID'); // 从本地存储获取 Con_ID
  
    const isNew = row.isNew; // 判断是否为新行
  
    const url = isNew ? 'http://localhost/backend/insert_record.php' : 'http://localhost/backend/update_record.php';
  
    try {
      await axios.post(url, {
        Con_ID: conId,
        key: row.key,
        date: row.date.format('YYYY-MM-DD'), // 确保日期格式正确
        protein: row.protein,
        carbs: row.carbs,
        fat: row.fat,
        workout: row.workout,
        cardio: row.cardio,
        weight: row.weight,
      });
      if (isNew) {
        newData[index].isNew = false; // 移除新行标志
        setDataSource(newData); // 更新状态
      }
      // 自动更新数据
      fetchRecords();
    } catch (error) {
      console.error(`Error ${isNew ? 'inserting' : 'updating'} record:`, error);
      message.error(`Error ${isNew ? 'inserting' : 'updating'} record: ${error.message}`);
    }
  };
  

  const workoutMap = {
    0: '胸',
    1: '背',
    2: '腿',
    3: '肩',
    4: '休息',
    5: '其它'
  };

  const defaultColumns = [
    {
      title: '日期',
      dataIndex: 'date',
      width: '15%',
      editable: true,
      inputType: 'date',
      render: (text) => (text ? text.format('YYYY-MM-DD') : ''),
    },
    {
      title: '蛋白質 (g)',
      dataIndex: 'protein',
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
      title: '碳水化合物 (g)',
      dataIndex: 'carbs',
      width: '10%',
      editable: true,
    },
    {
      title: '今天練什麽',
      dataIndex: 'workout',
      width: '15%',
      editable: true,
      inputType: 'select',
      render: (workout) => workoutMap[workout],
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
