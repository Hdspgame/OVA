export class UrlConstast{
public static TaskServiceBase = 'http://13.233.88.170:8081';
public static UserServiceBase= 'http://13.233.88.170:8082';

public  getProjectsUrl=UrlConstast.TaskServiceBase+"/projects";
public  saveProjectUrl=UrlConstast.TaskServiceBase+"/project";

}