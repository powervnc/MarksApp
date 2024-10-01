export  class Validators {
    
    public static  validateUsername(username:string) {
        return /^$|^[a-zA-Z0-9\s_-]+$/.test(username);
    }
    
    
    public static  validatePassword(password:string) {
        return /^$|^[a-zA-Z0-9\s_-]+$/.test(password);
    }
    
    
    public static  validateGroup(group:string) {
        return /^$|^[a-zA-Z0-9\s_-]+$/.test(group);
    }
    
    public static  validateCourse(course:string) {
        return /^$|^[a-zA-Z0-9\s_-]+$/.test(course);
    }
}
