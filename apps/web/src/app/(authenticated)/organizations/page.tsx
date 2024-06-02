'use client'

import React, { useEffect, useState } from 'react'
import {
  Typography,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function OrganizationsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [organizations, setOrganizations] = useState<Model.Organization[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingOrganization, setEditingOrganization] =
    useState<Model.Organization | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    if (userId) {
      fetchOrganizations()
    }
  }, [userId])

  const fetchOrganizations = async () => {
    try {
      const orgs = await Api.Organization.findMany({
        includes: ['userOrganizations'],
      })
      setOrganizations(orgs)
    } catch (error) {
      enqueueSnackbar('Failed to fetch organizations', { variant: 'error' })
    }
  }

  const handleCreateOrUpdate = async (values: Partial<Model.Organization>) => {
    try {
      if (editingOrganization) {
        await Api.Organization.updateOne(editingOrganization.id, values)
        enqueueSnackbar('Organization updated successfully', {
          variant: 'success',
        })
      } else {
        await Api.Organization.createOne(values)
        enqueueSnackbar('Organization created successfully', {
          variant: 'success',
        })
      }
      fetchOrganizations()
      setIsModalVisible(false)
      form.resetFields()
      setEditingOrganization(null)
    } catch (error) {
      enqueueSnackbar('Failed to save organization', { variant: 'error' })
    }
  }

  const handleDelete = async (organizationId: string) => {
    try {
      await Api.Organization.deleteOne(organizationId)
      enqueueSnackbar('Organization deleted successfully', {
        variant: 'success',
      })
      fetchOrganizations()
    } catch (error) {
      enqueueSnackbar('Failed to delete organization', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Model.Organization) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingOrganization(record)
              form.setFieldsValue(record)
              setIsModalVisible(true)
            }}
          />
          <Popconfirm
            title="Are you sure to delete this organization?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Organizations</Title>
      <Text>
        Manage your organizations to keep track of expenses for different
        entities.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setEditingOrganization(null)
          form.resetFields()
          setIsModalVisible(true)
        }}
        style={{ marginBottom: 16 }}
      >
        Create Organization
      </Button>
      <Table
        dataSource={organizations}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title={
          editingOrganization ? 'Edit Organization' : 'Create Organization'
        }
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input the name of the organization!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
