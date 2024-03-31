export class UrlConstast{
public static TaskServiceBase = 'http://15.206.81.119:8081';
public static UserServiceBase= 'http://15.206.81.119:8082';

public  getProjectsUrl=UrlConstast.TaskServiceBase+"/projects";
public  saveProjectUrl=UrlConstast.TaskServiceBase+"/project";

}