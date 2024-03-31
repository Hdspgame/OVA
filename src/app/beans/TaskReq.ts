import { project } from "./project"


export interface TaskReq {
    projectId: number
    userId: number
    taskType: string
    taskTitle: string
    taskDescription: string
    taskStatus: string
    createdBy: string
    lastUpdatedBy: string
  }
  