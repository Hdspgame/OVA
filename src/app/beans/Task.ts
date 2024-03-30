import { project } from "./project"


export interface Task {
    taskId: number
    projectId: number
    userId: number
    taskType: string
    taskTitle: string
    taskDescription: string
    taskStatus: string
    createdBy: string
    lastUpdatedBy: string
    createdDate: string
    lastUpdatedDate: string
    remarks: any
    project:project
  }
  