export function getAge(date_of_birth) {
    let dobYear = parseInt(date_of_birth.slice(0, 4));
    let nowYear = parseInt(new Date().getFullYear());
    return (nowYear - dobYear).toString();    
}
