'use client'

import { useEffect, useState } from 'react'
import { Typography, Button, Form, Input, List, Modal, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TagsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [tags, setTags] = useState<Model.Tag[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [currentTag, setCurrentTag] = useState<Model.Tag | null>(null)

  const [form] = Form.useForm()

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsFound = await Api.Tag.findMany()
        setTags(tagsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch tags', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [])

  const handleCreateTag = async (values: Partial<Model.Tag>) => {
    try {
      const newTag = await Api.Tag.createOneByOrganizationId(userId, values)
      setTags([...tags, newTag])
      enqueueSnackbar('Tag created successfully', { variant: 'success' })
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to create tag', { variant: 'error' })
    }
  }

  const handleUpdateTag = async (values: Partial<Model.Tag>) => {
    if (!currentTag) return

    try {
      const updatedTag = await Api.Tag.updateOne(currentTag.id, values)
      setTags(tags.map(tag => (tag.id === currentTag.id ? updatedTag : tag)))
      enqueueSnackbar('Tag updated successfully', { variant: 'success' })
      setIsModalVisible(false)
      setCurrentTag(null)
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to update tag', { variant: 'error' })
    }
  }

  const handleDeleteTag = async (tagId: string) => {
    try {
      await Api.Tag.deleteOne(tagId)
      setTags(tags.filter(tag => tag.id !== tagId))
      enqueueSnackbar('Tag deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete tag', { variant: 'error' })
    }
  }

  const showModal = (tag?: Model.Tag) => {
    if (tag) {
      setIsEditMode(true)
      setCurrentTag(tag)
      form.setFieldsValue(tag)
    } else {
      setIsEditMode(false)
      form.resetFields()
    }
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setCurrentTag(null)
    form.resetFields()
  }

  const handleFinish = (values: Partial<Model.Tag>) => {
    if (isEditMode) {
      handleUpdateTag(values)
    } else {
      handleCreateTag(values)
    }
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Manage Tags</Title>
      <Text>
        Organize your expenses by creating, editing, and deleting tags.
      </Text>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Create Tag
        </Button>
        <List
          loading={loading}
          dataSource={tags}
          renderItem={tag => (
            <List.Item
              actions={[
                <Button
                  icon={<EditOutlined />}
                  onClick={() => showModal(tag)}
                />,
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteTag(tag.id)}
                />,
              ]}
            >
              {tag.name}
            </List.Item>
          )}
        />
      </Space>
      <Modal
        title={isEditMode ? 'Edit Tag' : 'Create Tag'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the tag name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditMode ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
