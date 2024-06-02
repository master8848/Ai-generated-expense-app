'use client'

import { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Spin } from 'antd'
import { DollarCircleOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, { includes: ['expenses'] })
        .then(user => {
          setExpenses(user.expenses || [])
          setLoading(false)
        })
        .catch(error => {
          enqueueSnackbar('Failed to load expenses', { variant: 'error' })
          setLoading(false)
        })
    }
  }, [userId])

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={2}>My Expenses</Title>
          <Paragraph>Get an overview of your spending.</Paragraph>
        </Col>
      </Row>
      {loading ? (
        <Row justify="center">
          <Spin size="large" />
        </Row>
      ) : (
        <Row justify="center" gutter={[16, 16]}>
          {expenses?.map(expense => (
            <Col key={expense.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={expense.description}
                bordered={false}
                style={{ textAlign: 'center' }}
                actions={[<DollarCircleOutlined key="amount" />]}
              >
                <Text strong>{`$${expense.amount?.toFixed(2)}`}</Text>
                <br />
                <Text type="secondary">
                  {dayjs(expense.date).format('MMMM D, YYYY')}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
