'use client'

import { useEffect, useState } from 'react'
import { Table, Button, Space, Typography, Row, Col, Card } from 'antd'
import {
  UserOutlined,
  DollarOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AdminPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [users, setUsers] = useState<Model.User[]>([])
  const [expenses, setExpenses] = useState<Model.Expense[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersFound = await Api.User.findMany({
          includes: ['expenses', 'userOrganizations'],
        })
        setUsers(usersFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch users', { variant: 'error' })
      }
    }

    const fetchExpenses = async () => {
      try {
        const expensesFound = await Api.Expense.findMany({
          includes: ['user', 'project'],
        })
        setExpenses(expensesFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch expenses', { variant: 'error' })
      }
    }

    fetchUsers()
    fetchExpenses()
  }, [])

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
  ]

  const expenseColumns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'User',
      dataIndex: ['user', 'name'],
      key: 'user',
    },
    {
      title: 'Project',
      dataIndex: ['project', 'name'],
      key: 'project',
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={2}>Admin Dashboard</Title>
          <Text>Manage users, view expenses, and generate reports</Text>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col span={24}>
          <Card
            title={
              <>
                <UserOutlined /> Users
              </>
            }
            bordered={false}
          >
            <Table dataSource={users} columns={userColumns} rowKey="id" />
          </Card>
        </Col>
        <Col span={24}>
          <Card
            title={
              <>
                <DollarOutlined /> Expenses
              </>
            }
            bordered={false}
          >
            <Table dataSource={expenses} columns={expenseColumns} rowKey="id" />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
