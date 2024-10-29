import { Component, inject } from '@angular/core';
import { StudentService } from '../../Service/student.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
selector: 'app-delete-student',
standalone: true,
imports: [FormsModule],
templateUrl: './delete-student.component.html',
styleUrl: './delete-student.component.css'
})
export class DeleteStudentComponent {
studentObj: any = {
"studentId": 0,
"studentName": "",
"studentGrade": "",
"studentRollNo": "",
"isActive": true,
"createdDate": "",
"modifiedDate": ""
}
studentService = inject(StudentService)
studentList: any[] = [];
ngOnInit(): void {
this.loadStudents();
}
loadStudents() {
this.studentService.getStudents().subscribe((res: any) => {
this.studentList = res;
})
}
onDelete(data: any) {
debugger;
this.studentObj = data;
}
http = inject(HttpClient);
onConfirm() {
const isDelete = confirm("Are you sure?");
if (isDelete) {
debugger;
this.http.delete("https://localhost:7088/api/TblStudents/" +
this.studentObj.studentId).subscribe((res: any) => {
debugger;
if (res.result)
alert("Student Record Deleted!");
else {
alert("Some Problem in Student Deletion")
}
})
}
}
}