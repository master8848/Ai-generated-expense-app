'use client'

import { useEffect, useState } from 'react'
import { Typography, Button, Form, Input, List, Modal, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ProjectsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [projects, setProjects] = useState<Model.Project[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentProject, setCurrentProject] =
    useState<Partial<Model.Project> | null>(null)

  useEffect(() => {
    if (userId) {
      fetchProjects()
    }
  }, [userId])

  const fetchProjects = async () => {
    try {
      const projectsFound = await Api.Project.findMany({
        includes: ['organization', 'expenses'],
      })
      setProjects(projectsFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch projects', { variant: 'error' })
    }
  }

  const handleCreateProject = async (values: Partial<Model.Project>) => {
    try {
      if (userId) {
        const organizationId = 'your-organization-id' // Replace with actual organization ID
        await Api.Project.createOneByOrganizationId(organizationId, values)
        enqueueSnackbar('Project created successfully', { variant: 'success' })
        fetchProjects()
        setIsModalVisible(false)
      }
    } catch (error) {
      enqueueSnackbar('Failed to create project', { variant: 'error' })
    }
  }

  const handleEditProject = async (values: Partial<Model.Project>) => {
    try {
      if (currentProject?.id) {
        await Api.Project.updateOne(currentProject.id, values)
        enqueueSnackbar('Project updated successfully', { variant: 'success' })
        fetchProjects()
        setIsModalVisible(false)
      }
    } catch (error) {
      enqueueSnackbar('Failed to update project', { variant: 'error' })
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    try {
      await Api.Project.deleteOne(projectId)
      enqueueSnackbar('Project deleted successfully', { variant: 'success' })
      fetchProjects()
    } catch (error) {
      enqueueSnackbar('Failed to delete project', { variant: 'error' })
    }
  }

  const showModal = (project?: Partial<Model.Project>) => {
    setCurrentProject(project || null)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Projects</Title>
      <Paragraph>Manage your projects to categorize your expenses.</Paragraph>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Create Project
        </Button>
      </Space>
      <List
        bordered
        dataSource={projects}
        renderItem={project => (
          <List.Item
            actions={[
              <Button
                icon={<EditOutlined />}
                onClick={() => showModal(project)}
              >
                Edit
              </Button>,
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteProject(project.id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={project.name}
              description={project.description}
            />
          </List.Item>
        )}
      />
      <Modal
        title={currentProject ? 'Edit Project' : 'Create Project'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={currentProject || { name: '', description: '' }}
          onFinish={currentProject ? handleEditProject : handleCreateProject}
        >
          <Form.Item
            name="name"
            label="Project Name"
            rules={[
              { required: true, message: 'Please input the project name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: 'Please input the project description!',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentProject ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
