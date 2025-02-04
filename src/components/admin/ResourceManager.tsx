import type React from "react"
import { useState, useEffect } from "react"
import "./ResourceManager.css"

interface Resource {
  id: number
  [key: string]: any
}

interface ResourceField {
  name: string
  label: string
  type: string
  options?: () => Promise<any[]>
}

interface ResourceManagerProps<T extends Resource, C, U> {
  resourceName: string
  fetchResources: () => Promise<T[]>
  createResource: (data: C) => Promise<T>
  updateResource: (id: number, data: U) => Promise<T>
  deleteResource: (id: number) => Promise<void>
  resourceFields: ResourceField[]
}

function ResourceManager<T extends Resource, C, U>({
  resourceName,
  fetchResources,
  createResource,
  updateResource,
  deleteResource,
  resourceFields,
}: ResourceManagerProps<T, C, U>) {
  const [resources, setResources] = useState<T[]>([])
  const [selectedResource, setSelectedResource] = useState<T | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [fieldOptions, setFieldOptions] = useState<{ [key: string]: any[] }>({})

  useEffect(() => {
    loadResources()
    loadFieldOptions()
  }, [])

  const loadResources = async () => {
    const data = await fetchResources()
    setResources(data)
  }

  const loadFieldOptions = async () => {
    const optionsPromises = resourceFields
      .filter((field) => field.options)
      .map(async (field) => {
        const options = await field.options!()
        return { [field.name]: options }
      })

    const optionsResults = await Promise.all(optionsPromises)
    const newFieldOptions = Object.assign({}, ...optionsResults)
    setFieldOptions(newFieldOptions)
  }

  const handleCreate = async () => {
    await createResource(formData as C)
    setFormData({})
    loadResources()
  }

  const handleUpdate = async () => {
    if (selectedResource) {
      await updateResource(selectedResource.id, formData as U)
      setSelectedResource(null)
      setFormData({})
      loadResources()
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm(`Tem certeza que deseja excluir este ${resourceName.toLowerCase()}?`)) {
      await deleteResource(id)
      loadResources()
    }
  }

  const handleEdit = (resource: T) => {
    setSelectedResource(resource)
    setFormData(resource)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="resource-manager">
      <h2>{resourceName}</h2>
      <div className="resource-list">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-item">
            <span>{resource.nome || resource.titulo || `${resourceName} ${resource.id}`}</span>
            <div>
              <button onClick={() => handleEdit(resource)}>Editar</button>
              <button onClick={() => handleDelete(resource.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
      <div className="resource-form">
        <h3>
          {selectedResource ? "Editar" : "Criar"} {resourceName}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            selectedResource ? handleUpdate() : handleCreate()
          }}
        >
          {resourceFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}:</label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione...</option>
                  {fieldOptions[field.name]?.map((option: any) => (
                    <option key={option.id} value={option.id}>
                      {option.nome || option.titulo}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  required
                />
              )}
            </div>
          ))}
          <button type="submit">{selectedResource ? "Atualizar" : "Criar"}</button>
        </form>
      </div>
    </div>
  )
}

export default ResourceManager