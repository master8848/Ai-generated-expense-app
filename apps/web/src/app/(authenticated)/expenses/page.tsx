'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Form,
  Input,
  Button,
  Select,
  Table,
  Space,
  Modal,
  Popconfirm,
  Tag as AntTag,
  Row,
  Col,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ExpensesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [expenses, setExpenses] = useState<Model.Expense[]>([])
  const [projects, setProjects] = useState<Model.Project[]>([])
  const [tags, setTags] = useState<Model.Tag[]>([])
  const [organizations, setOrganizations] = useState<Model.Organization[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Model.Expense | null>(
    null,
  )

  const [form] = Form.useForm()

  useEffect(() => {
    if (userId) {
      fetchExpenses()
      fetchProjects()
      fetchTags()
      fetchOrganizations()
    }
  }, [userId])

  const fetchExpenses = async () => {
    try {
      const expensesFound = await Api.Expense.findManyByUserId(userId, {
        includes: ['user', 'project', 'expenseTags.tag'],
      })
      setExpenses(expensesFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch expenses', { variant: 'error' })
    }
  }

  const fetchProjects = async () => {
    try {
      const projectsFound = await Api.Project.findMany({
        includes: ['organization'],
      })
      setProjects(projectsFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch projects', { variant: 'error' })
    }
  }

  const fetchTags = async () => {
    try {
      const tagsFound = await Api.Tag.findMany({ includes: ['organization'] })
      setTags(tagsFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch tags', { variant: 'error' })
    }
  }

  const fetchOrganizations = async () => {
    try {
      const organizationsFound = await Api.Organization.findMany({
        includes: ['projects', 'tags'],
      })
      setOrganizations(organizationsFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch organizations', { variant: 'error' })
    }
  }

  const handleAddExpense = () => {
    setEditingExpense(null)
    setIsModalVisible(true)
  }

  const handleEditExpense = (expense: Model.Expense) => {
    setEditingExpense(expense)
    setIsModalVisible(true)
    form.setFieldsValue({
      amount: expense.amount,
      description: expense.description,
      date: dayjs(expense.date),
      projectId: expense.projectId,
      tags: expense.expenseTags?.map(et => et.tagId),
    })
  }

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      await Api.Expense.deleteOne(expenseId)
      enqueueSnackbar('Expense deleted successfully', { variant: 'success' })
      fetchExpenses()
    } catch (error) {
      enqueueSnackbar('Failed to delete expense', { variant: 'error' })
    }
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingExpense) {
        await Api.Expense.updateOne(editingExpense.id, values)
        enqueueSnackbar('Expense updated successfully', { variant: 'success' })
      } else {
        await Api.Expense.createOneByUserId(userId, values)
        enqueueSnackbar('Expense created successfully', { variant: 'success' })
      }
      fetchExpenses()
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to save expense', { variant: 'error' })
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Project',
      dataIndex: ['project', 'name'],
      key: 'project',
    },
    {
      title: 'Tags',
      dataIndex: 'expenseTags',
      key: 'tags',
      render: (expenseTags: Model.ExpenseTag[]) => (
        <>
          {expenseTags?.map(et => <AntTag key={et.id}>{et.tag?.name}</AntTag>)}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Model.Expense) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditExpense(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDeleteExpense(record.id)}
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Title level={2}>Expenses</Title>
          <Text>
            Manage your expenses by adding, editing, or deleting them. You can
            also assign projects and tags to categorize your expenses.
          </Text>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddExpense}
            style={{ margin: '20px 0' }}
          >
            Add Expense
          </Button>
          <Table columns={columns} dataSource={expenses} rowKey="id" />
        </Col>
      </Row>
      <Modal
        title={editingExpense ? 'Edit Expense' : 'Add Expense'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Please input the amount' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please input the description' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please input the date' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item name="projectId" label="Project">
            <Select>
              {projects.map(project => (
                <Option key={project.id} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select mode="multiple">
              {tags.map(tag => (
                <Option key={tag.id} value={tag.id}>
                  {tag.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
